module.exports = function(fw){
    fw.publish('house','pubresidenceOnSell',function(args,callback){
        var collection = this;
   
        collection.extfind('pubresidenceOnSell',args,callback);
    });
}
