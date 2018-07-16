//全局配置
define(function(){
	console.log("成功选择了配置config文件.")

	//配置lib库
	require.config({
	    paths: {
	    	 //mui app主模块
			mui:'../../library/js/mui.min',
			echarts:'../../library/js/echarts.min',
			ejs:'../../library/js/ejs.min',
			share:'../../library/js/share',
			moment:'../../library/js/moment.min',
			http:'../../config/http',
		}
	});
})
