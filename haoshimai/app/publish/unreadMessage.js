module.exports = function(fw){
    fw.publish('unreadMessage','pubunreadMessage',function(clientUId,callback){
        var collection = this;
   
        collection.extfind('pubunreadMessage',clientUId,callback);
    }); 
}
