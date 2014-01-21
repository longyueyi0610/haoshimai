sumeru.router.add({
	pattern: '/residenceOnSell',
	action: 'App.residenceOnSell'
});


App.residenceOnSell = sumeru.controller.create(function(env, session, param){
	var view = 'residenceOnSell';	
	var residenceId = param['residenceId'];//小区id
	var orderType = 1;//默认1
	var pageSize = 35;
	var pageIndex = 1;
	var clientUId = param['clientUId'];

	var getDetails = function(){
        env.subscribe('pubresidenceDetail',residenceId,function(residenceDetailCollection){
            session.bind('residence-name', {
                data:residenceDetailCollection.find()[0],
            });
        });

		session.set('orderType',orderType);

		var args = new Array();
		args[0] = residenceId;
		args[1] = session.get('orderType');
		args[2] = pageIndex;
		args[3] = pageSize;
		args[4] = clientUId;

		session.houseListCollection = env.subscribe('pubresidenceOnSell',args,function(houseListCollection){
            session.bind('houselist-container', {
                houseList:houseListCollection.find()
            });
        });
    };

    env.onload = function(){
        return [getDetails];
    };	

	env.onrender = function(doRender){
        doRender("residenceOnSell", ['push','right']);
    };

    env.onready = function(){
		
		$('.back').click(function(){
			history.back();
		});

		$('#house-detail-icon').click(function(){
			env.redirect('/residenceDetail',{'residenceId':residenceId},true);
		});

		session.event('houselist-container',function(){
			$('#sort').click(function(){
          		$('#allsorts').slideToggle('slow');
        	});

        	$('#sort-cancel').click(function(){
            	$('#allsorts').slideToggle('slow');
        	});

        	$('#sort-total').click(function(){
				$('#allsorts').slideToggle('slow');
            	orderType = 2;
				session.set('orderType',orderType);
            	session.commit();
        	});

			$('#sort-per').click(function(){
                $('#allsorts').slideToggle('slow');
                orderType = 3;
				session.set('orderType',orderType);
                session.commit();
            });
	
			$('#sort-area').click(function(){
                $('#allsorts').slideToggle('slow');
                orderType = 4;
				session.set('orderType',orderType);
                session.commit();
            });

			$('#sort-time').click(function(){
                $('#allsorts').slideToggle('slow');
                orderType = '1';
                session.set('orderType',orderType);
                session.commit();
            });

			$('div.house').each(function(){
				$(this).click(function(){
					var houseId = $(this).attr("data-id");
					env.redirect('/houseDetail',{'houseId':houseId},true);
				});
			});
		});
	};
});
