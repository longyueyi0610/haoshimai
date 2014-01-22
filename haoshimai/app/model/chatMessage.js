Model.chatMessage = function(exports){
    exports.config = { 
        fields : [ 
            { name: 'name', type: 'string'},
            { name: 'type', type: 'number'},//1为普通用户2为经纪人
            { name: 'content', type: 'string'},
            { name: 'time', type: 'string'},
            { name: 'format', type: 'number'},
            { name: 'houseId', type: 'number'},
            { name: 'brokerId', type: 'number'},
            { name: 'brokerPicURL', type: 'string'},
            { name: 'messageId', type: 'number'},
            { name: 'useType', type: 'number'}
        ]   
    }   
}
