define(function(require,exports,modules){
	var v = require('./view');
	var http = require('http')
	var mui = require('mui');

	exports.fetchData = function(page, isPullDown) {
		var token = plus.storage.getItem("token");
		var username = plus.storage.getItem("username");
//		var formobj ={"accessToken":token,"username":username,"msgType":"1","loopStrTime":"1","currentPageNumber":1+""};
		var formobj = {transtime:"20170727102912", keyword:"", ChannelName:"招标资讯", AreaID:"", Pageindex:page, Type:0, token:token}
		console.log(JSON.stringify(formobj));
		
		mui.post(http.NOTICE, formobj, function(res){
				console.log(res);
				var resObj = JSON.parse(res);
				if (resObj.result == 1) {
					if (isPullDown) {
						v.endPullDown(resObj.SearchResult, !!resObj.nextpage);
					} else {
						v.endPullUp(resObj.SearchResult, !!resObj.nextpage);
					}
				} else {
					v.showError(resObj.message);
				}
		});
		
//		mui.ajax({
//			url:http.NOTICE,
//			data:formobj,
//			type:'POST',
//			success:function(res) {
//				console.log(res);
//				var resObj = JSON.parse(res);
//				if (resObj.result == 1) {
//					if (isPullDown) {
//						v.endPullDown(resObj.SearchResult, !!resObj.nextpage);
//					} else {
//						v.endPullUp(resObj.SearchResult, !!resObj.nextpage);
//					}
//				} else {
//					v.showError(resObj.message);
//				}
//			},
//			error:function() {
//				console.log('errorrrrrrrrrrrrrr');
//				v.showError('网络错误，请稍后再试');
//			},
//			timeout:2000,
//		});
		
//		mui.post("http://192.168.187.1:3000/", formobj, function(res){
//			console.log(JSON.stringify(res))
//			if (res.status == 1) {
//				if (page == -1) {
//					v.endPullDown(res.notice_list, true);
//				} else {
//					v.endPullUp(res.notice_list, true);
//				}
//			} else {
//				v.showError(res.errorMsg);
//			}
//		});


	};


});
