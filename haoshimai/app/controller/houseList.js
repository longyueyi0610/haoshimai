sumeru.router.add({
	pattern: '/houseList',
	action: 'App.houseList'
});

App.houseList = sumeru.controller.create(function(env, session, param) {
	var view = 'houseList';
	var residenceId = param['residenceId']; //小区id
	var orderType = 1; //默认1
	var pageSize = 5;
	var pageIndex = 1;
	var clientUId = param['clientUId'];
    var saleRent = param['saleRent'];
    var residenceName = param['residenceName'];
    var saleCount = param['saleCount'];
    var rentCount = param['rentCount'];
    var soldHistory = false;

    var subWay = function(way){
        var args = new Array();
		args[0] = residenceId;
		args[1] = session.get('orderType');
		args[2] = pageIndex;
		args[3] = pageSize;
		args[4] = clientUId;
        args[5] = '';

        if(way == 'rent'){
            args[5] = 'Rent';
		    session.houseListCollection = env.subscribe('pubhouseInfo', args, function(houseListCollection) {
			    session.bind('residence-container', {
				    houseList: houseListCollection.find()[0]['data'],
                    saleRentType: 'rent',
                    soldHistory: soldHistory,
                    totalCount: houseListCollection.find()[0]['totalCount']
			    });
		    });
        }else if(way == 'sale'){
            /*session.houseListCollection = env.subscribe('pubresidenceOnSell', args, function(houseListCollection) {
			    session.bind('residence-container', {
				    houseList: houseListCollection.find(),
                    saleRentType: 'sale',
                    soldHistory: soldHistory,
                    loadNum: loadNum
			    });
		    });*/
            args[5] = 'Sale';
            session.houseListCollection = env.subscribe('pubhouseInfo', args, function(houseListCollection) {
                session.bind('residence-container', {
                    houseList: houseListCollection.find()[0]['data'],
                    saleRentType: 'sale',
                    soldHistory: soldHistory,
                    totalCount: houseListCollection.find()[0]['totalCount']
                });
            });
        }else if(way == 'sold'){
            args[5] = 'Sold';
            session.houseListCollection = env.subscribe('pubhouseInfo', args, function(houseListCollection) {
			    session.bind('residence-container', {
				    houseList: houseListCollection.find()[0]['data'],
                    soldHistory: soldHistory,
                    totalCount: houseListCollection.find()[0]['totalCount']
			    });
		    });
        }else{
            args[5] = 'Sale';
            session.houseListCollection = env.subscribe('pubhouseInfo', args, function(houseListCollection) {
			    session.bind('residence-container', {
				    houseList: houseListCollection.find(),
                    saleRentType: 'all',
                    soldHistory: soldHistory,
                    totalCount: houseListCollection.find()[0]['totalCount']
			    });
		    });

        }

    }

	var getDetails = function() {
        var args = [];
        args[0] = residenceId;
        args[1] = clientUId;
		session.residenceDetailCollection = env.subscribe('pubresidenceDetail', args, function(residenceDetailCollection) {
			var data = residenceDetailCollection.find()[0]
			var array = [];
			for (var i = 0; i < data.picURLWithSize.length; i++) {
				array[i] = {
					first: i == 0,
					index: i,
					url: data.picURLWithSize[i]
				};
			}
			data.picURLWithSize = array;
			session.bind('residence-name', {
				data: data,
                saleRentType: saleRent,
                residenceName: residenceName,
                saleCount: saleCount,
                rentCount: rentCount,
			});
			session.bind('residence-container', {
				data: residenceDetailCollection.find()[0],
			});
		});

		session.set('orderType', orderType);
        subWay(saleRent);
	};


	env.onload = function() {
		return [getDetails];
	};

	env.onrender = function(doRender) {
        doRender("houseList", ['none', 'z']);
	};

	env.onready = function() {

		var $root = $("#residenceOnSell");

		session.event('residence-name', function() {
            $('#residenceOnSell #onSale').click(function(){
                $('#residenceOnSell .sub li.active').removeClass('active');
                $('#residenceOnSell #onSale').parent().addClass('active');
                soldHistory = false;
                subWay('sale');
                
            });
            $('#residenceOnSell #onRent').click(function(){
                $('#residenceOnSell .sub li.active').removeClass('active');
                $('#residenceOnSell #onRent').parent().addClass('active');
                soldHistory = false;
                subWay('rent');

            });
            $('#residenceOnSell #onSold').click(function(){
                $('#residenceOnSell .sub li.active').removeClass('active');
                $('#residenceOnSell #onSold').parent().addClass('active');
                soldHistory = true;
                subWay('sold');

            });

            $('#residenceOnSell #sold').click(function(){
                $('#sale_sold_bg').animate({left:'38px'},'fast',function(){
                    $('.header #sale_sold li.active').removeClass("active");
                    $('#sold').parent().addClass("active");
                });
                soldHistory = true;
                subWay('sold');
            });
            $('#residenceOnSell #sale').click(function(){
                $('#sale_sold_bg').animate({left:'-38px'},'fast',function(){
                    $('.header #sale_sold li.active').removeClass("active");
                    $('#sale').parent().addClass("active");
                });
                soldHistory = false;
                subWay('sale');
            });

			$('.back').click(function() {
				history.back();
			});
            $('#house-detail-icon').click(function() {
                env.redirect('/residenceDetail', {
                    'residenceId': residenceId,
                    'clientUId':clientUId
                }, true);
            });
		});

		session.event('residence-container', function() {
            var sort = function(){
                if(!soldHistory){
                    subWay(saleRent);
                }else{
                    subWay('sold');
                }
            }
            //图片切换
			var $focuses = $("#residence-onsell-houses");
			if ($focuses.find(".item").length !== 0) {
				$focuses.carousel({
					interval: false
				});
				touch.on($focuses[0], 'drag', function(e) {
					if (e.direction === 'left') {
						$focuses.carousel("next");
					} else {
						$focuses.carousel("prev");
					}
				});
                touch.on($focuses[0], 'click', function(e) {
                    var picStr = JSON.stringify(session.residenceDetailCollection[0]['picURL']);
                    var activeUrl = $('#residence-onsell-houses .active img').attr('src');
                    sessionStorage.clear();
                    sessionStorage.setItem('picStr', picStr);
                    sessionStorage.setItem('activeUrl', activeUrl);
                    env.redirect('/picShow',{}, true);
                });
			}

            if(!soldHistory){
			    $root.on('click', '.residence-wrap', function() {
				    env.redirect('/houseDetail', {
					    'houseId': $(this).attr("data-id"),
                        'clientUId': clientUId,
                        'saleRent': saleRent
				    }, true);
			    });
            }else{//成交历史情况下取消绑定事件
                $root.off('click');
            }
            //加载更多
            $('#residenceOnSell #load-more').click(function() {
                pageSize = pageSize + pageSize;
                $(this).text('加载中...');
                sort();
            });
            //排序功能
			$("#residenceOnSell .sortbar").click(function() {
				$('#allsorts').slideToggle();
				$(".modal-backdrop").toggle();
			});

			$('#sort-cancel').click(function() {
				$('#allsorts').slideToggle();
				$(".modal-backdrop").toggle();
			});

			$('#sort-total').click(function() {
				$('#allsorts').slideToggle();
				$(".modal-backdrop").toggle();
				orderType = 2;
				session.set('orderType', orderType);
				//session.commit();
                sort();
			});

			$('#sort-per').click(function() {
				$('#allsorts').slideToggle();
				$(".modal-backdrop").toggle();
				orderType = 3;
				session.set('orderType', orderType);
                sort();
			});

			$('#sort-area').click(function() {
				$('#allsorts').slideToggle();
				$(".modal-backdrop").toggle();
				orderType = 4;
				session.set('orderType', orderType);
				sort();
			});

			$('#sort-time').click(function() {
				$('#allsorts').slideToggle();
				$(".modal-backdrop").toggle();
				orderType = '1';
				session.set('orderType', orderType);
				sort();
			});
		});
	};
});
