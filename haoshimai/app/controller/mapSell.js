//地图出售房首页，现在也是默认页
sumeru.router.add({
	pattern: '/mapSell',
	action: 'App.mapSell'
});

sumeru.router.setDefault('App.mapSell');

//定义几个全局变量
host = sumeru.config.get("dataServerHost"); //host地址
appCode = 'app_test_code';

App.mapSell = sumeru.controller.create(function(env, session) {
    var clientUId = sumeru.clientId;

	var _markerTemplate = null;
	var _contentTemplate = null;

	var view = 'mapSell';
    var count = 0;

	env.onrender = function(doRender) {
        doRender(view,['none','z']);
	};

	env.onready = function() {
        //轮询取未读信息数
        var getUnCounts = function(){
            var url = host + '/server/house/chatSummary.controller?appCode=' + appCode + '&clientUId=' + clientUId + '&totalOnly=1';
            var getCallback = function(data){
                count = JSON.parse(data)['data']['count'];
                if (count != 0){
                    $('#count-badge').html(count);
                }
            }
            sumeru.external.get(url, getCallback);
        }
        var timeID = setInterval(getUnCounts, 5000);

		var mapObj, toolBar, myLocation, marker, centerPosition, previousFlag, nowFlag; //高德地图、地图工具、我的位置、标记、中心点、上一个标记，现在的标记，出售房或者出租房
       
		var markerContents = []; //为了不重复加载点坐标

		var markers = new Array(); //marker数组

		var tabFlag = "annualPriceIncreasement"; //初始的tab选项,这里虽然数据接口不同，但是接口获取的数据相同，所以把出租房选项当一个tab来看待,tabFlag='rentPrice'

        var clearFlags = function(markerContents, oriData, markers){//清楚地图上保存的数据(4公里以外的数据)
            for (var i = 0; i < markers.length; i++) {
                var isIn = false;//是否已加载，false代表没有
                for(var j = 0; j< oriData.length; j++){
                    if (oriData[j]['id'] == markers[i].data['id']){
                        isIn = true;
                    }else{
                        ;
                    }
                }
                if (!isIn){
                    markers[i].marker.setMap(null);
                    markers.splice(i,1);
                    markerContents.splice(i,1);
                }
            }
        }

		var createMarkerFlag = function(residenceName, residencePara) { //创建小标记
			if (!_markerTemplate) {
				_markerTemplate = _.template(
					"<div class='marker-wrap'>" +
					"	<div class='marker'><span class='content'>" +
					"		<span class='name'><%- name %></span><span class='para'><%- para %></span>" +
					"	</span></div>" +
					"</div>"
				);
			}

			return _markerTemplate({
				name: residenceName,
				para: residencePara
			});
		};

		var createMarkerContent = function(position) { //创建大标记

			if (true) {
                if (tabFlag == 'rentPrice'){
				    _contentTemplate = _.template(
					    "<div class='content-marker'>" +
					    "	<img src='<%= img %>' " + "onerror="+'"'+"javascript:this.src=" +"'../assets/img/nopic_default.png'" +'"'+ "/>" +
					    "	<div class='info'>" +
					    "		<p><%- name %></p>" +
					    "		<p>租金范围：<%- range %></p>" +
					    "		<p>在租：<%- count %></p>" +
					    "	</div>" +
					    "</div>"
				    );
                }else{
                    _contentTemplate = _.template(
					    "<div class='content-marker'>" +
                        "   <img src='<%= img %>' " + "onerror="+'"'+"javascript:this.src=" +"'../assets/img/nopic_default.png'" +'"'+ "/>" +
					    "	<div class='info'>" +
					    "		<p><%- name %></p>" +
					    "		<p>售价范围：<%- range %></p>" +
					    "		<p>在售：<%- count %></p>" +
					    "	</div>" +
					    "</div>"
				    );
                }

			}


			var simple = Library.utils.getresidenceSimple(markerContents, position);
			var residenceName, priceRange, onSaleCount, pic, residenceId, rentRange, onRentCount;

			if (simple != null) {
				residenceName = simple[0];
				priceRange = simple[1];
				onSaleCount = simple[2];
				pic = simple[3];
				residenceId = simple[4];
                rentRange = simple[5];
                onRentCount = simple[6];
			}

			var el = _contentTemplate({
				name: residenceName,
				range: (tabFlag=='rentPrice')?rentRange:priceRange,
				img: pic,
				count: (tabFlag=='rentPrice')?onRentCount:onSaleCount
			});

			var $el = $(el).click(function() {
                var saleRent = (tabFlag=='rentPrice')?'rent':'sale'; 
                clearInterval(timeID);
				env.redirect("/houseList", {
					'residenceId': residenceId,
                    'clientUId': clientUId,
                    'saleRent':saleRent
				}, true);
			});

			return $el[0];
		};


		var loadFlag = function(lat, lng) { //加载点坐标

			var url = host + '/server/plate/nearBy.controller?appCode=' + appCode + '&lat=' + lat + '&lng=' + lng;
			var getCallback = function(data) {
				var oriData = JSON.parse(data);
				$('#locationPlate').html(oriData["data"]["name"]);
			};
			sumeru.external.get(url, getCallback);

            url = host + "/server/house/residenceRent/mapSearchNew.controller?appCode=" + appCode + "&lat=" + lat + "&lng=" + lng + "&range=4000&pageIndex=1&pageSize=20&clientUId=" + clientUId;
			var getCallback = function(data) {
				var myData = JSON.parse(data);
				oriData = myData['data'];
                
                //加一步操作，进行删除flag操作
                clearFlags(markerContents, oriData, markers);

				for (var i = 0; i < oriData.length; i++) {
					var lng = oriData[i]['position']['lng'];
					var lat = oriData[i]['position']['lat'];
					var contentStr = JSON.stringify(oriData[i]);
					if (Library.arrayOpt.addElement(markerContents, contentStr)) {

						marker = new AMap.Marker({
							content: createMarkerFlag(oriData[i]['residenceName'], oriData[i][tabFlag]),
							offset: new AMap.Pixel(-30, -36),
							position: new AMap.LngLat(lng, lat)
						});
						marker.setMap(mapObj);
						var flagObj = new Object();
						flagObj.marker = marker;
						flagObj.data = oriData[i];

						markers.push(flagObj); //添加到数组
						AMap.event.addListener(marker, 'click', function callback(e) {
							mapObj.panTo(this.getPosition());
							this.hide();
							var lng = this.getPosition().getLng();
							var lat = this.getPosition().getLat();
							var bigMarker = new AMap.Marker({
								content: createMarkerContent(this.getPosition()),
								position: new AMap.LngLat(lng, lat),
								offset: new AMap.Pixel(-150, -140),
								zIndex: 999
							});
							bigMarker.setMap(mapObj);
							if (previousFlag == null) {
								previousFlag = this;
								nowFlag = bigMarker;
							} else {
								previousFlag.show();
								previousFlag = this;
								nowFlag.setMap(null);
								nowFlag = bigMarker;
							}
						});
					}
				}
			};
			sumeru.external.get(url, getCallback);
		};

		var updateFlag = function() { //按照tab更新flag内容
			if (nowFlag != null) {
				previousFlag.show();
				nowFlag.setMap(null);
				previousFlag = null;
				nowFlag = null;
			}
			for (var i = 0; i < markers.length; i++) {
				markers[i].marker.setContent(createMarkerFlag(markers[i].data['residenceName'], markers[i].data[tabFlag]));
			}
		};

		var mapInit = function() { //地图初始化
			var url = host + '/server/position.controller?appCode=' + appCode + '&cityId=1&positionId=1&type=1';
			var lng;
			var lat;
			var getCallback = function(data) {
				var oriData = JSON.parse(data);
				var position = oriData['data'];
				lng = position['lng'];
				lat = position['lat'];
				centerPosition = new AMap.LngLat(lng, lat); //创建中心坐标
				mapObj = new AMap.Map("gaodeMap", {
					center: centerPosition,
					level: 16
				});
				mapObj.plugin(["AMap.ToolBar"], function() {
					toolBar = new AMap.ToolBar();
					mapObj.addControl(toolBar);
					toolBar.hide();
				});
				loadFlag(lat, lng);

				AMap.event.addListener(mapObj, 'moveend', function callback(e) {
					//地区名称
					var lng = this.getCenter().getLng();
					var lat = this.getCenter().getLat();
					loadFlag(lat, lng);
				});

                AMap.event.addListener(mapObj, 'click', function callback(e) {//缩小小旗
                    if (nowFlag != null) {
                        previousFlag.show();
                        nowFlag.setMap(null);
                        previousFlag = null;
                        nowFlag = null;
                    }
                });

			};
            getUnCounts();
			sumeru.external.get(url, getCallback);

		};

		session.event(gaodeMap, function() {
			mapInit();
		});
        
        //出售房和出租房切换
        $('#on-rent').click(function(){
            tabFlag = 'rentPrice'
            $('#map-sell-banner .sub').css('display','none');
            updateFlag();
            $('#sale_rent_bg').animate({left:'28px'},'fast',function(){
                $('.header #sale_rent li.active').removeClass("active");
                $('#on-rent').parent().addClass("active");
            });
        });
        
        $('#on-sale').click(function(){
            tabFlag = 'annualPriceIncreasement';
            $('#map-sell-banner .sub').css('display','block');
            updateFlag();
            $('#sale_rent_bg').animate({left:'-29px'},'fast',function(){
                $('.header #sale_rent li.active').removeClass("active");
                $('#on-sale').parent().addClass("active");
            });
        });

		session.eventMap('#nearbyButton', { //定位我的位置
			'click': function(e) {
                $('#nearbyButton img').attr('src', '../assets/img/bt_nearby_selected.png');
                clearInterval(timeID);
				toolBar.doLocation();
				loadFlag(mapObj.getCenter()['lat'], mapObj.getCenter()['lng']);
                setTimeout("$('#nearbyButton img').attr('src', '../assets/img/nearicon.png');", 500);
			}
		});
		session.eventMap("#searchButton", {
			'click': function(e) {
                $('#searchButton img').attr('src', '../assets/img/bt_search_selected.png');
                var saleRent = (tabFlag=='rentPrice')?'rent':'sale';
                clearInterval(timeID);
				env.redirect("/residenceSearch",{'clientUId':clientUId, 'saleRent': saleRent},true);
                setTimeout("$('#searchButton img').attr('src', '../assets/img/bt_search.png');", 500);
			}
		});

        session.eventMap('#enquiry-history-button', {
            'click':function(e) {
                $('#enquiry-history-button img').attr('src', '../assets/img/bt_dialogue_selected.png');
                clearInterval(timeID);
                env.redirect('/enquiryHistory',{'clientUId':clientUId},true);
                setTimeout("$('#enquiry-history-button img').attr('src', '../assets/img/bt_dialogue.png');", 500);
            }
        });

		var tabSwitch = function(tab) { //切换tab的操作
			$(".sub li.active").removeClass("active");
			$("#" + tab).parent().addClass("active");
			tabFlag = tab;
			updateFlag();
		};

		session.eventMap("#price", { //price tab
			'click': function(e) {
				tabSwitch('price');
			}
		});
		session.eventMap("#annualPriceIncreasement", { //tab
			'click': function(e) {
				tabSwitch('annualPriceIncreasement');
			}
		});
		session.eventMap("#annualTurnoverRate", { //tab
			'click': function(e) {
				tabSwitch('annualTurnoverRate');
			}
		});
		session.eventMap("#rentRevenue", { //tab
			'click': function(e) {
				tabSwitch('rentRevenue');
			}
		});
	}
});
