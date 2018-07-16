//执行方法
require(['../../config/global'], function(){ //获取配置
	require(['mui','./view'], function(mui,view){
		mui.plusReady(function(){
			view.init();
		})
	});
})

