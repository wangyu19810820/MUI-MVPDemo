define(function(require,exports,module){
	console.log("map view正在初始化");
	var p = require('./presenter');
	var myChart; 
	var echarts = require('echarts');

	exports.init = function() {
		console.log("map view init");
		mui.init({});
		var bodyHeight = plus.display.resolutionHeight;
		var map = document.getElementById('map');
		map.style.height = (plus.display.resolutionHeight - 44 - 50) + "px";
		myChart = echarts.init(document.getElementById('map'));
		var option = {
			tooltip: {
				
			},
	        xAxis: {
	        	type:'category',
	            data: [""]
	        },
		    yAxis: [
		        {
		            type : 'value'
		        }
		    ],
		}
		myChart.setOption(option);
		
		document.addEventListener('resetData', function(event){
			myChart.showLoading();
			p.loadData();
		});
		// 设置预加载标识
		plus.storage.setItem("superviseLoadSucFlag", "true");
	}
	
	exports.updateMap = function(data) {
		console.log("map的数据：" + JSON.stringify(data));

	    myChart.hideLoading();
		myChart.setOption({
	        title: {
	            text: data.title,
		        x:'center',
		        textAlign:'left'
	        },
	        legend: {
	        	orient:'horizontal',
	        	top:'bottom',
	            data:['总采购金额', '总配送金额', '总收货金额', '总支付金额']
	        },
	        grid: { // 控制图的大小，调整下面这些值就可以，
	            y: 30,
	        },
	        series: [
		        {
		        	name: '总采购金额',
		        	type:'bar',
		        	itemStyle: {
		        		normal: {
		        			color: '#4F81BD'
		        		}
		        	},
		            data: [data.data[0]]
		        },
		        {
		        	name: '总配送金额',
		        	type:'bar',
		        	itemStyle: {
		        		normal: {
		        			color: '#C0504D'
		        		}
		        	},
		            data: [data.data[1]]
		        },
		        {
		        	name: '总收货金额',
		        	type:'bar',
		        	itemStyle: {
		        		normal: {
		        			color: '#9BBB59'
		        		}
		        	},
		            data: [data.data[2]]
		        },
		        {
		        	name: '总支付金额',
		        	type:'bar',
		        	itemStyle: {
		        		normal: {
		        			color: '#8064A2'
		        		}
		        	},
		            data: [data.data[3]]
		        },
	        ]
	    });

	}
})
