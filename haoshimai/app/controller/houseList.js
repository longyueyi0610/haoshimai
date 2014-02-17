sumeru.router.add({
	pattern: '/houseList',
	action: 'App.houseList'
});

App.houseList = sumeru.controller.create(function(env, session, param) {
	var view = 'houseList';
	var residenceId = param['residenceId']; //小区id
	var orderType = 1; //默认1
	var pageSize = 35;
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

        if(way == 'rent'){
		    session.houseListCollection = env.subscribe('pubresidenceRent', args, function(houseListCollection) {
			    session.bind('residence-container', {
				    houseList: houseListCollection.find(),
                    saleRentType: 'rent',
                    soldHistory: soldHistory
			    });
		    });
        }else if(way == 'sale'){
            session.houseListCollection = env.subscribe('pubresidenceOnSell', args, function(houseListCollection) {
			    session.bind('residence-container', {
				    houseList: houseListCollection.find(),
                    saleRentType: 'sale',
                    soldHistory: soldHistory
			    });
		    });
        }else if(way == 'sold'){
            session.houseListCollection = env.subscribe('pubresidenceSold', args, function(houseListCollection) {
			    session.bind('residence-container', {
				    houseList: houseListCollection.find(),
                    soldHistory: soldHistory
			    });
		    });
        }else{
            session.houseListCollection = env.subscribe('pubresidenceOnSell', args, function(houseListCollection) {
			    session.bind('residence-container', {
				    houseList: houseListCollection.find(),
                    saleRentType: 'all',
                    soldHistory: soldHistory
			    });
		    });

        }

    }

	var getDetails = function() {
        var args = [];
        args[0] = residenceId;
        args[1] = clientUId;
		env.subscribe('pubresidenceDetail', args, function(residenceDetailCollection) {
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
                soldHistory = true;
                subWay('sold');
            });
            $('#residenceOnSell #sale').click(function(){
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
                    alert('x');
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
				session.commit();
			});

			$('#sort-per').click(function() {
				$('#allsorts').slideToggle();
				$(".modal-backdrop").toggle();
				orderType = 3;
				session.set('orderType', orderType);
				session.commit();
			});

			$('#sort-area').click(function() {
				$('#allsorts').slideToggle();
				$(".modal-backdrop").toggle();
				orderType = 4;
				session.set('orderType', orderType);
				session.commit();
			});

			$('#sort-time').click(function() {
				$('#allsorts').slideToggle();
				$(".modal-backdrop").toggle();
				orderType = '1';
				session.set('orderType', orderType);
				session.commit();
			});
		});
	};
});
