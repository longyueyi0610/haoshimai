module.exports = function(fw){

    fw.publish('news','pubnews',function(callback){

        var collection = this;
	console.log("im hea");
        collection.extfind('pubnews',callback);
    });

}

