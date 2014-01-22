function runnable(){
    var config = {};
	var host = sumeru.config.get("dataServerHost");//host地址
	var appCode = 'app_test_code';

    config['pubunreadMessage'] = {
        fetchUrl : function(clientUId){
            return host + '/server/house/chatSummary.controller?appCode=' + appCode + '&clientUId=' + clientUId + '&totalOnly=0';
        },
        resolve : function(originData){
            var j = JSON.parse(originData);
            var resolved = j['data'];

            //造一些假数据
            resolved = {"version":null,"data":[{residenceName:'1',houseId:'sss',title:'nihao',type:'1',count:'3',lastContentFormat:'0',lastUpdateTime:'2012-01-01 19:22:45'},{ridenceName:'1',houseId:'sss',title:'nihao',type:'1',count:'3',lastContentFormat:'0',lastUpdateTime:'2012-01-01 19:22:45'}],"count":0,"code":100,"totalCount":0,"msg":"","secret":null,"unReadMsgCount":0,"exceptionDetail":null,"extData":null}['data'];

            return resolved;
        },
        buffer : false
    }

    config['pubunreadCounts'] = {
        fetchUrl :function(clientUId){
            return host + '/server/house/chatSummary.controller?appCode=' + appCode + '&clientUId=' + clientUId + '&totalOnly=1';
        },
        resolve: function(originData){
            var j = JSON.parse(originData);
            var resolved = j['data'];

            return resolved;
        },
        fetchInterval : 60 * 1000,
        buffer : false
    }

	config['pubhouseDetail'] = {
		fetchUrl : function(houseId){
			return host + '/server/house/detailNew.controller?appCode=app_test_code&houseId=' + houseId + '&clientUId=74E1B63AF061';
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
			var url =  host + '/server/house/searchKeyword.controller?appCode=app_test_code&cityId=1&keyword=' + keyword + '&type=1';
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
		fetchUrl : function(residenceId){
			return host + '/server/residence/detailNew.controller?appCode=app_test_code&residenceId='+ residenceId +'&clientUId=74E1B63AF061';
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
			return host + '/server/residenceSale/houseListNew.controller?appCode=app_test_code&residenceId=' + args[0] + '&orderType=' + args[1] + '&pageIndex=' + args[2] + '&pageSize=' + args[3] + '&clientUId=' + args[4];
		},
		resolve : function(originData){
            var j =JSON.parse(originData);
            var resolved = j['data'];

            return resolved;
        },
        buffer:false
    }

    return {
        type : 'external',
        config : config
    }
}

module.exports = runnable;
