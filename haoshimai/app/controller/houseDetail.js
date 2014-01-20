sumeru.router.add({
pattern: '/houseDetail',
action: 'App.houseDetail'
});

//sumeru.router.setDefault('App.itworks');



App.houseDetail = sumeru.controller.create(function(env, session, param){
		var view = 'houseDetail';
		var houseId = param['houseId'];

		var getDetails = function(){
			env.subscribe('pubhouseDetail',houseId,function(houseDetailCollection){
				session.bind('house-detail', {
					data:houseDetailCollection.find()[0],
				});
			});
		};

		env.onload = function(){
			return [getDetails];
		};

        env.onrender = function(doRender){
            doRender(view, ['fade','z-index']);
        };
		
		env.onready = function(){
			session.event('house-detail',function(){
				$('#house-address').click(function(){
					var lng = $(this).attr('lng');
					var lat = $(this).attr('lat');
					env.redirect('/houseAddress',{'lng':lng,'lat':lat},true);
				});
				$('#house-residence').click(function(){
					var residenceId = $(this).attr('data-id');
					env.redirect('/residenceDetail',{'residenceId':residenceId},true);
				});
			});
			$('#askButton').click(function(){
				env.redirect('/chat',true);
			});
		};

});
