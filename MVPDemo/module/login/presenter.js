define(function(require,exports,modules){
	var view = require('./view');
	var http = require('http')
	var mui = require('mui');
	
	exports.doLogin = function(user) {
		console.log(http.LOGIN)
		
		var phoneType;
		if (mui.os.android){
			phoneType = 'Android';
		}else{
			phoneType = 'IOS';
		}
		var info = plus.push.getClientInfo();

		var param1 = {
			transtime:"20170727105656",
			UserID:user.username,
			Password:"MTExMTEx",
			ClientID:"123",
			IOSToken:info.token,
			PhoneType:phoneType
		};
		console.log(http.LOGIN);
		console.log(JSON.stringify(param1));
		
		mui.ajax({
			url:http.LOGIN,
			data:param1,
			type:'POST',
			success:function(res) {
				var resObj = JSON.parse(res);
				console.log(res);
				if (resObj.result == 1) {
					plus.storage.setItem("token",resObj.Token);
					plus.storage.setItem("username",user.username);
					view.jumpToMain();
				} else {
					view.showMsg(resObj.message);
				}
			},
			error:function() {
				console.log("登录网络错误");
				view.showMsg("网络错误，请稍后重试");
			},
			timeout:2000
		});

//		mui.ajax({
//			url:http.LOGIN, 
//			data:param1,
//			method:'post',
//			success:function(res) {
//				console.log(JSON.stringify(res));
//				console.log(res);
//			},
//			error:function() {
//				console.log('error')
//			},
//			timeout:1000,
//		});
	

//		mui.post(http.LOGIN, user, function(data){
//			console.log(JSON.stringify(data))
//			if (data.status == 1) {
//				plus.storage.setItem("token",data.token);
//				plus.storage.setItem("username",user.username);
//				view.showMsg("登录成功")
//				mui.openWindow({
//					url:'../mainpage/tpl.html',
//					id:'main'
//				})
//			} else {
//				 view.showMsg("失败")
//			}
//		},'json');
	}
	
	exports.reset =function(){
		console.log('执行reset的方法')
		view.clearTxtPassword();
		view.clearTxtUserName();
	}
	
});

