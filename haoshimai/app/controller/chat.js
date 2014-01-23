sumeru.router.add({
    pattern: '/chat',
    action: 'App.chat'
});

App.chat = sumeru.controller.create(function(env, session, param) {
    var view = 'chat';
    var houseId = param['houseId'];
    var brokerId = param['brokerId'];
    var clientUId = param['clientUId'];

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
        $('#send-message-button').click(function() {
            var messageContent = $('#chat-input').val().trim();
            if (messageContent == '') {
                alert("输入消息不能为空！");
            } else {
                session.chatMessages.add({
                    content: messageContent
                });
                session.chatMessages.save();

            }
        });
    };
});
