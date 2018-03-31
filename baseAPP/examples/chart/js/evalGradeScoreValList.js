mui.init({
	swipeBack: false
});

//初始化滚动条
(function($) {
	/*$(".mui-scroll-wrapper").scroll({
		indicators: false, //是否显示滚动条,默认是true
	});*/
})(mui);

mui.plusReady(function() {
	plus.key.addEventListener('keydown', function(e) {
		console.log(e.keyCode);
		if(e.keyCode == 4) {
			var w = plus.webview.currentWebview();
			plus.screen.lockOrientation("portrait-primary");
			plus.webview.close(w);
		}
	});
	plus.webview.currentWebview().setStyle({
		scrollIndicator: 'none'
	});
	plus.navigator.setStatusBarStyle("dark");
	var personal = mui.currentWebview.personal;
	//console.log(JSON.stringify(personal));
	var tbody = document.getElementById("tbody");
	var rentDataSuccess = function(response1) {
		//console.log(JSON.stringify(response1));
		if(response1.lstNew.length > 0) {
			if(!response1.flag) {
				if(response1.evalPublic.evalPubNo !== undefined) {
					document.getElementById("evalPubNo").innerHTML = response1.evalPublic.evalPubNo;
				}
				if(response1.modelVer !== undefined) {
					document.getElementById("modelVer").innerHTML = response1.modelVer;
				}
				if(response1.evalPublic.dlScore !== undefined) {
					document.getElementById("dlScore").innerHTML = response1.evalPublic.dlScore;
				}
				var result = ''
				if(response1.lstNew !== '' && response1.lstNew !== undefined) {
					for(var i = 0; i < response1.lstNew.length; i++) {
						result = result + '<tr class="evatit">' +
							'<td colspan="9">' + response1.lstNew[i].parmName + '</td>' +
							'</tr>';
						if(response1.lstNew[i].list !== '' && response1.lstNew[i].list !== undefined) {
							for(var j = 0; j < response1.lstNew[i].list.length; j++) {
								result = result + '<tr>' +
									'<td class="tabname">' + response1.lstNew[i].list[j].parmName + '</td>' +
									'<td >' + response1.lstNew[i].list[j].minScore + '</td>' +
									'<td class="tabname">' + response1.lstNew[i].list[j].minScore + '</td>' +
									'<td>' + response1.lstNew[i].list[j].stdVal + '</td>' +
									'<td class="tabname">' + response1.lstNew[i].list[j].stdScore + '</td>' +
									'<td>' + response1.lstNew[i].list[j].maxVal + '</td>' +
									'<td class="tabname">' + response1.lstNew[i].list[j].maxScore + '</td>' +
									'<td >' + response1.lstNew[i].list[j].val + '</td>' +
									'<td class="tabname">' + response1.lstNew[i].list[j].score + '</td>' +
									'</tr>'
							}

						}

					}
					tbody.innerHTML = result;

				}

			} else if(response1.flag === "error") {
				mui.alert(' ', response1.msg, function() {
					var stateText = localStorage.getItem('$state') || "{}";
					var localstate = JSON.parse(stateText);
					localstate.token = '';
					localStorage.setItem('$state', JSON.stringify(localstate));

					var curr = plus.webview.currentWebview();
					var main = plus.webview.getWebviewById("main")
					//console.log(main.getURL())
					var wvs = plus.webview.all();
					for(var i = 0, len = wvs.length; i < len; i++) { //关闭除setting页面外的其他页面
						//console.log(curr.getURL())
						//console.log(wvs[i].getURL())
						if(wvs[i].getURL() == curr.getURL()) {
							continue;
							plus.webview.close(wvs[i]);
							//console.log("wvs[i].getURL()")
						}
					} //打开login页面后再关闭setting页面
					//plus.webview.open('../../login1.html', '', '', 'slide-in-left');
					main.close();
					curr.close();

				});
			}
		} else {
			mui.alert(' ', '该客户的相关报表不存在！', function() {
				mui.back();
			});
		}
		var details = document.getElementById("details");
		setHeight(details, 70);
		plus.nativeUI.closeWaiting();
	};
	var error = function() {
		//关闭等待框
		plus.nativeUI.closeWaiting();
		//显示当前页面
		mui.currentWebview.show();
		mui.alert(' ', '网络连接异常请重试！', function() {
			mui.back();
		});
	};
	var stateText = localStorage.getItem('$state') || "{}";
	var localstate = JSON.parse(stateText);
	//var url = app_ip + "/Workbench/evalDlModelMark/" + personal.key_five.cifNo + "/" + personal.key_five.evalOccType + "/" + personal.key_five.custType + "/" + personal.key_five.dlModelVer + "/" + personal.key_five.view + "/" + tradeNo + "/" + personal.key_five.evalPubNo + "/?token=" + encodeURIComponent(localstate.token) + "&time=" + new Date().getTime();
	var url = null;
	var options = {
		url: url,
		success: rentDataSuccess,
		error: error,
		dataType: 'json',
		type: 'POST', //POST
		async: false,
		timeout: 30000
		//false同步
	};
	//mui.ajax(options);
	//关闭等待框
	var postSlide = '';
	mui('.mui-bar-tab').on('tap', 'a', function(e) {
		var postValue = this.getAttribute('href');
		if(postValue === "#pass") {
			postSlide = document.getElementById("postSlide");
		} else if(postValue === "#veto") {
			postSlide = document.getElementById("veto");
		} else if(postValue === "#Remand") {
			postSlide = document.getElementById("Remand");
		}
		var post = document.querySelector(".approve-type");
		var mask = document.querySelector(".approve-mask");
		mask.style.zIndex = 11;
		mask.style.opacity = 0.5;
		post.style.bottom = "0px";
	});

	document.querySelector(".approve-mask").addEventListener('tap', function(e) {
		var post = document.querySelector(".approve-type");
		var mask = document.querySelector(".approve-mask");
		postSlide = document.getElementById("postSlide");
		postSlide.style.display = 'none';
		veto = document.getElementById("veto");
		veto.style.display = 'none';
		Remand = document.getElementById("Remand");
		Remand.style.display = 'none';
		post.style.bottom = "-100%";
		mask.style.opacity = 0;
		setTimeout(function() {
			mask.style.zIndex = -1;
		}, 300);
	}, false);

	document.querySelector(".button-Type").addEventListener('tap', function(e) {
		var post = document.querySelector(".approve-type");
		var mask = document.querySelector(".approve-mask");
		postSlide = document.getElementById("postSlide");
		postSlide.style.display = 'none';
		veto = document.getElementById("veto");
		veto.style.display = 'none';
		Remand = document.getElementById("Remand");
		Remand.style.display = 'none';
		post.style.bottom = "-100%";
		mask.style.opacity = 0;
		setTimeout(function() {
			mask.style.zIndex = -1;
		}, 300);
	}, false)

	var data = [85, 60, 45, 53];
	var xMax = 500;
	optionHistory = {
		tooltip: {
			show: true,
			formatter: "{b} <br> {c}"
		},
		grid: {
			show: true,
			x: '25%',
			y: '15%',
			width: '65%',
			height: '80%',
			borderWidth: 0
		},
		xAxis: [{
			axisTick: {
				show: false,
				// color:'#fff',
			},
			axisLine: {
				show: false,
			},
			axisLabel: {
				show: false
				//color:'#fff',
			},
			splitLine: {
				show: false,
				// color:'#fff',
			}
		}],
		yAxis: [{
			type: 'category',
			data: ['2017/10/10', '2017/9/10', '2017/8/10', '2017/7/10'],
			axisTick: {
				// color:'#fff',
				show: false,
			},
			axisLine: {
				//  color:'#fff',
				show: false,
			},
			axisLabel: {
				textStyle: {
					color: '#fff',
				}
			}

		}, {
			type: 'category',
			data: ['B', 'B+', 'A-', 'A'],
			axisTick: {
				// color:'#fff',
				show: false,
			},
			axisLine: {
				//  color:'#fff',
				show: false,
			},
			axisLabel: {
				textStyle: {
					color: '#fff',
				}
			}

		}],
		series: [{
			name: ' ',
			type: 'bar',
			barWidth: 6,
			silent: true,
			itemStyle: {
				normal: {
					color: 'rgba(106,106,106,0.7)',
					barBorderRadius: [5, 5, 5, 5],

				}
			},
			barGap: '-100%',
			barCategoryGap: '50%',
			data: data.map(function(d) {
				return xMax
			}),
		}, {
			name: ' ',
			type: 'bar',
			barWidth: 6,
			label: {
				normal: {
					show: true,
					position: ['90%', -15],
					formatter: '{c}',
					color: '#fff'
				}
			},
			data: [{
				value: 330,
				itemStyle: {
					// normal:{color:'#b250ff',barBorderRadius:[0,10,10,0],}
					normal: {
						barBorderRadius: [10, 10, 10, 10],
						color: {
							type: 'bar',
							colorStops: [{
								offset: 0,
								color: 'rgba(233,48,34,0.2)' // 0% 处的颜色
							}, {
								offset: 1,
								color: 'rgba(233,48,34,1)' // 100% 处的颜色
							}],
							globalCoord: false, // 缺省为 false
						}
					}
				}
			}, {
				value: 370,
				itemStyle: {
					// normal:{color:'#4f9aff',barBorderRadius:[0,10,10,0],}
					normal: {
						barBorderRadius: [10, 10, 10, 10],
						color: {
							type: 'bar',
							colorStops: [{
								offset: 0,
								color: 'rgba(248,86,4,0.2)' // 0% 处的颜色
							}, {
								offset: 1,
								color: 'rgba(248,86,4,1)' // 100% 处的颜色
							}],
							globalCoord: false, // 缺省为 false
						}
					}
				}
			}, {
				value: 400,
				itemStyle: {
					// normal:{color:'#4bf3ff',barBorderRadius:[0,10,10,0],  },
					normal: {
						barBorderRadius: [10, 10, 10, 10],
						color: {
							type: 'bar',
							colorStops: [{
								offset: 0,
								color: 'rgba(248,155,4,0.2)' // 0% 处的颜色
							}, {
								offset: 1,
								color: 'rgba(248,155,4,1)' // 100% 处的颜色
							}],
							globalCoord: false, // 缺省为 false

						}
					}

				}
			}, {

				value: 450,
				itemStyle: {
					// normal:{color:'#ffa800',barBorderRadius:[0,10,10,0],}
					normal: {
						barBorderRadius: [10, 10, 10, 10],
						color: {
							type: 'bar',
							colorStops: [{
								offset: 0,
								color: 'rgba(135,202,59,0.2)' // 0% 处的颜色
							}, {
								offset: 1,
								color: 'rgba(135,202,59,1)' // 100% 处的颜色
							}],
							globalCoord: false, // 缺省为 false

						}
					}
				}
			}, ],
		}]
	};

	var myChartHistory = echarts.init(document.getElementById('lineChartSummary'));
	mui('.provetitle-right').on('tap', 'button', function(e) {
		var popover = document.querySelector(".popover-value");
		var inner = document.querySelector(".popover-inner");
		var mask = document.querySelector(".mask");
		var echartsText = document.querySelector(".echarts-text");
		echartsText.style.opacity = 1;
		popover.style.zIndex = 4;
		mask.style.zIndex = 3;
		inner.style.backgroundColor = 'rgba(0,0,0,0.7)';
		myChartHistory.setOption(optionHistory, true);
	});

	document.querySelector(".mask").addEventListener('tap', function(e) {
		var popover = document.querySelector(".popover-value");
		var inner = document.querySelector(".popover-inner");
		var mask = document.querySelector(".mask");
		var echartsText = document.querySelector(".echarts-text");
		echartsText.style.opacity = 0;
		myChartHistory.clear();
		inner.style.backgroundColor = 'rgba(0,0,0,0)';
		setTimeout(function() {
			popover.style.zIndex = -1;
			mask.style.zIndex = -2;
		}, 500);
	}, false)

	var post3 = document.getElementById("post2");
	var postSlide = document.getElementById("postSlide");
	var text1 = document.getElementById("text1");
	var bol = true;
	post3.addEventListener("tap", function() {
		if(!bol) {
			postSlide.style.display = "none";
		} else {
			postSlide.style.display = "block";
		}
		bol = !bol;
	});    
	mui(".postSlide").on('tap', 'li', function(e) {
		text1.value =   text1.value + this.innerHTML;
		postSlide.style.display = "none";
		bol = !bol;  
	});

	mui("#eval").on('tap', 'a', function(e) {
		var href = this.getAttribute('href');
		mui.openWindow({
			id: href,
			url: href,
			/*extras: {
				personal_details: JSON.parse(personal_details)
			},*/
			styles: {
				popGesture: "none"
			},
			show: {
				autoShow: true,
				aniShow: 'slide-in-right', //页面显示动画，默认为”slide-in-right“；
				event: 'titleUpdate', //页面显示时机，默认为titleUpdate事件时显示
			},
			waiting: {
				autoShow: true, //自动显示等待框，默认为true
				title: '正在加载...', //等待对话框上显示的提示内容
			},
			options: {}
		});
	});

	mui(".myaxis").on('tap', 'li', function(e) {
		mui.openWindow({
			id: 'approveSummaryList.html',
			url: 'approveSummaryList.html',
			/*extras: {
				personal_details: JSON.parse(personal_details)
			},*/
			styles: {
				popGesture: "none"
			},
			show: {
				autoShow: true,
				aniShow: 'slide-in-right', //页面显示动画，默认为”slide-in-right“；
				event: 'titleUpdate', //页面显示时机，默认为titleUpdate事件时显示
			},
			waiting: {
				autoShow: true, //自动显示等待框，默认为true
				title: '正在加载...', //等待对话框上显示的提示内容
			},
			options: {}
		});
	});

	function colorConversion(code) {
		var len = code.length;
		var f = new Array();
		f['0'] = 0;
		f['1'] = 1;
		f['2'] = 2;
		f['3'] = 3;
		f['4'] = 4;
		f['5'] = 5;
		f['6'] = 6;
		f['7'] = 7;
		f['8'] = 8;
		f['9'] = 9;
		f['A'] = 10;
		f['B'] = 11;
		f['C'] = 12;
		f['D'] = 13;
		f['E'] = 14;
		f['F'] = 15;
		code = code.toLocaleUpperCase(); //转换为大写
		var s = code.substr(0, 1);
		if(s == '#') {
			code = code.substr(1, 6);
		}
		var r = f[code[0]] * 16 + f[code[1]];
		var g = f[code[2]] * 16 + f[code[3]];
		var b = f[code[4]] * 16 + f[code[5]];
		return [r, g, b];
	}
	/*
	参数：
	thisRGB：当前背景颜色的6位代码
	toRGB：目标背景颜色的6位代码
	step：执行次数
	*/
	function colorGradient(thisRGB, toRGB, step, value, str, color, sum) {
		if(value > ((str - 1) * 0.2)) {
			var _thisRGB = colorConversion(thisRGB); //16进制转换10进制
			var _toRGB = colorConversion(toRGB);
			var step = step ? step : 3;
			var _step = step;
			var _R_step = parseInt(Math.abs(_thisRGB[0] - _toRGB[0]) / _step);
			var _G_step = parseInt(Math.abs(_thisRGB[1] - _toRGB[1]) / _step);
			var _B_step = parseInt(Math.abs(_thisRGB[2] - _toRGB[2]) / _step);
			for(_step; _step > 0; _step--) {
				var s = (step - _step) + 1;
				var r = _step == 1 ? _toRGB[0] : (_thisRGB[0] > _toRGB[0] ? _thisRGB[0] - _R_step * s : _thisRGB[0] + _R_step * s);
				var g = _step == 1 ? _toRGB[1] : (_thisRGB[1] > _toRGB[1] ? _thisRGB[1] - _G_step * s : _thisRGB[1] + _G_step * s);
				var b = _step == 1 ? _toRGB[2] : (_thisRGB[2] > _toRGB[2] ? _thisRGB[2] - _B_step * s : _thisRGB[2] + _B_step * s);
				var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
				var i = 0;
				for(i = 0; i < color.length; i++) {
					if(color[i][0] === ((str - 1) * step * (1 / sum) + (1 / sum) * s)) {
						break;
					}
				}
				if(i === color.length) {
					if(value >= ((str - 1) * step * (1 / sum) + (1 / sum) * s)) {
						var innersColor = [((str - 1) * step * (1 / sum) + (1 / sum) * s).toFixed(2), hex];
						color.push(innersColor);
					} else {
						break;
					};
				}
			}
			return color;
		} else {
			return color;
		}
	}

	var myChart = echarts.init(document.getElementById('main'));
	var printer = 450;
	var a = (printer - 150) / 350;
	option = {
		tooltip: {
			formatter: "{a} <br/>{b} : {c}%"
		},

		series: [{
			name: '业务指标',
			type: 'gauge',
			min: 150,
			max: 500,
			splitNumber: 7,
			axisLabel: {
				distance: -55
			},
			radius: '80%',
			axisTick: {
				length: 20, // 属性length控制线长
				lineStyle: { // 属性lineStyle控制线条样式
					color: 'auto',
					width: 3,

				}
			},

			axisLine: {
				lineStyle: { // 属性lineStyle控制线条样式
					width: 1,
					color: [

					],
				},

			},
			data: [{
				value: 150
			}],
			pointer: {
				show: false,
				length: '90%',
				width: 0,
			},
			detail: {
				show: false
			},
			splitLine: {
				show: false,
				length: 30,
			},
		}]
	};
	var start = 151;
	var value = 450;
	var times = setInterval(function() {
		if(start <= value) {
			var a = ((start - 150) / 350).toFixed(2);
			var innerColor = [0.00.toFixed(2), '#e93022'];
			var colors = [];
			colors.push(innerColor);
			colors = colorGradient('e93022', 'f85604', 7, a, 1, colors, 35);
			colors = colorGradient('f85604', 'f89b04', 7, a, 2, colors, 35);
			colors = colorGradient('f89b04', '87ca3b', 7, a, 3, colors, 35);
			colors = colorGradient('87ca3b', '01d383', 7, a, 4, colors, 35);
			colors = colorGradient('01d383', '09bcad', 7, a, 5, colors, 35);
			var innersColor = [1, '#dadada'];
			colors.push(innersColor);
			option.series[0].data[0].value = value;
			option.series[0].axisLine.lineStyle.color = colors;
			myChart.setOption(option, true);
			start = start + 10;
		} else {
			clearInterval(times);
			return true;
		}
	}, 30);
	var lineChart = echarts.init(document.getElementById('linechar'));
	optionline = {
		grid: {
			show: true,
			x: '15%',
			y: '20%',
			width: '80%',
			
			borderWidth: 0
		},
		title: {
			text: '上半年消费记录',
			subtext: ''
		},
		tooltip: {
			trigger: 'axis'
		},
		toolbox: {
			show: false,
			feature: {
				mark: {
					show: false
				},
				dataView: {
					show: true,
					readOnly: false
				},
				magicType: {
					show: true,
					type: ['line', 'bar', 'stack', 'tiled']
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		calculable: false,
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: ['一月', '二月', '三月', '四月', '五月', '六月']
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
				name: '网络',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						color:'#99FF66',  
                        lineStyle:{  
                            color:'#99FF66'
                        },
						areaStyle: {
							type: 'default'
						}
					}
				},
				data: [10, 12, 21, 54, 260, 830, ]
			},
			{
				name: '门店',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						color:'#FF9933',  
                        lineStyle:{  
                            color:'#FF9933'
                        },
						areaStyle: {
							type: 'default'
						}
					}
				},
				data: [30, 182, 434, 791, 390, 30]
			},
			{
				name: '团购',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						color:'#99CCFF',  
                        lineStyle:{  
                            color:'#99CCFF'
                        },
						areaStyle: {
							type: 'default'
						}
					}
				},
				data: [1320, 1132, 601, 234, 120, 90]
			}
		]
	};
	lineChart.setOption(optionline);
	plus.nativeUI.closeWaiting();
	//显示当前页面
	mui.currentWebview.show();
});