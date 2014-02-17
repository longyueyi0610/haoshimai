
module.exports = function(fw){
    fw.publish('houseRent','pubresidenceRent',function(args,callback){
        var collection = this;
   
        collection.extfind('pubresidenceRent',args,callback);
    });
}
