define(function(require,exports,module){
	console.log("notice view")
	var ejs = require('ejs');
	var p = require('./presenter');
	require("mui");
	var count = 1;
	var listData = [];
	var firstLoadData = true;
		
	exports.init = function() {
		mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				down: {
					callback: pulldownRefresh
				},
				up: {
					contentrefresh: '正在加载...',
					callback: pullupRefresh
				}
			}
		});
		
		function pulldownRefresh() {
			p.fetchData(1, true);
		}
		
		function pullupRefresh() {
			p.fetchData(count, false);
		}

		mui("#notice_ul").on('tap', '.mui-card', function(){
			var i = this.getAttribute('index');
			console.log(JSON.stringify(listData));
			mui.openWindow({
				url:'../notice-detail/tpl.html',
				id:'notice-detail',
				extras:{
					notice:listData[i]
				},
				styles: {
					popGesture:"close"
				},
			})
		});
		
		// 登录后重置数据的窗口方法
		document.addEventListener('resetData', function(event){
			console.log("notice resetData");
			listData = [];
			document.getElementById("notice_ul").innerHTML = '';
			mui('#pullrefresh').pullRefresh().pulldownLoading();
		});
		// 预加载标识
		plus.storage.setItem("noticeLoadSucFlag", "true");
	};
	
	exports.endPullDown = function(data, hasMoreData) {
		console.log("hasMoreData");
		console.log(hasMoreData);
		count = 2;
		listData = data;
		
		document.getElementById("notice_ul").innerHTML = parseData(data, true);
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		if (hasMoreData) {
			mui('#pullrefresh').pullRefresh().enablePullupToRefresh();
			mui('#pullrefresh').pullRefresh().refresh(hasMoreData);
		} else {
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
			mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
			
//			mui('#pullrefresh').pullRefresh().endPullupToRefresh(!hasMoreData); //参数为true代表没有更多数据了。
		}
	}
	
	exports.endPullUp = function(data, hasMoreData) {
		console.log(JSON.stringify(data));
		listData = listData.concat(data);
		
		// 组装ui
		var result = parseData(data, count == 1);
		var origin = document.getElementById("notice_ul").innerHTML;
		document.getElementById("notice_ul").innerHTML = origin + result;
		
		count++;
	
		// 结束上拉动画
//		mui('#pullrefresh').pullRefresh().endPullupToRefresh(!hasMoreData); //参数为true代表没有更多数据了。
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
	}
	
	exports.showError = function(msg) {
		mui.toast(msg);
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
	}
	
	function parseData(data, isFirstPage) {
		// 组装ui
		var table = document.getElementById('notice_ul');
		var template = document.getElementById("notice_list").innerHTML;
		var firstIndex = isFirstPage ? 0 : table.querySelectorAll('.noticeLI').length;
		var result = ejs.render(template, {firstIndex:0, notices:data});
		return result;
	}
	
});
