/* 
* 用来遍历指定对象所有的属性名称和值 
* obj 需要遍历的对象 
* author: Jet Mah 
*/ 

Library.utils = sumeru.Library.create(function(exports){
    exports.allProps = function(obj){
		var props = "" ;
		// 开始遍历 
		for ( var p in obj ){
		// 方法 
			if ( typeof ( obj [ p ]) == " function " ){
				obj [ p ]() ;
			} else {
		// p 为属性名称，obj[p]为对应属性的值 
		props += p + " = " + obj [ p ] + " \t " ;
		}
		}
		// 最后显示所有的属性 
		alert ( props ) ;
    };

	exports.getresidenceSimple = function(residenceContents, position){
		var length = residenceContents.length;
		var lng = position['lng'];
		var lat = position['lat'];
		var simple = new Array(5);

		for(var i=0;i<length;i++){
			var residence = JSON.parse(residenceContents[i]);
			var tempLng = residence['position']['lng'];
			var tempLat = residence['position']['lat'];
			var position = new AMap.LngLat(tempLng,tempLat);
			tempLng = position['lng'];
			tempLat = position['lat'];
			
			if(lng == tempLng){
				simple[0]=residence['residenceName']; 
				simple[1]=residence['priceRange'];
				simple[2]=residence['onSaleCount'];
				simple[3]=residence['picURLWithSize'][0];
				simple[4]=residence['residenceId'];
				break;
			}
		}

		return simple;


	};

});
