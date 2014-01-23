module.exports = function(fw){
	fw.publish('residenceDetail','pubresidenceDetail',function(args,callback){
		var collection = this;

		collection.extfind('pubresidenceDetail',args,callback);
	});
}
