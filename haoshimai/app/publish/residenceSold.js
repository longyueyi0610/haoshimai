
module.exports = function(fw){
    fw.publish('house','pubresidenceSold',function(args,callback){
        var collection = this;
   
        collection.extfind('pubresidenceSold',args,callback);
    });
}
