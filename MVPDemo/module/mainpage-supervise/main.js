//执行方法
require(['../../config/global'], function(){ //获取配置
	require(['mui', 'echarts', './view'], function(mui, becharts, view){
		console.log("echart_main正在初始化");
		mui.plusReady(function(){
			view.init();
		})
	});
})
