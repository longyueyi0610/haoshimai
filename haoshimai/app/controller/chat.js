sumeru.router.add({
    pattern: '/chat',
    action: 'App.chat'
});

App.chat = sumeru.controller.create(function(env, session) {
    var view = 'chat';

    var getDetails = function() {
        session.chatMessages = env.subscribe('pubchatMessage', function(chatMessageCollection) {
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

        $("#chat .back").click(function() {
            history.back();
        });
    };
});