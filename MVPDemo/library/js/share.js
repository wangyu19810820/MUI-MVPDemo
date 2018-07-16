define(function(require, exports, module){
	

	/**
	 * 更新分享服务
	 */
	exports.updateSerivces = function(){
		plus.share.getServices( function(s){
			shares={};
			for(var i in s){
				var t=s[i];
				shares[t.id]=t;
			}
			console.log(JSON.stringify(shares));
		}, function(e){
//			outSet( "获取分享服务列表失败："+e.message );
		} );
	}
	
		/**
	   * 分享操作
	   * @param {String} id
	   */
	exports.shareAction = function(id,ex) {
		var s=null;
		//alert( "分享操作：" );
		if(!id||!(s=shares[id])){
			alert( "无效的分享服务！" );
			return;
		}
		if ( s.authenticated ) {
			shareMessage(s,ex);
		} else {
			s.authorize( function(){
					shareMessage(s,ex);
				},function(e){
					mui.toast("分享失败");
			//alert( "分享失败");
			});
		}
	}
	/**
	   * 发送分享消息
	   * @param {plus.share.ShareService} s
	   */
	exports.shareMessage = function(s,ex){
		var msg={content:'content',extra:{scene:ex}};
		//定义图标
		  console.log("shareurl:",shareurl)
			if (shareurl){
				msg.href=shareurl;
			}else {
				msg.href='http://qx.elian.net';
			}
			if (title){
				msg.title=title;
			}else {
				msg.title = '易联器械网';
			}
			
			if(s.description=="新浪微博")
			{
			  msg.content=title+"——"+description+"  "+shareurl;
			 }
			else
			  msg.content=description;
			msg.thumbs=[share_thumb,share_thumb,share_thumb];
			msg.imgUrl = share_thumb;
		s.send( msg, function(){
			msg=null;
			mui.alert( "分享到\""+s.description+"\"成功！ " );
		}, function(e){
			msg=null;
			mui.alert( "分享到\""+s.description+"\"失败 ");
		} );
	}

});