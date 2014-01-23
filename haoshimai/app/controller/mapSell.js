//地图出售房首页，现在也是默认页
sumeru.router.add({
	pattern: '/mapSell',
	action: 'App.mapSell'
});

sumeru.router.setDefault('App.mapSell');

//定义几个全局变量
host = sumeru.config.get("dataServerHost"); //host地址
appCode = 'app_test_code';
clientUId = ''; //客户端ID

App.mapSell = sumeru.controller.create(function(env, session) {
	clientUId = env['clientId'];

	var _markerTemplate = null;
	var _contentTemplate = null;

	var view = 'mapSell';

    var getDetails = function(){
        env.subscribe('pubunreadCounts',clientUId,function(unreadCountscollection){
            session.bind('count', {
                //count:unreadCountsCollection.find()['count'],
                //test effect
                count:'10',
            }); 
        }); 
    };  

    env.onload = function(){
        return [getDetails];
    }; 

	env.onrender = function(doRender) {
		doRender(view, ['shake', 'left']);
	};

	env.onready = function() {

		var mapObj, toolBar, myLocation, marker, centerPosition, previousFlag, nowFlag; //高德地图、地图工具、我的位置、标记、中心点、上一个标记，现在的标记
		var markerContents = []; //为了不重复加载点坐标

		var markers = new Array(); //marker数组

		var tabFlag = "annualPriceIncreasement"; //初始的tab选项

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

			if (!_contentTemplate) {
				_contentTemplate = _.template(
					"<div class='content-marker'>" +
					"	<img src='<%= img %>'/>" +
					"	<div class='info'>" +
					"		<p><%- name %></p>" +
					"		<p>租金范围：<%- range %></p>" +
					"		<p>在租：<%- count %></p>" +
					"	</div>" +
					"</div>"
				);
			}


			var simple = Library.utils.getresidenceSimple(markerContents, position);
			var residenceName, priceRange, onSaleCount, pic, residenceId;

			if (simple != null) {
				residenceName = simple[0];
				priceRange = simple[1];
				onSaleCount = simple[2];
				pic = simple[3];
				residenceId = simple[4];
			}

			var el = _contentTemplate({
				name: residenceName,
				range: priceRange,
				img: pic,
				count: onSaleCount
			});

			var $el = $(el).click(function() {
				env.redirect("/residenceOnSell", {
					'residenceId': residenceId,
                    'clientUId': clientUId
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

			var url = host + "/server/house/residenceSale/mapSearchNew.controller?appCode=" + appCode + "&lat=" + lat + "&lng=" + lng + "&range=2000&pageIndex=1&pageSize=35&clientUId=" + clientUId;
			var getCallback = function(data) {
				var myData = JSON.parse(data);
				oriData = myData['data'];

				for (var i = 0; i < oriData.length; i++) {
					var lng = oriData[i]['position']['lng'];
					var lat = oriData[i]['position']['lat'];
					var contentStr = JSON.stringify(oriData[i]);
					if (Library.arrayOpt.addElement(markerContents, contentStr)) {

						marker = new AMap.Marker({
							content: createMarkerFlag(oriData[i]['residenceName'], oriData[i][tabFlag]),
							offset: new AMap.Pixel(-30, -50),
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
								offset: new AMap.Pixel(-172, -130),
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
			};
			sumeru.external.get(url, getCallback);
		};

		session.event(gaodeMap, function() {
			mapInit();
		});

		session.eventMap('#nearbyButton', { //定位我的位置
			'click': function(e) {
				toolBar.doLocation();
				loadFlag(mapObj.getCenter()['lat'], mapObj.getCenter()['lng']);
			}
		});
		session.eventMap("#searchButton", {
			'click': function(e) {
				env.redirect("/residenceSearch",{'clientUId':clientUId},true);
			}
		});
        session.eventMap('#enquiry-history-button', {
            'click':function(e) {
                env.redirect("/enquiryHistory",{'clientUId':clientUId},true);
            }
        });

		var tabSwitch = function(tab) { //切换tab的操作
			$(".map-tab li.active").removeClass("active");
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
