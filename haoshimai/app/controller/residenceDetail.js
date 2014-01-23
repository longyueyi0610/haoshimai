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

    env.onready = function() {
        $(function() {
            $('#container').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Fruit Consumption'
                },
                xAxis: {
                    categories: ['Apples', 'Bananas', 'Oranges']
                },
                yAxis: {
                    title: {
                        text: 'Fruit eaten'
                    }
                },
                series: [{
                    name: 'Jane',
                    data: [1, 0, 4]
                }, {
                    name: 'John',
                    data: [5, 7, 3]
                }]
            });
        });
    };
});