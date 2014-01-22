Model.unreadMessage = function(exports){
    exports.config = { 
        fields : [ 
            { name: 'residenceName', type: 'string'},
            { name: 'houseId', type: 'number'},
            { name: 'brokerId', type: 'number'},
            { name: 'realBrokerId', type: 'number'},
            { name: 'brokerName', type: 'string'},
            { name: 'brokerPicURl', type: 'string'},
            { name: 'title', type: 'string'},
            { name: 'count', type: 'number'},
            { name: 'lastContent', type: 'string'},
            { name: 'lastContentFormat', type: 'number'},
            { name: 'lastUpdateTime', type: 'string'}
        ]   
    }   
}
