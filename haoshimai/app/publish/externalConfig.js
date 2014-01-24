function runnable() {
    var config = {};
    var host = sumeru.config.get("dataServerHost"); //host地址
    var appCode = 'app_test_code';
    var chatClientUId = '';
    var chatHouseId = '';
    var chatBrokerId = '';
    var clientUId;

    config['pubchatMessage'] = {
        fetchUrl: function(args) {//args[0]houseId, args[1]brokerId, args[2]clientUId
            /*chatClientUId = args[2];
            console.log(args[2]);
            chatHouseId = args[1];
            chatBrokerId = args[0];*/
            return 'http://api.housemart.cn:8080/server/house/chat/list.controller?appCode=' + appCode + '&clientUId=' +args[2]+ '&houseId=' + args[0] + '&brokerId=' + args[1] +'&type=1&messageId=-1&page=0';
        },
        resolve: function(originData) {
            var j = JSON.parse(originData);
            var resolved = j['data'];

            return resolved;
        },

        fetchInterval: 10 * 1000,
        buffer: false

        //postData
        /*postUrl: function() {
            var options = {
                host: host,
                path: '/server/house/chat/send.controller'
            }
            return options;
        },
        prepare: function(type, data) {
            var prepareData = {};
            if (type === 'insert') {
                prepareData.content = data.content;
                prepareData.appCode = appCode;
                prepareData.clientUId = chatClientUId;
                prepareData.houseId = chatHouseId;
                prepareData.brokerId = chatBrokerId;
                prepareData.type = 1;
            }
            return prepareData;
        }*/
    }



    config['pubunreadMessage'] = {
        fetchUrl: function(clientUId) {
            return host + '/server/house/chatSummary.controller?appCode=' + appCode + '&clientUId=' + clientUId + '&totalOnly=0&groupBy=0';
        },
        resolve: function(originData) {
            var j = JSON.parse(originData);
            var resolved = j;//需要其他信息，不只是data

            //造一些假数据
            //resolved = [];
            resolvedFalse = {
                "version": null,
                "data": [{
                    residenceName: '世茂滨江',
                    houseId: 556353,
                    title: 'nihao',
                    type: '1',
                    count: '3',
                    lastContentFormat: '0',
                    lastUpdateTime: '2012-01-01 19:22:45'
                }],
                "count": 0,
                "code": 100,
                "totalCount": 0,
                "msg": "",
                "secret": null,
                "unReadMsgCount": 0,
                "exceptionDetail": null,
                "extData": null
            }['data'];
            return resolvedFalse;
        },
        buffer: false
    }

    config['pubunreadCounts'] = {
        fetchUrl: function(clientUId) {
            clientUId = clientUId;
            return host + '/server/house/chatSummary.controller?appCode=' + appCode + '&clientUId=' + clientUId + '&totalOnly=1';
        },
        resolve: function(originData) {
            var j = JSON.parse(originData);
            var resolved = j['data'];

            return resolved;
        },
        fetchInterval: 60 * 1000,
        buffer: false
    }

	config['pubhouseDetail'] = {
		fetchUrl : function(args){
			return host + '/server/house/detailNew.controller?appCode=' + appCode + '&houseId=' + args[0] + '&clientUId=' + args[1];
		},
		resolve: function(originData){
			var j = JSON.parse(originData);
			var resolved = j['data'];
			
			return resolved;
		},
		buffer : false
	}

	config['pubresidenceSearch'] = {
		fetchUrl: function(keyword){
			var url =  host + '/server/house/searchKeyword.controller?appCode=' + appCode + '&cityId=1&keyword=' + keyword + '&type=1';
			return encodeURI(url);
		},
		resolve : function(originData){
			var j =JSON.parse(originData);
			var resolved = j['data'];

			return resolved;
		},
		buffer :false
	}

	config['pubresidenceDetail'] = {
		fetchUrl : function(args){
			return host + '/server/residence/detailNew.controller?appCode=' + appCode + '&residenceId='+ args[0] +'&clientUId=' + args[1];
		},
		resolve : function(originData){
			var j =JSON.parse(originData);
			var resolved = j['data'];
			
			return resolved;
		},
		buffer:false
	}

	config['pubresidenceOnSell'] = {
		fetchUrl : function(args){
			return host + '/server/residenceSale/houseListNew.controller?appCode=' + appCode + '&residenceId=' + args[0] + '&orderType=' + args[1] + '&pageIndex=' + args[2] + '&pageSize=' + args[3] + '&clientUId=' + args[4];
		},
		resolve : function(originData){
            var j =JSON.parse(originData);
            var resolved = j['data'];

            return resolved;
        },
        buffer: false
    }

    return {
        type: 'external',
        config: config
    }
}

module.exports = runnable;
