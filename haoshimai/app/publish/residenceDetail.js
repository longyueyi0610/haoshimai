module.exports = function(fw){
	fw.publish('residenceDetail','pubresidenceDetail',function(residenceId,callback){
		var collection = this;

		collection.extfind('pubresidenceDetail',residenceId,callback);
	});
}
