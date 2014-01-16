function runnable(){
    var config = {};
	var host = sumeru.config.get("dataServerHost");

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

    config['pubnews'] = {

        fetchUrl : function(){
	    return 'http://api.housemart.cn:8080/server/locationAllList.controller?cityId=1'
        },
        resolve : function(originData){
            var j = JSON.parse(originData);
	    //j = j["data"];
	    //var topnews = j[0];
	    //topnews = topnews['id'];
	    var topnews = j;
	    console.log("publish pubnews");
            var resolved = {
		    topnews:topnews
	    }

            return resolved;
        },

        //如果需要转码，buffer设为true， 默认为false
        buffer : false
    }

    config['leftCorner'] = {

        fetchUrl : function(){
            return 'http://api.housemart.cn:8080/server/plate/nearBy.controller?appCode=app_test_code&lat=31.238877&lng=121.500580'
        },
        resolve : function(originData){
            var j = JSON.parse(originData);
            //j = j["data"];
            //var topnews = j[0];
            //topnews = topnews['id'];
            var topnews = j;
            console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
            console.log(topnews);
            var resolved = {
                    topnews:topnews
            }

            return resolved;
        },

        //如果需要转码，buffer设为true， 默认为false
        buffer : false
    }

    return {
        type : 'external',
        config : config
    }
}

module.exports = runnable;
