sumeru.router.add({
	pattern: '/residenceOnSell',
	action: 'App.residenceOnSell'
});


App.residenceOnSell = sumeru.controller.create(function(env, session, param){
	var view = 'residenceOnSell';	
	var host = sumeru.config.get("dataServerHost");

	env.onrender = function(doRender){
        doRender("residenceOnSell", ['push','right']);
    };

    env.onready = function(){
		var residenceId = param['residenceId'];//小区id
		var residenceName = param['residenceName'];//小区名称 
		var onSaleCount = param['onSaleCount'];//在售房屋数

		var str = residenceName + '(' + onSaleCount + ')'; 

		$('#onsell-total').html(str);
		
		var url = host + '/server/residenceSale/houseListNew.controller?appCode=app_test_code&residenceId=' + residenceId + '&orderType=1&pageIndex=1&pageSize=35&clientUId=74E1B63AF061';
        var getCallback = function(data){
            var oriData = JSON.parse(data);
        };
        sumeru.external.get(url, getCallback);

		$('.back').click(function(){
			history.back();
		});

		$('#house-detail-icon').click(function(){
			env.redirect('/residenceOnSellDetail',{'residenceId':residenceId});
		});

	/*var $residence-pic = $("#residence-pic");
	var $nav = $(".nav", $residence-pic);
	var nav = "";
	$residence-pic.find(".content li").each(function() {
		nav += '<li></li>';
	});
	$nav.html(nav).find("li").first().addClass("active");
	$nav.on("click", "li", function() {
		$residence-pic.residence-pic($(this).index());
	});
	$residence-pic.residence-pic({
		onafterchange: function(index) {
			$nav.find("li").eq(index).addClass("active").siblings().removeClass("active");
		}
	});*/
		
    };

});
