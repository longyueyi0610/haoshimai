Model.houseDetail = function(exports){
    exports.config = {
        fields : [
            { name: 'address', type: 'string'},
            { name: 'id', type: 'number'},
            { name: 'type', type: 'string'},
            { name: 'lat', type: 'string'},
            { name: 'lng', type: 'string'},
            { name: 'distance', type: 'number'},
            { name: 'picURL', type: 'array'},
            { name: 'interaction', type: 'number'},
			{ name: 'residenceId', type: 'number'},
            { name: 'buildingNo', type: 'number'},
            { name: 'cellNo', type: 'string'},
			{ name: 'rentPrice', type: 'number'},
            { name: 'residenceName', type: 'string'},
            { name: 'price', type: 'string'},
            { name: 'roomType', type: 'string'},
            { name: 'area', type: 'string'},
			{ name: 'brokerName', type: 'string'},
			{ name: 'title', type: 'string'},
			{ name: 'rentTitle', type: 'string'},
			{ name: 'cityId', type: 'number'},
			{ name: 'regionId', type: 'number'},
			{ name: 'plateId', type: 'number'},
            { name: 'avg', type: 'string'},
			{ name: 'equipment', type: 'string'},
            { name: 'decorating', type: 'string'},
            { name: 'direction', type: 'string'},
			{ name: 'floor', type: 'number'},
			{ name: 'buildDate', type: 'datetime'},
			{ name: 'isEmergent', type: 'string'},
			{ name: 'isRecommend', type: 'string'},
			{ name: 'viewHouseType', type: 'string'},
			{ name: 'memo', type: 'string'},
			{ name: 'brokerMobile', type: 'string'},
			{ name: 'brokerId', type: 'number'},
			{ name: 'isFollow', type: 'string'},
			{ name: 'combinedRent', type: 'string'},
			{ name: 'dealTime', type: 'datetime'},
			{ name: 'dealTimeRent', type: 'datetime'},
            { name: 'onboardTime', type: 'datetime'},
            { name: 'residencePicURL', type: 'array'},
            { name: 'soldAddress', type: 'string'},
            { name: 'floorLevel', type: 'string'},
			{ name: 'rentMemo', type: 'string'},
            { name: 'plateName', type: 'string'},
            { name: 'onboardTimeString', type: 'string'},
            { name: 'dealTimeString', type: 'string'},
			{ name: 'dealTimeRentString', type: 'string'},
			{ name: 'buildDateString', type: 'string'},
            { name: 'saleRec', type: 'string'},
            { name: 'picURLWithSize', type: 'string'},
            { name: 'residencePicURLWithSize', type: 'array'},
			{ name: 'picURLWithOriginSize', type: 'array'},
            { name: 'residencePicURLWithOriginSize', type: 'array'},
        ]
    }
}
