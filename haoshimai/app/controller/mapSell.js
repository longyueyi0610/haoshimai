sumeru.router.add({
	pattern: '/mapSell',
	action: 'App.mapSell'
});

sumeru.router.setDefault('App.mapSell');

App.mapSell = sumeru.controller.create(function(env, session){
		var view = 'mapSell';
		var host = sumeru.config.get("dataServerHost");

		env.onrender = function(doRender){
			doRender(view,['shake','left']);
		};

		env.onready = function(){

			var mapObj,toolBar,myLocation,marker,centerPosition,previousFlag,nowFlag;//高德地图、地图工具、我的位置、标记、中心点、上一个标记，现在的标记
			var markerContents = [];//为了不重复加载点坐标

			var createMarkerFlag = function(residenceName, residencePara){//创建小标记
				var div = document.createElement("div");//总体
                /*div.style.color = "white"
				div.style.height = "40px";
				div.style.width = "auto";
                div.style.fontSize = "20px";	
				div.className = "MarkerFlag";

				var leftImg = document.createElement("div");
				leftImg.style.float = "left";
				leftImg.style.width = "10px";
				leftImg.style.height = "40px;";
				leftImg.style.background = "url(../assets/img/flag_left.png)";

				var middle = document.createElement("div");
				middle.style.float = "left";
				middle.style.background = "url(../assets/img/flag_middle.png)";

				var right = document.createElement("div");
				middle.style.float = "left";
				right.style.width = "10px";
				right.style.height = "40px;";
				middle.style.background = "url(../assets/img/flag_right.png)";
				
				div.appendChild(leftImg);
				div.appendChild(middle);
				div.appendChild(right);*/
				//div.className = "markerFlag";
				div.style.backgroundColor = "blue";
				div.style.whiteSpace = "nowrap";
				div.style.height = "40px";
				div.style.linHeight = "40px";
				div.style.width = "auto";
				div.style.fontSize = "20px";
				var span = document.createElement("span");
				span.innerHTML=residenceName + " | "

				var span2 = document.createElement("span");
				span2.innerHTML = residencePara;
				div.appendChild(span);
				div.appendChild(span2);
                return div;
			};

			var createMarkerContent = function(position){//创建大标记
				var simple = Library.utils.getresidenceSimple(markerContents,position);
				var residenceName,priceRange,onSaleCount,pic,residenceId;

				if (simple != null){
					residenceName = simple[0];
					priceRange = simple[1];
					onSaleCount = simple[2];
					pic = simple[3];
					residenceId= simple[4];
				}
				
				var div = document.createElement("div");
                div.className = "markerContentStyle";
				div.style.width = "539px";
				div.style.height = "250px";
				div.style.background = "url(../assets/img/openning_detail_back.png)";
                var markerSpan = document.createElement("a");
                markerSpan.innerHTML = residenceName + priceRange + onSaleCount;
				var markerPic = document.createElement('img');
				markerPic.src = pic;
				markerPic.style.width="50px";
				markerPic.style.height="50px";
                div.appendChild(markerSpan);
				div.appendChild(markerPic);
                div.onclick = function(){
					env.redirect("/residenceOnSell",{'residenceId':residenceId,'residenceName':residenceName,'onSaleCount':onSaleCount});
                }
                return div;	
			};
			var loadFlag = function(lat,lng){//加载点坐标
				var url = host + '/server/plate/nearBy.controller?appCode=app_test_code&lat=' + lat + '&lng=' + lng;
                var getCallback = function(data){
                    var oriData = JSON.parse(data);
                    $('#locationPlate').html(oriData["data"]["name"]);
                };
                sumeru.external.get(url, getCallback);

                var url = host + "/server/house/residenceSale/mapSearchNew.controller?appCode=app_test_code&lat="+lat+"&lng="+lng+"&range=2000&pageIndex=1&pageSize=35&clientUId=74E1B63AF0661";
                var getCallback = function(data){
                    var myData = JSON.parse(data);
                    oriData = myData['data'];

                    for (var i=0; i<oriData.length; i++){
                        var lng = oriData[i]['position']['lng'];
                        var lat = oriData[i]['position']['lat'];
						var contentStr = JSON.stringify(oriData[i]);
						if(Library.arrayOpt.addElement(markerContents,contentStr)){

							marker=new AMap.Marker({
								content:createMarkerFlag(oriData[i]['residenceName'], oriData[i]['price']),
								position:new AMap.LngLat(lng,lat)
							});
							marker.setMap(mapObj);
							AMap.event.addListener(marker,'click',function callback(e){
								mapObj.panTo(this.getPosition());
								this.hide();
								var lng = this.getPosition().getLng();
								var lat = this.getPosition().getLat();
								var bigMarker = new AMap.Marker({
									content:createMarkerContent(this.getPosition()),
									position:new AMap.LngLat(lng,lat),
									offset:new AMap.Pixel(-270,-250),
									zIndex:999
								});
								bigMarker.setMap(mapObj);
								if(previousFlag == null){
									previousFlag = this;
									nowFlag = bigMarker;
								}else{
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

			var mapInit = function(){//地图初始化
				var url = host + '/server/position.controller?appCode=app_test_code&cityId=1&positionId=1&type=1';
				var lng;
				var lat;
				var getCallback = function(data){
					var oriData = JSON.parse(data);
					var position = oriData['data'];
					lng = position['lng'];
					lat = position['lat'];
					centerPosition = new AMap.LngLat(lng,lat);//创建中心坐标
					mapObj = new AMap.Map("gaodeMap", {center:centerPosition,level:16});
					mapObj.plugin(["AMap.ToolBar"],function(){
						toolBar = new AMap.ToolBar();
						mapObj.addControl(toolBar);
						toolBar.hide();
					});
					loadFlag(lat,lng);

					AMap.event.addListener(mapObj,'moveend',function callback(e){
                    //地区名称
						var lng = this.getCenter().getLng();
						var lat = this.getCenter().getLat();
                		loadFlag(lat,lng); 
					});
				};
				sumeru.external.get(url, getCallback);
			};

			session.event(gaodeMap, function(){
				mapInit();
			});

			session.eventMap('#nearbyButton',{//定位我的位置
				'click':function(e){
					toolBar.doLocation();
				}
			});
			session.eventMap("#searchButton",{
				'click':function(e){
					env.redirect("/residentSearch");
				}
			});
            
			var tabSwitch = function(tab){
				var price = 'price';
				var annualPriceIncreasement = 'annualPriceIncreasement';
				var annualTurnoverRate = 'annualTurnoverRate';
				var rentRevenue = 'rentRevenue';
				switch(tab){
					case price:
					document.getElementById("price").style.color="#f47c00";
					document.getElementById("annualPriceIncreasement").style.color="white";
					document.getElementById("annualTurnoverRate").style.color="white";
					document.getElementById("rentRevenue").style.color="white";
					break;
					case annualPriceIncreasement:
					document.getElementById("price").style.color="white";
                    document.getElementById("annualPriceIncreasement").style.color="#f47c00";
                    document.getElementById("annualTurnoverRate").style.color="white";
                    document.getElementById("rentRevenue").style.color="white";
                    break;
					case annualTurnoverRate:
					document.getElementById("price").style.color="white";
                    document.getElementById("annualPriceIncreasement").style.color="white";
                    document.getElementById("annualTurnoverRate").style.color="#f47c00";
                    document.getElementById("rentRevenue").style.color="white";
					break;
					case rentRevenue:
                    document.getElementById("price").style.color="white";
                    document.getElementById("annualPriceIncreasement").style.color="white";
                    document.getElementById("annualTurnoverRate").style.color="white";
                    document.getElementById("rentRevenue").style.color="#f47c00";
					break;
					}

			};

			session.eventMap("#price",{//price tab
				'click':function(e){
					tabSwitch('price');
				}
			});
			session.eventMap("#annualPriceIncreasement",{//tab
                'click':function(e){
                    tabSwitch('annualPriceIncreasement');
                }
            });
			session.eventMap("#annualTurnoverRate",{//tab
                'click':function(e){
                    tabSwitch('annualTurnoverRate');
                }
            });
			session.eventMap("#rentRevenue",{//tab
                'click':function(e){
                    tabSwitch('rentRevenue');
                }
            });
		}
});
