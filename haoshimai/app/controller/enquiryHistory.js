sumeru.router.add(
{   
    pattern: '/enquiryHistory',
    action: 'App.enquiryHistory'
}   
);

App.enquiryHistory = sumeru.controller.create(function(env, session, param){
    var view = 'enquiryHistory';
    var clientUId = param['clientUId'];
    var host = sumeru.config.get("dataServerHost"); //host地址
    var appCode = 'app_test_code';

    var getDetails = function(){
        env.subscribe('pubunreadMessage',clientUId,function(unreadMessageCollection){
            var allMessages = unreadMessageCollection.find();
            var length = allMessages.length;
            var messageObjs = [];
            var i = 0;
            var temp = [];

            for (i=0; i<length; i++){
                var houseId = allMessages[i]['houseId'];
                var residenceName = allMessages[i]['residenceName'];
                var lastContent = allMessages[i]['lastContent'];
                var lastContentFormat = allMessages[i]['lastContentFormat'];
                var lastUpdateTime = allMessages[i]['lastUpdateTime'];
                var brokerId = allMessages[i]['brokerId'];
                var brokerName = allMessages[i]['brokerName'];
                var count = allMessages[i]['count'];
                var obj = new Object();
                obj.residenceName = residenceName;
                obj.content = lastContent;
                obj.contentFormat = lastContentFormat;
                obj.lastUpdateTime = lastUpdateTime;
                obj.brokerId = brokerId;
                obj.brokerName = brokerName;
                obj.count = count;
                obj.houseId = houseId;
                temp.push(obj);
            }
            for (var j=0;j<length;j++){
                var url = host + '/server/house/detailNew.controller?appCode=' + appCode + '&houseId=' + temp[j]['houseId'] + '&clientUId=' + clientUId;
                var getCallback = function(data) {
                    var oriData = JSON.parse(data);
                    var housePic = oriData['data']['picURL'][0];
                    var price = oriData['data']['price'];
                    temp[messageObjs.length].housePic = housePic;
                    temp[messageObjs.length].price = price;
                    messageObjs.push(temp[messageObjs.length]); 
                    if (messageObjs.length == length){
                        session.bind('unread-message', {
                            messages:messageObjs,
                        });
                    }
                };
                sumeru.external.get(url, getCallback);
            }
        });
    };

    env.onload = function(){
        setTimeout('', 1000);
        return [getDetails];
    }; 

    env.onrender = function(doRender){
        var rend = function(){
            doRender("enquiryHistory", ['none','z']);
        }
        setTimeout(rend, 1000);
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

            var url = host + '/server/house/chatSummary.controller?appCode=' + appCode + '&clientUId=' + clientUId +'&totalOnly=0&showAll=0';
            var getCallback = function(oriData){
                var data = JSON.parse(oriData)['data'];
                var length = data.length;
                for (var i=0;i<length;i++){
                    var houseId = data[i]['houseId'];
                    var number = data[i]['count'];
                    var str = 'div[data-id=' + houseId + ']';
                    $(str).html(number);
                    $(str).css('display','block');
                }
            }
            sumeru.external.get(url, getCallback);

            setInterval(function(){
                var url = host + '/server/house/chatSummary.controller?appCode=' + appCode + '&clientUId=' + clientUId +'&totalOnly=0&showAll=0';
                var getCallback = function(oriData){
                    var data = JSON.parse(oriData)['data'];
                    var length = data.length;
                    for (var i=0;i<length;i++){
                        var houseId = data[i]['houseId'];
                        var number = data[i]['count'];
                        var str = 'div[data-id=' + houseId + ']';
                        $(str).html(number);
                        $(str).css('display','block');
                    }
                }
                sumeru.external.get(url, getCallback);
            },5000);
        });
    }; 
});
