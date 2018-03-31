var GestureLock = function(domId,callback) {
	var g = {
		domId:domId,
		lineColor:"#19B2F1",
		borderCircleColor:"#19B2F1",
		bgCircleColor:"#F3FBFF",
		centerCircleColor:"#19B2F1",
		activeCircleColor:"rgba(86, 207, 253, 0.3)",
	}

	var R = 20,
		CW = 400,
		CH = 320,
		OffsetX = 76,
		OffsetY = 76
	CT = 0;
	var PointLocationArr = [];
	g.CaculateNinePointLotion = function(diffX, diffY) {
		var Re = [];
		for(var row = 0; row < 3; row++) {
			for(var col = 0; col < 3; col++) {
				var Point = {
					X: (OffsetX + col * diffX + (col * 2 + 1) * R),
					Y: (OffsetY + row * diffY + (row * 2 + 1) * R)
				};
				Re.push(Point);
			}
		}
		return Re;
	}

	g.init = function() {
		var c = document.getElementById(g.domId);
		CW = document.body.offsetWidth;
		c.width = CW;
		CH = CW; 
		c.height = CH;
		CT = c.offsetTop;
		var cxt = c.getContext("2d");
		//两个圆之间的外距离 就是说两个圆心的距离去除两个半径
		var X = (CW - 2 * OffsetX - R * 2 * 3) / 2;
		var Y = (CH - 2 * OffsetY - R * 2 * 3) / 2;
		PointLocationArr = g.CaculateNinePointLotion(X, Y);
		g.InitEvent(c, cxt);
		//CW=2*offsetX+R*2*3+2*X
		g.Draw(cxt, PointLocationArr, [], null);
	}

	//绘制
	g.Draw = function(cxt, _PointLocationArr, _LinePointArr, touchPoint) {
		if(_LinePointArr.length > 0) {
			cxt.beginPath();
			for(var i = 0; i < _LinePointArr.length; i++) {
				var pointIndex = _LinePointArr[i];
				cxt.lineTo(_PointLocationArr[pointIndex].X, _PointLocationArr[pointIndex].Y);
			}
			cxt.lineWidth = 1;
			cxt.strokeStyle = g.lineColor; //线颜色
			cxt.stroke();
			cxt.closePath();
			if(touchPoint != null) {
				var lastPointIndex = _LinePointArr[_LinePointArr.length - 1];
				var lastPoint = _PointLocationArr[lastPointIndex];
				cxt.beginPath();
				cxt.moveTo(lastPoint.X, lastPoint.Y);
				cxt.lineTo(touchPoint.X, touchPoint.Y);
				cxt.stroke();
				cxt.closePath();
			}
		}
		$(".dot").removeClass("on");
		for(var i = 0; i < _PointLocationArr.length; i++) {
			var Point = _PointLocationArr[i];
			cxt.fillStyle = g.borderCircleColor; //边框颜色
			cxt.beginPath();
			cxt.arc(Point.X, Point.Y, R, 0, Math.PI * 2, true);
			cxt.closePath();
			cxt.fill();
			cxt.fillStyle = g.bgCircleColor; //内部填充颜色
			cxt.beginPath();
			cxt.arc(Point.X, Point.Y, R-1, 0, Math.PI * 2, true);
			cxt.closePath();
			cxt.fill();
			cxt.fillStyle = g.centerCircleColor; //中心点的颜色
			cxt.beginPath();
			cxt.arc(Point.X, Point.Y, R - 16, 0, Math.PI * 2, true);
			cxt.closePath();
			cxt.fill();
			if(_LinePointArr.indexOf(i) >= 0) {
				$(".dot-"+i).addClass("on");
				cxt.fillStyle = g.activeCircleColor; //选中点的颜色
				cxt.beginPath();
				cxt.arc(Point.X, Point.Y, R, 0, Math.PI * 2, true);
				cxt.closePath();
				cxt.fill();

			}

		}
	}

	g.IsPointSelect = function(touches, LinePoint) {
		for(var i = 0; i < PointLocationArr.length; i++) {
			var currentPoint = PointLocationArr[i];
			var xdiff = Math.abs(currentPoint.X - touches.pageX);
			var ydiff = Math.abs(currentPoint.Y - (touches.pageY - CT));
			var dir = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
			if(dir < R) {
				if(LinePoint.indexOf(i) < 0) {
					LinePoint.push(i);
				}
				break;
			}
		}
	}
	//初始化事件
	g.InitEvent = function(canvasContainer, cxt) {
		var LinePoint = [];
		canvasContainer.addEventListener("touchstart", function(e) {
			g.IsPointSelect(e.touches[0], LinePoint);
		}, false);
		canvasContainer.addEventListener("touchmove", function(e) {
			e.preventDefault();
			var touches = e.touches[0];
			g.IsPointSelect(touches, LinePoint);
			cxt.clearRect(0, 0, CW, CH);
			g.Draw(cxt, PointLocationArr, LinePoint, {
				X: touches.pageX,
				Y: touches.pageY - CT
			});
			//document.getElementById("main").style.backgroundColor='rgb('+Math.ceil(Math.random()*255)+','+Math.ceil(Math.random()*255)+','+Math.ceil(Math.random()*255)+')';
		}, false);
		canvasContainer.addEventListener("touchend", function(e) {
			cxt.clearRect(0, 0, CW, CH);
			g.Draw(cxt, PointLocationArr, LinePoint, null);
			if(callback&&typeof(callback)=="function"){
				callback.call(this,LinePoint);
			}
			LinePoint = [];
			cxt.clearRect(0, 0, CW, CH);
			g.Draw(cxt, PointLocationArr, LinePoint, null);
		}, false);
	}
	g.init();
	return g;
}