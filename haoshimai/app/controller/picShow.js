sumeru.router.add({
pattern: '/picShow',
action: 'App.picShow'
});

App.picShow = sumeru.controller.create(function(env, session, param){
		var view = 'picShow';
        var picObj;
        
        var getPic = function(){
            var picStr = sessionStorage.getItem('picStr');
            picObj = JSON.parse(picStr);
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

            /*var imgCenter = function(){
                var windowHeight = $(window).height();
                $('#picShow img').each(function(){
                    if($(this).height()!==0){
                        var picHeight = $(this).height();
                        if(windowHeight > picHeight){
                            $(this).css('margin-top',(windowHeight-picHeight)/2);
                        }
                    }
                });
            }*/

            var imgCenter = function(){
                var windowHeight = $(window).height();
                var i=0;
                var windowWidth = $(window).width();
                $('#picShow img').each(function(){
                    var image = new Image();
                    image.src = picObj[i++];
                    var height;
                    if (image.width>windowWidth){
                        height = image.height / (image.width/windowWidth);
                    }else{
                        height = image.height * (windowWidth/image.width);
                    }
                    if (windowHeight > height){
                        $(this).css('margin-top',(windowHeight-height)/2);
                    }
                });
            }

            session.event('pic-container', function(){
                var $focuses = $("#pic_show_container");
                imgCenter();

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
