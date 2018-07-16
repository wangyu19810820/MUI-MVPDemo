define(function(require,exports,module){
	console.log("主页正在初始化")
	var p = require("./presenter");

	exports.init = function() {
		plus.nativeUI.showWaiting('', {
			padlock: true
		});
		
      	ws=plus.webview.currentWebview();
      	var notice = ws.notice;
      	console.log(JSON.stringify(notice));
      	console.log(notice.sourceurl);
      	
      	p.load(notice.sourceurl);
      	
//		mui.init({
//          subpages:[{
//              url:notice.sourceurl,
//              id:notice.sourceurl,
//              styles:{
//					top:'45px'
//              }
//          }]
//      });
	  	
//    	var title = document.getElementById("title");
//     	
//    	var date = document.getElementById("postTime");
//    	date.innerHTML = moment(notice.notice_datetime).format('YYYY年MM月DD日');
//    	var content = document.getElementById("content");
//		content.innerHTML = notice.notice_content;
	}
	
	exports.showContent = function(res) {
		plus.nativeUI.closeWaiting();//关闭等待框
		var contentDiv = document.getElementById("collectnewsdetail");
		contentDiv.innerHTML = res;
	}
	
	exports.showMsg = function(res) {
		plus.nativeUI.closeWaiting();//关闭等待框
		mui.toast(res);
	}
	

})
