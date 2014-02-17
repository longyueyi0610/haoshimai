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

    exports.changeElClass = function(obj){
        obj.css('display','none');
        return '';
    };

	exports.getresidenceSimple = function(residenceContents, position){
		var length = residenceContents.length;
		var lng = position['lng'];
		var lat = position['lat'];
		var simple = new Array(7);

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
                simple[5]=residence['rentRange'];
                simple[6]=residence['onRentCount'];
				break;
			}
		}

		return simple;
	};

    exports.createLineChart = function(monthTrend){//生成折线图
        var months = [];
        var prices = [];
        var length = monthTrend.length;
        for (var i= 0; i<length; i++){
            months[length-1-i] = monthTrend[i]['month'];
            prices[length-1-i] = monthTrend[i]['price1'];
        }
        Highcharts.setOptions({
            colors: ['#ff9110']
        });
        $('#line-chart').highcharts({
            chart: {
                renderTo: 'line-chart',
                defaultSeriesType: 'line',
                height: '150'
            }, 
            title: {
                text: ''
            }, 
            legend: {
                enabled: false
            },  
            credits: {
                enabled: false
            },  
            exporting: {
                enabled: false
            },  
            xAxis: {
                categories: months
            }, 
            yAxis: {
                title:{text: ''},
                min:'0',
                labels: {
                    formatter: function(){
                        return this.value + '元';
                    }
                }               
            }, 
            tooltip: {
                enabled: false
            },  
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },  
                    enableMouseTracking: false
                }   
            },  
            series: [{
                data: prices
            }]
        });
        return '';
    };
});
