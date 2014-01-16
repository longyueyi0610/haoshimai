sumeru.router.add({
pattern: '/itworks',
action: 'App.itworks'
});

//sumeru.router.setDefault('App.itworks');



App.itworks = sumeru.controller.create(function(env, session){

		env.onrender = function(doRender){
		console.log(session);
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
