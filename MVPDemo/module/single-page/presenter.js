define(function(require,exports,modules){

	var mui = require('mui');
	var view = require('./view.js');
	
	exports.load = function(url){
		console.log(url)
		mui.ajax(url,{
			type:'get',
			timeout:10000,
			success:function(data){
				view.showContent(data);
			},
			error:function() {
				
			}
		});
	};
		
});
