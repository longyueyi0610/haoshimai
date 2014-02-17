sumeru.router.add({
pattern: '/picShow',
action: 'App.picShow'
});

App.picShow = sumeru.controller.create(function(env, session, param){
		var view = 'picShow';
        
        var getPic = function(){
            var picStr = sessionStorage.getItem('picStr');
            var picObj = JSON.parse(picStr);
            var activeUrl = sessionStorage.getItem('activeUrl');
            var array =[];

            for (var i=0; i<picObj.length; i++){
                array[i]={
                    index: i,
                    url:picObj[i],
                    isActive: (picObj[i]==activeUrl)?true:false
                }
            }
            session.bind('pic-container',{
                picUrl: array
            });
        };

        env.onload = function(){
            return [getPic];
        };

        env.onrender = function(doRender){
            doRender(view, ['none','z']);
        };

        env.onready = function(){
            session.event('pic-container', function(){
                var $focuses = $("#pic_show_container");
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
            });
        };
});
