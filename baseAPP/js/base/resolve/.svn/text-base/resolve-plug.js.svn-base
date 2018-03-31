/*
 * 通过popup方式 打开表单
 * formId 表单id
 * direction 滑出方向
 * delay 延时时间，可不传
 */

function re_popup(formId, direction, delay) {
	re_closePopup();
	if (delay) {
		delay = 100;
	}
	ajax({
		url : getRealPath() + resolve.options.jsonUrl + formId + '.json', // 请求地址
		type : "GET", // 请求方式
		dataType : "json",
		async : false,
		success : function(response) {
			//console.log(response);
			// 此处放成功后执行的代码
			
			dynamicLoadingCSS(getRealPath()+"css/design_css/" + formId + '.css',formId);
			var $html = resolve.bulid_Form(JSON.parse(response));
			var popDiv = document.createElement("div");
			popDiv.className = "re_popup";
			popDiv.style.width = "100%";
			popDiv.style.height = "100%";
			popDiv.style.opacity = "0";
			popDiv.style.zIndex="999";
			// popDiv.style.display = "none";
			popDiv.style.position = "fixed";
			popDiv.style.top = "0px";
			popDiv.style.left = "0px";
			popDiv.style.backgroundColor = "rgba(0,0,0,0.3)";
			popDiv.addEventListener("click", function(e) {
				re_closePopup();
			});

			// addClass($html, "re_popup");
			$html.style.opacity = "0";
			$html.style.height = "auto";
			popDiv.appendChild($html);
			document.body.appendChild(popDiv);
			alphaPlay(popDiv, "show");
			popupShow($html, direction, delay);
		},
		fail : function(status) {
			// 此处放失败后执行的代码
		}
	});
}
/*
 * 关闭popup ，配合popup使用
 */
function re_closePopup() {
	var popups = document.querySelectorAll(".re_popup");
	for (var i = 0; i < popups.length; i++) {

		alphaPlay(popups[i], "hide", function(e) {
			document.body.removeChild(e);
		});

	}
}

function popupShow(elem, direction, delay) {
	elem.style.position = "fixed";
	var w = elem.offsetWidth;
	var h = elem.offsetHeight;
	if ("top" == direction) {
		elem.style.top = "-" + h + "px";
	} else if ("right" == direction) {
		elem.style.right = "-" + w + "px";

	} else if ("left" == direction) {
		elem.style.left = "-" + w + "px";

	} else {
		elem.style.bottom = "-" + h + "px";

	}
	setTimeout(function() {
		elem.style.opacity = "1";
		if ("top" == direction) {
			elem.style.top = "-" + h + "px";

			animate(elem, {
				top : 0
			}, 10, 0.1);

		} else if ("right" == direction) {

			elem.style.right = "-" + w + "px";
			animate(elem, {
				right : 0
			}, 10, 0.1);
		} else if ("left" == direction) {

			elem.style.left = "-" + w + "px";
			animate(elem, {
				left : 0
			}, 10, 0.1);
		} else {

			elem.style.bottom = "-" + h + "px";
			animate(elem, {
				bottom : 0
			}, 10, 0.1);

		}
	}, delay);
}


function animate(obj, json, interval, sp, fn) {
	clearInterval(obj.timer);
	// var k = 0;
	// var j = 0;
	function getStyle(obj, arr) {
		if (obj.currentStyle) {
			return obj.currentStyle[arr]; // 针对ie
		} else {
			return document.defaultView.getComputedStyle(obj, null)[arr];
		}
	}
	if (sp) {
		sp = 0.1;
	}
	obj.timer = setInterval(function() {
		// j ++;
		var flag = true;
		for ( var arr in json) {
			var icur = 0;
			// k++;
			if (arr == "opacity") {
				icur = Math.round(parseFloat(getStyle(obj, arr)) * 100);
			} else {
				icur = parseInt(getStyle(obj, arr));
			}
			var speed = (json[arr] - icur) * sp;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (icur != json[arr]) {
				flag = false;
			}
			if (arr == "opacity") {
				obj.style.filter = "alpha(opacity : '+(icur + speed)+' )";
				obj.style.opacity = (icur + speed) / 100;
			} else {
				obj.style[arr] = icur + speed + "px";
			}
			// console.log(j + "," + arr +":"+ flag);
		}

		if (flag) {
			clearInterval(obj.timer);
			// console.log(j + ":" + flag);
			// console.log("k = " + k);
			// console.log("j = " + j);
			// console.log("DONE");
			if (fn) {
				fn();
			}
		}
	}, interval);
}

