//出售房，已售房
Model.house = function(exports){
    exports.config = {
        fields : [
            { name: 'address', type: 'string'},
			{ name: 'id', type: 'number'},
			{ name: 'type', type: 'string'},
			{ name: 'lat', type: 'string'},
			{ name: 'lng', type: 'string'},
			{ name: 'distance', type: 'number'},
			{ name: 'picURL', type: 'string'},
			{ name: 'saleStatus', type: 'number'},
			{ name: 'buildingNo', type: 'number'},
			{ name: 'cellNo', type: 'string'},
			{ name: 'residenceName', type: 'string'},
			{ name: 'price', type: 'string'},
			{ name: 'roomType', type: 'string'},
			{ name: 'area', type: 'string'},
			{ name: 'avg', type: 'string'},
			{ name: 'decorating', type: 'string'},
			{ name: 'direction', type: 'string'},
			{ name: 'onboardTime', type: 'datetime'},
			{ name: 'residencePicURL', type: 'array'},
			{ name: 'soldAddress', type: 'string'},
			{ name: 'floorLevel', type: 'string'},
			{ name: 'plateName', type: 'string'},
			{ name: 'onboardTimeString', type: 'string'},
			{ name: 'dealTimeString', type: 'string'},
			{ name: 'saleRec', type: 'string'},
			{ name: 'picURLWithSize', type: 'string'},
			{ name: 'residencePicURLWithSize', type: 'array'},
			{ name: 'residencePicURLWithOriginSize', type: 'array'},
			{ name: 'followTIme', type: 'number'},
        ]
    }
}
