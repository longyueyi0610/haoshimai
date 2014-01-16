Model.residenceMap = function(exports){
    exports.config = {
        fields: [
            {name : 'position', type: 'object'},
            {name : 'residence', type:'model',	model: 'Model.residence'}
        ]
    };
 };
