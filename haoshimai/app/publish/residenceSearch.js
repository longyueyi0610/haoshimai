module.exports = function(fw){
    fw.publish('residence','pubresidenceSearch',function(args,callback){
        var collection = this;

        collection.extfind('pubresidenceSearch',args,callback);
    });
}
