sumeru.router.add({
	pattern: '/residenceOnSell',
	action: 'App.residenceOnSell'
});

App.residenceOnSell = sumeru.controller.create(function(env, session, param) {
	var view = 'residenceOnSell';
	var residenceId = param['residenceId']; //小区id
	var orderType = 1; //默认1
	var pageSize = 35;
	var pageIndex = 1;
	var clientUId = param['clientUId'];

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
			});
			session.bind('residence-container', {
				data: residenceDetailCollection.find()[0],
			});
		});

		session.set('orderType', orderType);

		var args = new Array();
		args[0] = residenceId;
		args[1] = session.get('orderType');
		args[2] = pageIndex;
		args[3] = pageSize;
		args[4] = clientUId;

		session.houseListCollection = env.subscribe('pubresidenceOnSell', args, function(houseListCollection) {
			session.bind('residence-container', {
				houseList: houseListCollection.find()
			});
		});
	};


	env.onload = function() {
		return [getDetails];
	};

	env.onrender = function(doRender) {
		doRender("residenceOnSell", ['push', 'right']);
	};

	env.onready = function() {

		var $root = $("#residenceOnSell");

		session.event('residence-name', function() {
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
			}

			$('.residence-wrap').click(function() {
				env.redirect('/houseDetail', {
					'houseId': $(this).attr("data-id"),
                    'clientUId': clientUId
				}, true);
			});

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
