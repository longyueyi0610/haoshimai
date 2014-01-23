sumeru.router.add({
pattern: '/houseAddress',
action: 'App.houseAddress'
});

App.houseAddress = sumeru.controller.create(function(env, session, param){
		var view = 'houseAddress';
		var lng = param['lng'];
		var lat = param['lat'];

        env.onrender = function(doRender){
            doRender(view, ['fade','z-index']);
        };

        env.onready = function(){
			var mapOb, centerPosition, marker;
			centerPosition = new AMap.LngLat(lng,lat);//创建中心坐标
			mapObj = new AMap.Map("house-address-map", {center:centerPosition,level:17});
			marker = new AMap.Marker({
				icon:"http://webapi.amap.com/images/marker_sprite.png",  
				position:new AMap.LngLat(lng,lat)
			});
			marker.setMap(mapObj);

			$("#house-address .back").click(function() {
				history.back();
			});
        };
});
