sumeru.router.add({
pattern: '/test',
action: 'App.test'
});

//sumeru.router.setDefault('App.itworks');



App.test = sumeru.controller.create(function(env, session){

        env.onrender = function(doRender){
            doRender("itworks", ['fade','z-index']);
        };
        console.log("1111111111111111");
                env.onready = function(){
            session.eventMap('#cancel',{
                'click':function(e){
                    env.redirect("/news");
                }

            });
            session.eventMap('#searchResident',{
                             'keydown' : function(e){
                             if(e.keyCode == 13){
                                 alert("s");
                             }
                             }
            });

        }
});
