define(function(require,exports,module){
	console.log("主页正在初始化")
	var http = require("http");

	exports.init = function() {
		mui.init();
	  	
	  	document.getElementById("logoutLI").addEventListener('tap',function () {
		  	if (mui.os.android){
				mui('#sheet1').popover('toggle');
			}else{
				var btnArray = [{title:"确定退出",style:"destructive"}];
				plus.nativeUI.actionSheet( {
					cancel:"取消",
					buttons:btnArray
				}, function(e){
					var index = e.index;
					switch (index){
						case 0:
							break;
						case 1:
							logout();
							break;
					}
				} );
			}
		});

//		document.getElementById("logoutLI").addEventListener('tap', function() {
//			plus.navigator.setStatusBarBackground( "#F9F9F9" );
//			var notice = plus.webview.getWebviewById("notice");
//			notice.hide();
//			var supervise = plus.webview.getWebviewById("supervise");
//			supervise.hide();
//			var my = plus.webview.getWebviewById("my");
//			my.hide();
//			var login = plus.webview.getLaunchWebview();
////			mui.openWindow({url:"../login/tpl.html", id:"login"});
//			login.show();
//			plus.storage.clear();
//		});

		document.getElementById("aboutCompany").addEventListener('tap', function() {
			mui.openWindow({
				url:'../single-page/tpl.html',
				id:'singlePage',
				extras:{
					pageInfo:{
						title:'公司介绍',
						url:http.ABOUT_COMPANY, 
						content:''
					}
				}
			});
		});
		
		var versionContent = '<img id="trueimg" src="../../library/icon/icon.png" style="width: 64px; height: 64px; display:block;margin: 0 auto;margin-top:50px;">';
		versionContent += "<p style='text-align: center;'>当前版本1.0</p>";
		document.getElementById("versionInfo").addEventListener('tap', function() {
			mui.openWindow({
				url:'../single-page/tpl.html',
				id:'singlePage',
				extras:{
					pageInfo:{
						title:'版本介绍',
						url:'', 
						content:versionContent
					}
				}
			});
		});
		
		document.getElementById("logoutSheetItem").addEventListener('tap', function(){
			mui('#sheet1').popover('toggle');
			logout();
		});
		
		document.getElementById("shareLI").addEventListener('tap', function(){
			mui.openWindow({
				url:'../my-share/tpl.html',
				id:'share',
				extras:{
				}
			});
		});
	}
	
	function logout() {
		plus.navigator.setStatusBarBackground( "#F9F9F9" );
		var notice = plus.webview.getWebviewById("notice");
		notice.hide();
		var supervise = plus.webview.getWebviewById("supervise");
		supervise.hide();
		var my = plus.webview.getWebviewById("my");
		my.hide();
		var login = plus.webview.getLaunchWebview();
//			mui.openWindow({url:"../login/tpl.html", id:"login"});
		login.show();
		plus.storage.clear();
	}

})
