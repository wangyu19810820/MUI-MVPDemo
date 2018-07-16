define(function(require,exports,module){
	console.log("主页正在初始化")
   	var lastBackTime;

	exports.init = function() {

		mui.init({
	  		subpages:[
	   		{
	  			url:'../mainpage-my/tpl.html',
	  			id:'my',
	  			styles:{
	  				top:0,
	  				bottom:50,
	  			},
	  		},
	  		{
	  			url:'../mainpage-supervise/tpl.html',
	  			id:'supervise',
	  			styles:{
	  				top:0,
	  				bottom:50,
	  			},
	  		},
	  		{
	  			url:'../mainpage-notice/tpl.html',
	  			id:'notice',
	   			styles:{
	  				top:0,
	  				bottom:50,
	  			},
	  		},
	  		]
	  	});
	  	
		document.getElementById("noticeHref").addEventListener('tap', function() {
			plus.webview.getWebviewById("notice").show();
		});
		document.getElementById("superviseHref").addEventListener('tap', function() {
	   		plus.webview.getWebviewById("supervise").show();
		});
		document.getElementById("myHref").addEventListener('tap', function() {
	    	plus.webview.getWebviewById("my").show();
		});
		
		
		document.addEventListener('activeDefaultTab',function(event){
			console.log("mainpage activeDefaultTab");
			var defaultTab = document.getElementById("noticeHref");
			mui.trigger(defaultTab, 'tap');
			var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
		    if (defaultTab !== current) {
		        current.classList.remove('mui-active');
		        defaultTab.classList.add('mui-active');
		    }
		});
	}
	
    mui.back = function() {
        //首次按键，或者2秒外，提示‘再按一次退出应用’
		var curTime = new Date().getTime();
		console.log(curTime);
		if (!lastBackTime || curTime - lastBackTime > 2000) {
			lastBackTime = curTime;
			mui.toast('再按一次退出应用');
		} else {
			plus.runtime.quit();
		}
    };

	

})
