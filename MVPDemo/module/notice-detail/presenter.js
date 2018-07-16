define(function(require,exports,modules){
	var v = require("./view");

	exports.load = function(url) {
		mui.ajax({
			url:url,
			type:'GET',
			success:function(res) {
				v.showContent(res);
			},
			error:function() {
				v.showMsg("网络错误，请稍后再试");
			}
		})
	}
});
