//执行方法
require(['../../config/global'], function(){ //获取配置
	require(['mui','./view'], function(mui,view){
		console.log("main正在初始化")
		mui.plusReady(function(){
			view.init();
		})
	});
})
