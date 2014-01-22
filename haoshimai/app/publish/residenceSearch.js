module.exports = function(fw){
    fw.publish('residence','pubresidenceSearch',function(keyword,callback){
        var collection = this;

        collection.extfind('pubresidenceSearch',keyword,callback);
    });
}
