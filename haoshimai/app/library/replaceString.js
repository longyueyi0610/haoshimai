Library.replaceString = sumeru.Library.create(function(exports)){
    exports.replace = function(str){
        var args = [].slice.call(arguments, 1),
        i = 0;

        return str.replace(/%s/g, function() {
            return args[i++];
        });
    }
});
