define(function(require,exports,module){
	

//	var server_path = "http://124.115.170.195:8008/com.hsnn.std/app/";
//	module.exports =  (function(env){
//		return {
//			LOGIN:server_path + "getUser.html",
//			NOTICE:server_path + "getNotice.html",
//			MESSAGE:server_path + "getMessage.html",
//			ABOUT_COMPANY:'http://www.elian.net/api/common/GetCompanyInfo',
//		}
//	})('debug')
	
	var server_path = "http://124.115.170.195:8008/com.hsnn.std/app/";
	module.exports =  (function(env){
		return {
			TIME_OUT:2000,
//			LOGIN:"http://trade.zgyxcgw.cn:8092/tradeInterface/v1/appInterface/login/login",
			LOGIN:"http://www.elian.net/api/common/Login",
			NOTICE:"http://www.elian.net/api/common/FullSearch",
			MESSAGE:server_path + "getMessage.html",
			ABOUT_COMPANY:'http://www.elian.net/api/common/GetCompanyInfo',
		}
	})('debug')
	
	

})
