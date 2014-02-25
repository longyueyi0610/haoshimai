sumeru.router.add({
    pattern: '/residenceSearch',
    action: 'App.residenceSearch'
});

App.residenceSearch = sumeru.controller.create(function(env, session, param) {
    var view = 'residenceSearch';
    var host = sumeru.config.get("dataServerHost");
    var keyword = ''; //输入内容
    var clientUId = param['clientUId'];
    var saleRent = param['saleRent'];

    var getDetails = function() {
        /*if (!session.get('keyword')) {
            session.set('keyword', 'none');
        }*/
        if (keyword != ''){
            args = [];
            args[0] = session.get('keyword');
            args[1] = session.get('type');
            env.subscribe('pubresidenceSearch', args, function(residenceSearchCollection) {
                session.bind('list', {
                    data: residenceSearchCollection.find(),
                    saleRent: saleRent
                });
            });
        }
    };

    env.onload = function() {
        return [getDetails];
    };

    env.onrender = function(doRender) {
        doRender("residenceSearch", ['none', 'z']);
    };

    var $root;

    env.onready = function() {
        if (!$root) {
            $root = $("#residenceSearch");
        }

        $root.on('click', '.residence-wrap', function() {
            if(saleRent == 'sale'){
                env.redirect('/houseList', {
                    'residenceId': $(this).attr('data-id'),
                    'clientUId': clientUId,
                    'saleRent': saleRent,
                    'residenceName': $(this).attr('data-name'),
                    'saleCount': $(this).attr('data-sale'),
                }, true);
            }else{
                env.redirect('/houseList', {
                    'residenceId': $(this).attr('data-id'),
                    'clientUId': clientUId,
                    'saleRent': saleRent,
                    'residenceName': $(this).attr('data-name'),
                    'rentCount': $(this).attr('data-rent')
                }, true);
            }
        });

        session.eventMap('#cancel', {
            'click': function(e) {
                env.redirect("/mapSell",true);
            }
        });
        session.eventMap('#searchResidenceInput', {
            'keydown': function(e) {
                if (e.keyCode == 13) {
                    keyword = $('#searchResidenceInput').val().trim();
                    if (keyword == ''){
                        //输入信息为空的时候什么都不做
                    }else{
                        session.set('keyword', keyword);
                        session.set('type', ((saleRent=='sale')?1:2));
                        session.commit();
                        getDetails();
                        $('.loadingDiv').css('display','block');
                    }
                }
            }
        });
    };
});
