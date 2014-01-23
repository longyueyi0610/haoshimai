sumeru.router.add({
    pattern: '/residenceSearch',
    action: 'App.residenceSearch'
});

App.residenceSearch = sumeru.controller.create(function(env, session, param) {
    var view = 'residenceSearch';
    var host = sumeru.config.get("dataServerHost");
    var keyword; //输入内容
    var clientUId = param['clientUId'];

    var getDetails = function() {
        if (!session.get('keyword')) {
            session.set('keyword', 'none');
        }
        env.subscribe('pubresidenceSearch', session.get('keyword'), function(residenceSearchCollection) {
            session.bind('list', {
                data: residenceSearchCollection.find()
            });
        });
    };

    env.onload = function() {
        return [getDetails];
    };

    env.onrender = function(doRender) {
        doRender("residenceSearch", ['fade', 'z-index']);
    };

    var $root;

    env.onready = function() {
        if (!$root) {
            $root = $("#residenceSearch");
        }

        $root.on('click', '.residence', function() {
            env.redirect('/houseDetail', {
                'houseId': $(this).data("id"),
                'client': clientUId
            }, true);
        });

        session.eventMap('#cancel', {
            'click': function(e) {
                env.redirect("/");
            }
        });
        session.eventMap('#searchResidenceInput', {
            'keydown': function(e) {
                if (e.keyCode == 13) {
                    keyword = $('#searchResidenceInput').val();
                    if (keyword == ''){
                    }else{
                        session.set('keyword', keyword);
                        session.commit();
                        $('.loadingDiv').css('display','block');
                    }
                }
            }
        });
    };
});
