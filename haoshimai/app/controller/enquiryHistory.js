sumeru.router.add(
{   
    pattern: '/enquiryHistory',
    action: 'App.enquiryHistory'
}   
);

App.enquiryHistory = sumeru.controller.create(function(env, session, param){
    var view = 'enquiryHistory';
    var clientUId = param['clientUId'];

    var getDetails = function(){
        env.subscribe('pubunreadMessage',clientUId,function(unreadMessageCollection){
            alert(unreadMessageCollection.find());
            session.bind('unread-message', {
                messages:unreadMessageCollection.find(),
            }); 
        }); 
    };

    env.onload = function(){
        return [getDetails];
    }; 

    env.onrender = function(doRender){
        doRender("enquiryHistory", ['none','z']);
    }; 

    env.onready = function(){
        $("#enquiry-history .back").click(function() {
            history.back();
        });

        session.event('unread-message',function(){
            $('.messages .residence-wrap').click(function(){
                var houseId = this.getAttribute('data-houseid');
                var brokerId = this.getAttribute('data-brokerid');
                var brokerName = this.getAttribute('data-brokername');
                env.redirect('/chat', {
                    'houseId': houseId,
                    'clientUId': clientUId,
                    'brokerId' : brokerId,
                    'brokerName': brokerName
                },true);
            });
        });
    }; 
});
