sumeru.router.add({
pattern: '/chat',
action: 'App.chat'
});

App.chat = sumeru.controller.create(function(env, session){
		var view = 'chat';

        env.onrender = function(doRender){
            doRender(view, ['fade','z-index']);
        };

		env.onready = function(){
			$('#send-message-button').click(function(){
				var chatContent = $('#chat-input').val();
				if (chatContent == '' || chatContent == null){
					alert("请输入内容");
				}else{
					var options = {
						host : "http://api.housemart.cn:8080",
						path : "/server/house/chat/send.controller"
					};

					var postData = 'appCode=app_test_code&clientUId=18dbl5007_cArM7tLWWF5M&houseId=555161&brokerId=10&content=test&type=1';

					var postCallback = function(data){
					alert(typeof(data));
    				console.log(data);
					};

					sumeru.external.post(options, postData, postCallback, function(err) {
						console.error(err);
					});
					}
			});
		}

});
