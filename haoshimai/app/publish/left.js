module.exports = function(fw){

    fw.publish('left','leftCorner',function(callback){

        var collection = this;
        console.log("eeeeesssssssssssssssss");
        collection.extfind('leftCorner',callback);
    });

}
