function runnable(){
    var config = {};
	var host = sumeru.config.get("dataServerHost");//host地址
	var appCode = 'app_test_code';

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
