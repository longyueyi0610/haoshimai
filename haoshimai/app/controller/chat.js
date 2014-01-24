sumeru.router.add({
    pattern: '/chat',
    action: 'App.chat'
});

App.chat = sumeru.controller.create(function(env, session, param) {
    var host = sumeru.config.get("dataServerHost"); //host地址
    
    var view = 'chat';
    var houseId = param['houseId'];
    var brokerId = param['brokerId'];
    var clientUId = param['clientUId'];
    var brokerName = param['brokerName'];//经理名称

    var getDetails = function() {
        var args = [];
        args[0] = houseId;
        args[1] = brokerId;
        args[2] = clientUId = clientUId;
        session.chatMessages = env.subscribe('pubchatMessage', args,function(chatMessageCollection) {
            session.bind('message-list', {
                messages: chatMessageCollection.find(),
            });
        });
    };

    env.onload = function() {
        return [getDetails];
    };

    env.onrender = function(doRender) {
        doRender(view, ['fade', 'z-index']);
    };

    env.onready = function() {
        $('#chat .header').append(brokerName);

        $('#send-message-button').click(function() {
            var messageContent = $('#chat-input').val().trim();
            if (messageContent == '') {
                //输入消息为空什么都不做。
            } else {
                //这种方法不好使，先注掉
                /*session.chatMessages.add({
                    content: messageContent
                });
                session.chatMessages.save();*/
                //后期需要完善并修改
                var url = host + '/server/house/chat/send.controller?appCode=app_test_code&clientUId=' + clientUId + '&houseId=' + houseId + '&brokerId=' + brokerId + '&content=' + messageContent + '&type=1';
                var getCallback = function(data){
                    //做点什么吧
                }
                sumeru.external.get(url,getCallback);
                $('#chat-input').val('');
            }
        });

        session.eventMap('#chat-input', {
            'keydown': function(e) {
                if (e.keyCode == 13) {
                    var messageContent = $('#chat-input').val().trim();
                    if (messageContent == ''){
                        //输入信息为空的时候什么都不做
                    }else{
                        var url = host + '/server/house/chat/send.controller?appCode=app_test_code&clientUId=' + clientUId + '&house    Id=' + houseId + '&brokerId=' + brokerId + '&content=' + messageContent + '&type=1';
                        var getCallback = function(data){
                             //做点什么吧
                        }
                        sumeru.external.get(url,getCallback);
                        $('#chat-input').val('');
                    }   
                }   
            }   
        });

        $("#chat .back").click(function() {
            history.back();
        });
    };
});
