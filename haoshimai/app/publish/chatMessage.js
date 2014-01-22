module.exports = function(fw){
    fw.publish('chatMessage','pubchatMessage',function(callback){
        var collection = this;

        collection.extfind('pubchatMessage',callback);
    }); 
}
