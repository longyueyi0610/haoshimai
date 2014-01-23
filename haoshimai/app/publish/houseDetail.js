module.exports = function(fw){
    fw.publish('houseDetail','pubhouseDetail',function(args,callback){
        var collection = this;

        collection.extfind('pubhouseDetail',args,callback);
    });
}