// 渐隐渐显
function alphaPlay(obj, method, fn) { // method有两个值show或hiden
	var n = (method == "show") ? 0 : 100, ie = (window.ActiveXObject) ? true
			: false;
	var time = setInterval(function() {
		if (method == "show") {
			if (n < 100) {
				n += 10;
				if (ie) {
					obj.style.cssText = "filter:alpha(opacity=" + n + ")";
				} else {
					(n == 100) ? obj.style.opacity = 1
							: obj.style.opacity = "0." + n;
				}
			} else {
				clearTimeout(time);
				if (fn) {
					fn(obj);
				}
			}
		} else {
			if (n > 0) {
				n -= 10;
				if (ie) {
					obj.style.cssText = "filter:alpha(opacity=" + n + ")";
				} else {
					obj.style.opacity = "0." + n;
				}
			} else {
				clearTimeout(time);
				if (fn) {
					fn(obj);
				}
			}
		}
	}, 30);
}

function dynamicLoadingCSS(path, identification) {

	if (!path || path.length === 0) {
		throw new Error('argument "path" is required !');
	}

	if (identification) {
		var head = document.getElementsByTagName('head')[0];
		identification = "css_" + identification;
		var arr = document.querySelectorAll("#" + identification);
		for (var i = 0; i < arr.length; i++) {
			head.removeChild(arr[i]);
		}
		var link = document.createElement('link');
		link.href = path;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.setAttribute("id", identification);
		head.appendChild(link);
	}
}



//完整日期视图(年月日时分)
function getDatetime(_self){
	getDtpicker(_self,{type:"datetime"});
}
//年视图(年月日)
function getDate(_self){
	getDtpicker(_self,{type:"date"});
}
//时间视图(时分)
function getTime(_self){
	getDtpicker(_self,{type:"time"});
}
//月视图(年月)
function getMonth(_self){
	getDtpicker(_self,{type:"month"});
}
//时视图(年月日时)
function getHour(_self){
	getDtpicker(_self,{type:"hour"});
}
/*封装MUIDTpicker方法*/
function getDtpicker(_self,options){
	var opt = options||{};
	if(_self.picker) {
		_self.picker.show(function (rs) {
			_self.value = rs.text;
			_self.picker.dispose();
			_self.picker = null;
		});
	} else {
		_self.picker = new mui.DtPicker(opt);
		_self.picker.show(function(rs) {
			_self.value = rs.text;
			_self.picker.dispose();
			_self.picker = null;
		});
	}
}

/**
 * 打开城市选择器
 * @param _self 被初始化的dom对象
 * @returns
 */
function getCity(_self){
	if(!_self.cityPicker) {
		mui(_self).cityPicker();
	}
	_self.cityPicker.show();
}
/**
 * 打开带回调函数的城市选择器
 * @param _self 被初始化的dom对象
 * @param callback 
 * 可以传入selector选择器，给对应dom对象赋值（地区编码），
 * 或传入回调函数，并返回一个参数，picker对象
 * getCity(dom,test);
 * 
 * function test(p){
 *	 console.log(p.name);//当前节点name
 *	 console.log(p.names);//返回父子节点所有name属性（数组）
 *	 console.log(p.value);//当前节点value
 *	 console.log(p.values);//返回父子节点所有value属性（数组）
 * }
 * @returns
 */

function getCity(_self,callback){
	if(!_self.cityPicker) {
		if(typeof(callback)=="function"){
			mui(_self).cityPicker({
				callback: function(p) {
					callback.call(this,p);
					console.log(p.name,p.names,p.value,p.values);
				}
			});
		}else if(typeof(callback)=="string"){
			mui(_self).cityPicker({
				callback: function(p) {
					mui(callback)[0].value=p.values.join(",");
				}
			});
		}else{
			mui(_self).cityPicker();
		}
		
		
	}
	_self.cityPicker.show();
}


