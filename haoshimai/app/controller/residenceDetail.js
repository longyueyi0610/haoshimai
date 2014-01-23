sumeru.router.add({
    pattern: '/residenceDetail',
    action: 'App.residenceDetail'
});

App.residenceDetail = sumeru.controller.create(function(env, session, param) {
    var view = 'residenceDetail';
    var residenceId = param['residenceId'];
    var clientUId = param['clientUId'];

    var getDetails = function() {
        var args = [];
        args[0] = residenceId;
        args[1] = clientUId;
        console.log(clientUId);

        session.residenceDetailCollection = env.subscribe('pubresidenceDetail', args, function(residenceDetailCollection) {
            var data = residenceDetailCollection.find()[0];
            data.picURLWithSize = _.map(data.picURLWithSize, function(item, index) {
                return {
                    url: item,
                    first: index == 0,
                    index: index
                };
            });
            session.bind('residence-onsell-detail', {
                data: data,
            });
        });
    };

    env.onload = function() {
        return [getDetails];
    };

    env.onrender = function(doRender) {
        doRender("residenceDetail", ['push', 'right']);
    };

    env.onready = function() {
        alert(session.residenceDetailCollection[0]['monthTrend']);
        session.event('residence-onsell-detail', function() {
            console.log(session.residenceDetailCollection[0]['monthTrend']);
            //Library.utils.createLineChart(session.residenceDetailCollection[0]['monthTrend']);
            /*$('.back').click(function(){
                history.back();
            });*/

            var $focuses = $("#residence-detail-images");
            if ($focuses.find(".item").length !== 0) {
                $focuses.carousel({
                    interval: false
                });

                touch.on($focuses[0], "drag", function(e) {
                    if (e.direction === 'left') {
                        $focuses.carousel("next");
                    } else if (e.direction === 'right') {
                        $focuses.carousel('prev');
                    }
                });
            }

            $("#residence-onsell-detail .back").click(function() {
                history.back();
            });
        });
    };
});
