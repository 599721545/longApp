function orientationPopo(elem, startColor, endColor,count) {
	if (count) {
		createPoPo(elem, startColor, endColor,count);
	}else{
		createPoPo(elem, startColor, endColor,10);
	}
	var scene = document.querySelector(elem);
	var parallax = new Parallax(scene);

	mui.each(mui(".popo"), function(i, popo) {
		popo.style.left = GetRandomNum(-popo.offsetWidth, scene.clientWidth) + "px";
		popo.style.top = GetRandomNum(-popo.offsetWidth, scene.clientHeight) + "px";
	})
	plus.orientation.watchOrientation(function(r) {
//		console.log( "Orientation\nAlpha:" + r.alpha + "\nBeta:" + r.beta + "\nGamma:" + r.gamma ); 
//		parallax.orientation(-r.gamma, -r.beta);
	}, function(e) {
		// error
		console.log(e);
		console.log("陀螺仪未正常启用");
	}, {
		frequency: 3000
	});

}

function createPoPo(elem, startColor, endColor,count) {
	var scene = document.querySelector(elem);
	//				var container = document.getElementById('container');
	//				scene.setAttribute("data-calibrate-x",true);//指定是否根据初始时x轴的值来计算运动量
	//				scene.setAttribute("data-calibrate-y",true);
	//				scene.setAttribute("ddata-invert-x",false);//设置为true则按反方向运动层
	//				scene.setAttribute("data-invert-y",false);
					scene.setAttribute("data-scalar-x",10);//输入的运动量和这个值相乘，增加或减少层运动的灵敏度
					scene.setAttribute("data-scalar-y",10);
	//				scene.setAttribute("data-limit-x",10);//x方向上总的运动量数值范围，设置为false则允许层自由运动
	//				scene.setAttribute("data-limit-y",10);
	//				scene.setAttribute("data-friction-x",0.5);//层运动的摩擦量，实际上是在层上添加一些easing效果
	//				scene.setAttribute("data-friction-y",0.8);
	//				scene.setAttribute("data-origin-x",0.8);//鼠标输入的x原点，默认值是0.5。0会移动原点到页面的左边，1会移动原点到页面的右边。Mouse input only
	//				scene.setAttribute("data-origin-y",0.8);

	var gradient = new gradientColor(startColor, endColor, count);
	for(var i = 0; i < count; i++) {
		var popo = document.createElement('LI');
		popo.className = "popo layer";
		popo.setAttribute("data-depth", GetRandomNum(0.5, 1));
		popo.style.opacity = GetRandomNum(0.3, 0.5);
		popo.style.position = "absolute";
		var w = GetRandomNum(30, 130) + "px";
		popo.style.borderRadius = "100%";
		popo.style.backgroundColor = gradient[i];
		popo.style.width = w;
		popo.style.height = w;

		scene.appendChild(popo);
	}

}

/*
			     // startColor：开始颜色hex
			     // endColor：结束颜色hex
			     // step:几个阶级（几步）
			     */
function gradientColor(startColor, endColor, step) {
	startRGB = this.colorRgb(startColor); //转换为rgb数组模式
	startR = startRGB[0];
	startG = startRGB[1];
	startB = startRGB[2];

	endRGB = this.colorRgb(endColor);
	endR = endRGB[0];
	endG = endRGB[1];
	endB = endRGB[2];

	sR = (endR - startR) / step; //总差值
	sG = (endG - startG) / step;
	sB = (endB - startB) / step;

	var colorArr = [];
	for(var i = 0; i < step; i++) {
		//计算每一步的hex值
		var hex = this.colorHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');
		colorArr.push(hex);
	}
	return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
gradientColor.prototype.colorRgb = function(sColor) {
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	var sColor = sColor.toLowerCase();
	if(sColor && reg.test(sColor)) {
		if(sColor.length === 4) {
			var sColorNew = "#";
			for(var i = 1; i < 4; i += 1) {
				sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
			}
			sColor = sColorNew;
		}
		//处理六位的颜色值
		var sColorChange = [];
		for(var i = 1; i < 7; i += 2) {
			sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
		}
		return sColorChange;
	} else {
		return sColor;
	}
};

// 将rgb表示方式转换为hex表示方式
gradientColor.prototype.colorHex = function(rgb) {
	var _this = rgb;
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	if(/^(rgb|RGB)/.test(_this)) {
		var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
		var strHex = "#";
		for(var i = 0; i < aColor.length; i++) {
			var hex = Number(aColor[i]).toString(16);
			hex = hex < 10 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
			if(hex === "0") {
				hex += hex;
			}
			strHex += hex;
		}
		if(strHex.length !== 7) {
			strHex = _this;
		}
		return strHex;
	} else if(reg.test(_this)) {
		var aNum = _this.replace(/#/, "").split("");
		if(aNum.length === 6) {
			return _this;
		} else if(aNum.length === 3) {
			var numHex = "#";
			for(var i = 0; i < aNum.length; i += 1) {
				numHex += (aNum[i] + aNum[i]);
			}
			return numHex;
		}
	} else {
		return _this;
	}
}
//取随机数
function GetRandomNum(Min, Max) {
	var Range = Max - Min;
	var Rand = Math.random();
	if((Min + Rand * Range) < Max) {
		return(Min + Rand * Range);
	} else {
		return Max;
	}
}
//取随即颜色
var getRandomColor = function() {
	return '#' + (Math.random() * 0xffffff << 0).toString(16);
}