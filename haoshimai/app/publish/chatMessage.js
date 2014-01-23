module.exports = function(fw){
    fw.publish('chatMessage','pubchatMessage',function(args,callback){
        var collection = this;

        collection.extfind('pubchatMessage',args,callback);
    }); 
}
