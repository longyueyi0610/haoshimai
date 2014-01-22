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
            session.bind('unread-message', {
                messages:unreadMessageCollection.find(),
            }); 
        }); 
    };

    env.onload = function(){
        return [getDetails];
    }; 

    env.onrender = function(doRender){
        doRender("enquiryHistory", ['push','left']);
    }; 

    env.onready = function(){
    }; 

});
