define(function(require,exports,module){
	console.log("主页正在初始化")
	var presenter = require('./presenter');
	
	exports.init = function() {
		mui.init();
	  	plus.nativeUI.closeWaiting();//关闭等待框
      	ws = plus.webview.currentWebview();
  		document.getElementById("title").innerHTML = ws.pageInfo.title;
     	if (ws.pageInfo.url) {
	      	presenter.load(ws.pageInfo.url);
      	} else {
      		document.getElementById("content").innerHTML = ws.pageInfo.content;
      	}
	};
	
	exports.showContent = function(content) {
		document.getElementById("content").innerHTML = content;
	};

})
