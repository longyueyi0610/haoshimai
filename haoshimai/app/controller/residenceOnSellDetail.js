sumeru.router.add({
    pattern: '/residenceOnSellDetail',
    action: 'App.residenceOnSellDetail'
});


App.residenceOnSellDetail = sumeru.controller.create(function(env, session, param){
	var view = 'residenceOnSellDetail';
    var host = sumeru.config.get("dataServerHost");
	var residenceId = param['residenceId'];

	var getDetails = function(){
		env.subscribe('pubresidenceDetail',residenceId,function(residenceDetailCollection){
			session.bind('residence-onsell-detail', {
				data:residenceDetailCollection.find()[0],
			});
		});
	};

	env.onload = function(){
		return [getDetails];
	};

	env.onrender = function(doRender){
		doRender("residenceOnSellDetail", ['push','right']);
    };

	env.onready = function(){
		
	};
});
