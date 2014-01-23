sumeru.router.add({
    pattern: '/residenceDetail',
    action: 'App.residenceDetail'
});


App.residenceDetail = sumeru.controller.create(function(env, session, param) {
    var view = 'residenceDetail';
    var residenceId = param['residenceId'];

    var getDetails = function() {
        env.subscribe('pubresidenceDetail', residenceId, function(residenceDetailCollection) {
            session.bind('residence-onsell-detail', {
                data: residenceDetailCollection.find()[0],
            });
        });
    };

    env.onload = function() {
        return [getDetails];
    };

    env.onrender = function(doRender) {
        doRender("residenceDetail", ['push', 'right']);
    };

	env.onready = function(){
	};
});
