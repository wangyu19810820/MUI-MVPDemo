define(function(require,exports,modules){
	console.log("presenter正在初始化")
	var v = require('./view');
	var http = require('http')
	var mui = require('mui');

	exports.fetchData = function(page, isPullDown) {
		var formobj = {};
		console.log("请求接口地址：" + http.INTERFACE_URL);
		console.log("请求参数：" + JSON.stringify(formobj));
		mui.ajax({
			url:http.INTERFACE_URL,
			data:formobj,
			success:function(res) {
				console.log("接口成功返回，返回数据为：");
				console.log(JSON.stringify(res));
				if (res.status == 1) {
					var hasMoreData = true;
					if (isPullDown) {
						v.endPullDown(res.data, hasMoreData);
					} else {
						v.endPullUp(res.data, hasMoreData);
					}
				} else {
					v.showError(res.errorMsg);
				}
			},
			error:function() {
				console.log("请求接口失败，无返回");
				v.showError('网络错误，请稍后再试');
			},
			timeout:1000,
		});
		

	};


});
