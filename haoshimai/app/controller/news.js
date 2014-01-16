sumeru.router.add(
	{
pattern: '/news',
action: 'App.news'
}

);

//sumeru.router.setDefault('App.news');

App.news = sumeru.controller.create(function(env, session){

	var view = 'news';
       

	var getNews = function(){

	session.news = env.subscribe('pubnews', function(newsCollection){

	    var obj = newsCollection.getData()[0];
	    console(obj);
	    console("1111111111111111111111111111111111111111111111");

	    //session.bind('newsBlock', {
      //		'topNews' : obj['topnews']
	//	});
	    });
	};

	var getLefts = function(){

	session.left = env.subscribe('leftCorner', function(leftCornerCollection){
	    console.log(leftCornerCollection.getData()[0]);

	    });
	};

	env.onload = function(){
	    return [getNews,getLefts];
	};

	env.onrender = function(doRender){
	    doRender(view, ['shake','left']);
	};

	env.onready = function(){
	    var mapObj,tool,myLocation,marker;
	    var createMarkerContent = function (){
		var div = document.createElement("div");
		div.style.backgroundColor = "#EE5D5B";
		//div.style.border = "1px solid #BC3B3A";
		div.style.color = "white";
		div.style.height = "18px";
		div.style.width = "50px";
		//div.style.whiteSpace = "nowrap";
		//div.style.MozUserSelect = "none";
		div.style.fontSize = "12px"
		    div.className = "markerContentStyle";
		var markerSpan = document.createElement("a");
		markerSpan.innerHTML = "Hi，我换新装备啦！";
		div.appendChild(markerSpan);
		div.onclick = function(){
		    div.style.width = "539px";
		    div.style.height = "250px";
		    this.style.background = "url(../assets/img/openning_detail_back.png)";
		    this.style.borderColor = "#0000ff";
		    marker.offset = new AMap.Pixel(-125,-539);
		    alert(marker.offset);
		    mapObj.setZoomAndCenter(14,new AMap.LngLat(116.205467,39.907761));
		}
		return div;
	    };
            var createLittleMarker = function(){
                var div = document.createElement("div");
                div.style.backgroundColor = "blue";
                div.style.color = "white"
                div.style.height = "18px";
                div.style.width = "auto";
                div.style.fontSize = "12px"
                div.className = "markerContentStyle";
                var markerSpan = document.createElement("a");
                markerSpan.innerHTML = "Hi，我换新装备啦！";
                div.appendChild(markerSpan);
                return div;
            };

	    session.event(gaodeMap, function(){
		    var position=new AMap.LngLat(121.50058,31.238877);//创建中心点坐标  
		    mapObj=new AMap.Map("gaodeMap",{center:position,level:15});//创建地图实例 
		    mapObj.plugin(["AMap.ToolBar"],function(){  
			tool=new AMap.ToolBar({  
direction:false,//隐藏方向导航  
ruler:false,//隐藏视野级别控制尺  
autoPosition:false//禁止自动定位  
});
			marker=new AMap.Marker({                    
			    // icon:"http://webapi.amap.com/images/marker_sprite.png",  
content:createMarkerContent(),
position:new AMap.LngLat(116.405467,39.907761)  
});  
			marker.setMap(mapObj);  //在地图上添加点
			mapObj.addControl(tool);
			//AMap.event.addListener(tool,'location',function callback(e){   
			//    locationInfo = e.lnglat;
			//	alert(locationInfo);
			//    });  
			AMap.event.addListener(mapObj,'moveend',function callback(e){
			    //alert(this.getCenter());
			    var lng = this.getCenter().getLng();
			    var lat = this.getCenter().getLat();
			    var url = "http://api.housemart.cn:8080/server/plate/nearBy.controller?appCode=app_test_code&lat="+lat+"&lng="+lng;
			    var getCallback = function(data){
			    var myData = JSON.parse(data);
			    $('#locationPlate').html(myData['data']['name']);
			    }
			    sumeru.external.get(url, getCallback);
			    var url ="http://api.housemart.cn:8080/server/house/residenceSale/mapSearchNew.controller?appCode=app_test_code&lat="+lat+"&lng="+lng+"&range=2000&pageIndex=1&pageSize=35&clientUId=74E1B63AF061"
			    var getCallback = function(data){
			    var myData = JSON.parse(data)
			    myData = myData['data'];
			    for (var i=0; i<myData.length; i++){
			    var lng = myData[i]['position']['lng'];
			    var lat = myData[i]['position']['lat'];
			    marker=new AMap.Marker({                    
content:createLittleMarker(),  
position:new AMap.LngLat(lng,lat)  
});  
marker.setMap(mapObj);  //在地图上添加点 
}

}
sumeru.external.get(url, getCallback);
});
});
});

session.eventMap('#nearby',{
	'focus':function(e){
	alert("我是附近")
	},
	'click':function(e){
	tool.doLocation();
	}
	});
session.eventMap("#search",{
	'click':function(e){
	env.redirect("/itworks");
	}
	});
session.eventMap("#price",{
	'click':function(e){
		document.getElementById("price").style.color="yellow"; 
	}
        });
session.eventMap('#price',{
        'click':function(e){
        }  
        });
}
});
