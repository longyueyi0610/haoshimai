sumeru.router.add({
	pattern: '/residentSearch',
	action: 'App.residentSearch'
});

App.residentSearch = sumeru.controller.create(function(env, session){

        env.onrender = function(doRender){
       		doRender("residentSearch", ['fade','z-index']);
        };

        env.onready = function(){
            session.eventMap('#cancel',{
                'click':function(e){
                    env.redirect("/mapShell");
                }

            });
            session.eventMap('#searchResidentInput',{
                'keydown' : function(e){
                    if(e.keyCode == 13){
                         alert("对不起，还没做");
                    }
                }
            });

        }
});
