define(function(require,exports,module){
	var ejs = require('ejs');
	var mui = require('mui')
	var p = require('./presenter');
	var firstLoad = true;
	
	var $btn_login = document.getElementById("loginBtn");
//	var $btn_reset =  document.getElementById("resetBtn");	// 重置用户名和密码按钮
	
	var mainPage;

	
	exports.init = function(){
		var bodyWidth = plus.display.resolutionWidth;
		var bodyHeight = plus.display.resolutionHeight;

		document.getElementById("body1").style.backgroundSize= bodyWidth + "px " + bodyHeight + "px";
		// 预加载标识位
		plus.storage.setItem("superviseLoadSucFlag", "false");
		plus.storage.setItem("noticeLoadSucFlag", "false");
		
		// 预加载页面的时候，显示等待框
		plus.nativeUI.showWaiting('', {
			padlock: true
		});
		function checkPreload() {
//			var noticeTab = plus.webview.getWebviewById("notice_sub");
//			var superviseTab = plus.webview.getWebviewById("supervise");
//			if (noticeTab && superviseTab) {
//				plus.nativeUI.closeWaiting();
//			} else {
//				setTimeout(checkPreload, 1000);
//			}
			var superviseLoadSucFlag = plus.storage.getItem("superviseLoadSucFlag");
			var noticeLoadSucFlag = plus.storage.getItem("noticeLoadSucFlag");
			if (superviseLoadSucFlag === "false" 
					|| noticeLoadSucFlag === "false") {
				setTimeout(checkPreload, 1000);
			} else {
				plus.nativeUI.closeWaiting();
			}
		}
		setTimeout(checkPreload, 1000);
		
		mainPage = mui.preload({
	      	url:'../mainpage/tpl.html',
	      	id:'mainPage'
    	});
    	
		var password = document.getElementById('passwordInput');
		var username = document.getElementById("usernameInput");
		username.value = '15950455759';
		password.value = '111111';

		//事件的绑定
		$btn_login.addEventListener('tap',function(){
			var password = document.getElementById('passwordInput').value;
			var username = document.getElementById("usernameInput").value;
			plus.nativeUI.showWaiting('', {
				padlock: true
			});
			p.doLogin({username:username,password:password});
		})
//		$btn_reset.addEventListener("tap",function(){
			// 重置用户名和密码的功能，目前页面没重置按钮
//			p.reset();
//		});
		
		// 禁用竖屏
		plus.screen.lockOrientation("portrait-primary");
		plus.navigator.setStatusBarBackground( "#F9F9F9" );
		
		// 目前用的是预加载，来回切换页面。
//		var mainPage = plus.webview.getWebviewById("main");
//		if (mainPage) {
//			mainPage.close("none", 0);
//		}
	}
	
	exports.jumpToMain = function() {
//		mui.openWindow({
//			url:'../mainpage/tpl.html',
//			id:'mainPage'
//		});

		plus.nativeUI.closeWaiting();
		plus.navigator.setStatusBarBackground( "#0966a9" );
		mui.fire(mainPage,'activeDefaultTab');	// 激活默认选项卡
	    var noticeTab = plus.webview.getWebviewById("notice_sub");
		mui.fire(noticeTab, 'resetData');
		var superviseTab = plus.webview.getWebviewById("supervise");
		mui.fire(superviseTab, 'resetData');
		mainPage.show();
	}
	
	exports.showMsg = function(msg){
		plus.nativeUI.closeWaiting();
		mui.alert(msg);
	}
	
	exports.clearTxtPassword = function(){
      	document.getElementById('passwordInput').value = "";
	}
	
	exports.clearTxtUserName = function(){
		document.getElementById('usernameInput').value = "";
	}
})

