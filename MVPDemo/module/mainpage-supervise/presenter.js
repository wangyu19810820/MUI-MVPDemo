define(function(require,exports,modules){
	console.log("presenter正在初始化")
	var v = require("./view");
	
	exports.loadData = function() {
		setTimeout(function(){
			v.updateMap({title:"全省2017年5月统计数据", data:[323, 42, 43, 123]});
		}, 5000);
	}
});
