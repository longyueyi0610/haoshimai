sumeru.router.add({
	pattern: '/houseDetail',
	action: 'App.houseDetail'
});

//sumeru.router.setDefault('App.itworks');



App.houseDetail = sumeru.controller.create(function(env, session, param) {
	var view = 'houseDetail';
	var houseId = param['houseId'];
    var clientUId = param['clientUId'];
    var saleRent = param['saleRent'];

	var getDetails = function() {
        var args = [];
        args[0] = houseId;
        args[1] = clientUId;

		session.houseDetailCollection = env.subscribe('pubhouseDetail', args, function(houseDetailCollection) {
			var data = houseDetailCollection.find()[0];
			data.picURLWithSize = _.map(data.picURLWithSize, function(item, index) {
				return {
					url: item,
					first: index == 0,
					index: index
				};
			});

			session.bind('house-detail', {
				data: data,
                saleRent: saleRent
			});
		});
	};

	env.onload = function() {
		return [getDetails];
	};

	env.onrender = function(doRender) {
		doRender(view, ['none', 'z']);
	};

	env.onready = function() {
		session.event('house-detail', function() {
			var $slides = $("#house-detail-images");
			if ($slides.find(".item").length !== 0) {
				$slides.carousel({
					interval: 0
				});

				touch.on($slides[0], 'drag', function(e) {
					if (e.direction === 'left') {
						$slides.carousel('next');
					} else if (e.direction === 'right') {
						$slides.carousel('prev');
					}
				});
                touch.on($slides[0], 'click', function(e) {
                    var picStr = JSON.stringify(session.houseDetailCollection[0]['picURL']);
                    var activeUrl = $('#house-detail-images .active img').attr('src');
                    sessionStorage.clear();
                    sessionStorage.setItem('picStr', picStr);
                    sessionStorage.setItem('activeUrl', activeUrl);
                    env.redirect('/picShow',{},true);
                }); 
			}

			$(".back").click(function() {
				history.back();
			});

			$('#house-address').click(function() {
				var lng = $(this).attr('lng');
				var lat = $(this).attr('lat');
				env.redirect('/houseAddress', {
					'lng': lng,
					'lat': lat
				},true);
			});
			$('#house-residence').click(function() {
				var residenceId = $(this).attr('data-id');
				env.redirect('/residenceDetail', {
					'residenceId': residenceId,
                    'clientUId': clientUId
				}, true);
			});
		});
		$('#askButton').click(function() {
            var brokerName = session.houseDetailCollection[0]['brokerName'];
            var brokerId = session.houseDetailCollection[0]['brokerId'];
			env.redirect('/chat', {
                'houseId': houseId,
                'clientUId': clientUId,
                'brokerId' : brokerId,
                'brokerName': brokerName,
                'saleRent': saleRent
            },true);
		});
	};

});
