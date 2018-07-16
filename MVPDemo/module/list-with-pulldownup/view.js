define(function(require,exports,module){
	console.log("view正在初始化")
	var ejs = require('ejs');
	var p = require('./presenter');
	require("mui");
	var curPageNum = 1;
	var listData = [];

	exports.init = function() {
		console.log("页面初始化");
		mui.init({
			pullRefresh: {
				container: '#pullrefresh',
				down: {
					callback: pulldownRefresh
				},
				up: {
					auto: true,
					contentrefresh: '正在加载...',
					callback: pullupRefresh
				}
			}
		});
		function pulldownRefresh() {
			p.fetchData(1, true);
		}
		function pullupRefresh() {
			p.fetchData(curPageNum, false);
		}

		mui("#dataUL").on('tap', 'li', function(){
			// 点击一项，跳转到详情页面
			var i = this.getAttribute('index');	// 获取第几项
			mui.openWindow({
				url:'../detail/tpl.html',
				id:'detail',
				extras:{
					//传递的参数
				}
			})
		});
	};
	
	exports.endPullDown = function(data, hasMoreData) {
		console.log("下拉刷新获取数据后的回调");
		curPageNum = 1;
		listData = data;
		// 组装ui
		var table = document.body.querySelector('.mui-table-view');
		var template = document.getElementById("template").innerHTML;
		var firstIndex = table.querySelectorAll('.mui-table-view-cell').length;
		var result = ejs.render(template, {firstIndex:0, notices:listData})
		var origin = document.getElementById("dataUL").innerHTML;
		document.getElementById("dataUL").innerHTML = origin + result;
		
		// 结束下拉刷新，重新启用上拉刷新，重置上拉刷新状态
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		mui('#pullrefresh').pullRefresh().enablePullupToRefresh();
		mui('#pullrefresh').pullRefresh().refresh(hasMoreData);
	}
	
	exports.endPullUp = function(data, hasMoreData) {
		console.log("上拉刷新获取数据后的回调");
		curPageNum++;
		listData = listData.concat(data);
		
		// 组装ui
		var table = document.body.querySelector('.mui-table-view');
		var template = document.getElementById("template").innerHTML;
		var firstIndex = table.querySelectorAll('.mui-table-view-cell').length;		
		var result = ejs.render(template, {firstIndex:firstIndex, notices:data})
		var origin = document.getElementById("dataUL").innerHTML;
		document.getElementById("dataUL").innerHTML = origin + result;
	
		// 结束上拉动画
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(!hasMoreData); //参数为true代表没有更多数据了。
	}
	
	exports.showError = function(msg) {
		// 显示错误信息，结束下拉刷新状态，禁用上拉刷新
		mui.toast(msg);
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
	}

);
