define(function(require,exports,module){
	console.log("view正在初始化")
	var shares;

	exports.init = function() {
		mui.init();
		
		plus.share.getServices(function(ss) {
		    shares = ss;
		}, function(e) {
		    alert("获取分享服务列表失败：" + e.message);
		});
		
		document.getElementById("weixinLI").addEventListener('tap', function(){
			console.log("weixinLI");
			for (var i in shares) {
				var s = shares[i];
				if (s.id === 'weixin') {
					shareAction(s);
					return;
				}
			}
		});
		
//		document.getElementById("sinaLI").addEventListener('tap', function(){
//			console.log("sinaLI");
//			for (var i in shares) {
//				var s = shares[i];
//				if (s.id === 'sinaweibo') {
//					shareAction(s);
//					return;
//				}
//			}
//		});
		
		document.getElementById("QQLI").addEventListener('tap', function(){
			console.log("QQLI");
			for (var i in shares) {
				var s = shares[i];
				if (s.id === 'qq') {
					shareAction(s);
					return;
				}
			}
		});
		
	}
	
	function shareAction(s, ex) {
	    if (!s) {
	        console.log("无效的分享服务！");
	        return;
	    }
	    if (s.authenticated) {
	        console.log("---已授权---");
	        shareMessage(s, ex);
	    } else {
	        console.log("---未授权---");
	        s.authorize(function() {
	            shareMessage(s, ex);
	        }, function(e) {
	            console.log("认证授权失败：" + e.code + " - " + e.message);
	        });
	    }
	}
	
	function shareMessage(s,ex){
		var msg = {
			extra: {
				scene: ex
			}
		};
		msg.href = "http://www.njhsnn.com/";
		msg.title = "浙江省药品集中采购平台移动App";
		msg.content = "医药供应链管理及药械集中采购信息化解决方案领导者";
//		if (~share.id.indexOf('weibo')) {
//			msg.content += "；体验地址：http://www.dcloud.io/hellomui/";
//		}
		msg.thumbs = ["../../library/icon/icon.png"];


	    s.send( msg, function(){
	        alert( "分享到\""+s.description+"\"成功！ " );
	    }, function(e){
	        alert( "分享到\""+s.description+"\"失败: "+e.code+" - "+e.message );
	    } );
	}
	
	function cancelAuth(){try{

	    for ( var i in shares ) {
	        var s = shares[i];
	        if ( s.authenticated ) {
	            console.log( "取消\""+s.description+"\"");
	        }
	        s.forbid();
	    }
	    // 取消授权后需要更新服务列表
	    updateServices();
	    console.log( "操作成功！" );}catch(e){alert(e);}
	}
	
})
