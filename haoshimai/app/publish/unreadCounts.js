module.exports = function(fw){
    fw.publish('unreadCounts','pubunreadCounts',function(clientUId,callback){
        var collection = this;
   
        collection.extfind('pubunreadCounts',clientUId,callback);
    });
}
