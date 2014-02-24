function runnable() {
    var config = {};
    var host = sumeru.config.get("dataServerHost"); //host地址
    var appCode = 'app_test_code';
    var chatClientUId = '';
    var chatHouseId = '';
    var chatBrokerId = '';
    var clientUId;

    /*config['pubchatMessage'] = {
        uniqueColumn : "time",
        fetchUrl: function(args) {//args[0]houseId, args[1]brokerId, args[2]clientUId, args[3]type
            console.log(host + '/server/house/chat/list.controller?appCode=' + appCode + '&clientUId=' +args[2]+ '&houseId=' + args[0] + '&brokerId=' + args[1] +'&type=' + args[3] + '&messageId=-1&page=0');
            return host + '/server/house/chat/list.controller?appCode=' + appCode + '&clientUId=' +args[2]+ '&houseId=' + args[0] + '&brokerId=' + args[1] +'&type=' + args[3] + '&messageId=-1&page=0';
        },
        resolve: function(originData) {
            console.log(originData);
            var j = JSON.parse(originData);
            var resolved = j['data'];

            return resolved;
        },

        buffer: false

    }*/

    config['pubunreadMessage'] = {
        uniqueColumn : 'lastUpdateTime',

        fetchUrl: function(clientUId) {
            return host + '/server/house/chatSummary.controller?appCode=' + appCode + '&clientUId=' + clientUId + '&totalOnly=0&showAll=1';
        },
        resolve: function(originData) {
            var j = JSON.parse(originData);
            var resolved = j['data'];//需要其他信息，不只是data

            return resolved;
        },

        buffer: false

    }

    /*config['pubunreadCounts'] = {
        uniqueColumn : "count",
        fetchUrl: function(clientUId) {
            clientUId = clientUId;
            return host + '/server/house/chatSummary.controller?appCode=' + appCode + '&clientUId=' + clientUId + '&totalOnly=1';
        },
        resolve: function(originData) {
            var j = JSON.parse(originData);
            var resolved = j['data'];

            return resolved;
        },
        buffer: false
    }*/

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
		fetchUrl: function(args){
			var url =  host + '/server/house/searchKeyword.controller?appCode=' + appCode + '&cityId=1&keyword=' + args[0] + '&type=' + args[1];
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

    config['pubresidenceRent'] = {
		fetchUrl : function(args){
			return host + '/server/residenceRent/houseListNew.controller?appCode=' + appCode + '&residenceId=' + args[0] + '&orderType=' + args[1] + '&pageIndex=' + args[2] + '&pageSize=' + args[3] + '&clientUId=' + args[4];
		},
		resolve : function(originData){
            var j =JSON.parse(originData);
            var resolved = j['data'];

            return resolved;
        },
        buffer: false
    }
        
    config['pubhouseInfo'] = {//args[5]表示方式sale，rent，sold
        fetchUrl : function(args){
            if (args[5] == 'Sold'){
                return 'http://test.housemart.cn:8080/server/residenceSold/houseListNew.controller?appCode=' + appCode + '&residenceId=' + args[0] + '&orderType=' + args[1] + '&pageIndex=' + args[2] + '&pageSize=' + args[3] + '&clientUId=' + args[4];
            }else{ 
                return host + '/server/residence'+ args[5] + '/houseListNew.controller?appCode=' + appCode + '&residenceId=' + args[0] + '&orderType=' + args[1] + '&pageIndex=' + args[2] + '&pageSize=' + args[3] + '&clientUId=' + args[4];
            }       
         },
        resolve : function(originData){
            var j =JSON.parse(originData);
            var resolved = j;

            return resolved;
        },      
        buffer: false
    }

    config['pubresidenceSold'] = {
		fetchUrl : function(args){
			return 'http://test.housemart.cn:8080/server/residenceSold/houseListNew.controller?appCode=' + appCode + '&residenceId=' + args[0] + '&orderType=' + args[1] + '&pageIndex=' + args[2] + '&pageSize=' + args[3] + '&clientUId=' + args[4];
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
