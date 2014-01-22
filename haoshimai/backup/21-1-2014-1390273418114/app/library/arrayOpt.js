Library.arrayOpt = sumeru.Library.create(function(exports){    
	exports.addElement = function(contentArray,content){
		var length = contentArray.length;
		var flag = false;//判断是否有相同的元素

		var contentObj = JSON.parse(content);
		var residenceId = contentObj['residenceId'];

		for(var i=0; i<length; i++){
			var tempObj = JSON.parse(contentArray[i]);
			var tempId = tempObj['residenceId'];
			if(residenceId == tempId){
				flag = true;
				break;
			}else{
				//alert(position);
			}
		}
		if(flag==false){
			contentArray.push(content);
			return true;//说明加进去了
		}else{
			return false;
		}
	};

});
