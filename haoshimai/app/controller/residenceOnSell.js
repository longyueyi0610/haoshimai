sumeru.router.add({
	pattern: '/residenceOnSell',
	action: 'App.residenceOnSell'
});


App.residenceOnSell = sumeru.controller.create(function(env, session, param){
	var view = 'residenceOnSell';	
	var residenceId = param['residenceId'];//小区id
	var orderType = 1;//默认1
	var pageSize = 35;
	var pageIndex = 1;
	var clientUId = env['clientId'];

	var getDetails = function(){
        env.subscribe('pubresidenceDetail',residenceId,function(residenceDetailCollection){
            session.bind('residence-name', {
                data:residenceDetailCollection.find()[0],
            });
        });
		var args = new Array();
		args[0] = residenceId;
		args[1] = orderType;
		args[2] = pageIndex;
		args[3] = pageSize;
		args[4] = clientUId;

		env.subscribe('pubresidenceOnSell',args,function(houseListCollection){
            session.bind('houselist-container', {
                houseList:houseListCollection.find()
            });
        });
    };

    env.onload = function(){
        return [getDetails];
    };	

	env.onrender = function(doRender){
        doRender("residenceOnSell", ['push','right']);
    };

    env.onready = function(){
		
		$('.back').click(function(){
			history.back();
		});

		$('#house-detail-icon').click(function(){
			env.redirect('/residenceDetail',{'residenceId':residenceId},true);
		});

		$('#sort').click(function(){
		});

		session.event('hose',function(){
			if(window.chrome) {
								$('.banner li').css('background-size', '100% 100%');
											}
			$('.banner').unslider({
				dots:true
			});
			
		});

		$('.banner').unslider({
			speed: 500,
			dots: true,
			fluid:false
		});
		
    };

});