/***
 * 水波纹
 */
;!(function(win,doc){
    "use strict";

    if (typeof Ripple === "undefined" || !Ripple) {

        var Ripple = function(option){
            //缺省配置
            var config = {
                opacity : 0.5, //水波纹透明度
                speed : 0.6,   //水波纹扩散速度
                bgColor : "#ffffff",  //水波纹颜色
                cursor : true       //是否显示手型指针
            }
            //扩展配置
            this.option = this.extend(option,config);
            //小于ie9版本不给运行
            if(!this.isltIE9())  this.init();

        };
    }

    Ripple.prototype = {

        //创建标签
        createEle : function(tag){
            return doc.createElement(tag);
        },

        //扩展配置
        extend : function(obj,config){
            var newobj = JSON.parse(JSON.stringify(config));
            for(var i in obj){
              newobj[i] = obj[i];
            }
            return newobj;
        }, 
        //判断是否ie9及以下版本
        isltIE9 : function(){
            var iev = navigator.userAgent.split(";")[1].replace(/[ ]/g,"");
            if(/MSIE6.0|MSIE7.0|MSIE8.0|MSIE9.0/i.test(iev)){
                return true
            } else {
                return false
            }       
        },

        //获取当前点对象的位置等信息
        getPosition : function(e) {
            var pos = this.getBoundingClientRect()
            , range = Math.max(pos.width, pos.height);
            return {
                range: range,
                x: e.clientX - pos.left - range / 2,
                y: e.clientY - pos.top - range / 2                
            }
        },
        //载入样式
        loadCss : function(){
            //获取当前脚本的路径
            var jss = doc.scripts
            , jsPath = jss[jss.length - 1].src
            , path = jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
            //载入CSS
            doc.head.appendChild(function(){
                var link = doc.createElement('link');
                link.href = path + 'ripple.css';
                link.type = 'text/css';
                link.rel = 'styleSheet'
                link.id = 'ripplecss';
                return link;
            }());
        },
        //添加事件
        addEvent : function(){

            var _this =  this;
            //添加事件
            for(var i = 0; i < this.elements.length; i++){

                if(typeof _this.option.cursor === "boolean"){
                    if(_this.option.cursor){
                        this.elements[i].style.cursor = "pointer";  
                    }
                }         
					/*this.elements[i].addEventListener("tap",function(e){       
				        
				        e.stopPropagation();
				
				        var position = _this.getPosition.call(this,e)
				        , span = doc.createElement("span");
				        span.className = 'ripple';
				        span.style.top = position.y+"px";
				        span.style.left = position.x+"px";
				        span.style.width = position.range+"px";
				        span.style.height = position.range+"px";
				        span.style.animationDuration = _this.option.speed+"s";
				        span.style.background = _this.option.bgColor;
				        span.style.opacity = _this.option.opacity;         
				
				        //动画完成后删除节点
				        span.addEventListener("animationend",function(){
				            this.parentNode.removeChild(this);
				        },false);
				        //插入水波纹节点
				        this.appendChild(span)
				
				    });*/
					this.elements[i].addEventListener("click",function(e){       
				    	
				    	e.stopPropagation();
				    	
				    	var position = _this.getPosition.call(this,e)
				    	, span = doc.createElement("span");
				    	span.className = 'ripple';
				    	span.style.top = position.y+"px";
				    	span.style.left = position.x+"px";
				    	span.style.width = position.range+"px";
				    	span.style.height = position.range+"px";
				    	span.style.animationDuration = _this.option.speed+"s";
				    	span.style.background = _this.option.bgColor;
				    	span.style.opacity = _this.option.opacity;         
				    	
				    	//动画完成后删除节点
				    	span.addEventListener("animationend",function(){
				    		this.parentNode.removeChild(this);
				    	},false);
				    	//插入水波纹节点
				    	this.appendChild(span)
				    	
				    });
            }
        }
    }

    Ripple.prototype.init = function(){
        //载入css
        //this.loadCss();
        var _this = this;
        //初始化
            _this.elements = doc.querySelectorAll('[data-ripple="ripple"]');
            _this.addEvent();
    }

    win.Ripple = Ripple;

})(window,document)