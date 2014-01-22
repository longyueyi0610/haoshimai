module.exports = function(fw){
    fw.publish('houseDetail','pubhouseDetail',function(houseId,callback){
        var collection = this;

        collection.extfind('pubhouseDetail',houseId,callback);
    });
}
