Model.residenceDetail = function(exports){
    exports.config = {
        fields : [
			{name:'address',type:'string'},
			{name:'id',type:'number'},
			{name:'type',type:'string'},
			{name:'picURL',type:'array'},
			{name:'rentPrice',type:'string'},
			{name:'residenceName',type:'string'},
			{name:'price',type:'string'},
			{name:'cityId',type:'number'},
			{name:'plateId',type:'number'},
			{name:'isFollow',type:'string'},//有疑问可否当做string类型
			{name:'picURLWithSize',type:'array'},
			{name:'picURLWithOriginSize',type:'array'},
			{name:'monthTrend',type:'array'},
			{name:'onSaleCount',type:'number'},
			{name:'lastMonthDealCount',type:'number'},
			{name:'lastSeasonDealCount',type:'number'},
			{name:'onRentCount',type:'number'},
			{name:'lastSeasonRentCount',type:'number'},
			{name:'houseHold',type:'string'},
			{name:'greenRate',type:'number'},
			{name:'parking',type:'number'},
			{name:'propertyFee',type:'number'},
			{name:'developer',type:'string'},
			{name:'finishedTime',type:'number'},
			{name:'rentRevenue',type:'string'},
			{name:'annualTurnoverRate',type:'string'},
			{name:'forceShow',type:'number'},
			{name:'zombie',type:'number'},
			{name:'priceRange',type:'string'},
			{name:'trend',type:'number'},
			{name:'rentRange',type:'string'},
			{name:'annualPriceIncreasement',type:'string'},
			{name:'volumnRate',type:'number'}

            ]
    };
};
