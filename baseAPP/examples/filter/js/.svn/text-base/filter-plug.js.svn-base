/***
 * 侧滑筛选窗口配置
 * 需要mui.js支持
 * 使用方法：在所需页面引入此js，必须先执行init初始化方法后,才能构建窗口
 */
/***
 * 调用方法如下:
 * filterPlug.init();//该方法为初始化方法,必须在页面加载时调用,用来初始化mui
 * filterPlug.create(data,callback);//该方法为窗口构建方法
 * 	@param {Object} data 需要展现的数据源
 * 	@param {Object} callback 回调函数,内置参数类型为数组
 * 	demo:
 * 		filterPlug.create(data,function(array){});
 * filterPlug.open();//打开侧滑窗口
 * filterPlug.close();//关闭侧滑窗口
 */
var filterPlug = {
	offCanvasWrapper:null,
	init:function(){
		mui.init();
		//侧滑容器父节点
		this.offCanvasWrapper = mui('#offCanvasWrapper');
		//主界面和侧滑菜单界面均支持区域滚动；
		//TODO
//		//主界面容器
		var offCanvasInner = this.offCanvasWrapper[0].querySelector('.mui-inner-wrap');
		//菜单容器
		var offCanvasSide = document.getElementById("offCanvasSide");
		//侧滑容器的class列表，增加.mui-slide-in即可实现菜单移动、主界面不动的效果；
		var classList = this.offCanvasWrapper[0].classList;
		classList.add('mui-slide-in');
		/*禁止拖动*/
		offCanvasInner.addEventListener('drag', function(event) {
			event.stopPropagation();
		});
 		//主界面和侧滑菜单界面均支持区域滚动；
		mui('#offCanvasSideScroll').scroll();
		mui('#offCanvasContentScroll').scroll();
		//实现ios平台的侧滑关闭页面；
		if(mui.os.plus && mui.os.ios) {
			this.offCanvasWrapper[0].addEventListener('shown', function(e) { //菜单显示完成事件
				plus.webview.currentWebview().setStyle({
					'popGesture': 'none'
				});
			});
			this.offCanvasWrapper[0].addEventListener('hidden', function(e) { //菜单关闭完成事件
				plus.webview.currentWebview().setStyle({
					'popGesture': 'close'
				});
			});
		}
	},
	create:function(data,callback){
		var _self = this;
		/*确定事件*/
		document.getElementById('offCanvasSubmit').addEventListener('tap', function() {
			//确定返回json结构
			var jsonArray = doSubmit();			
			_self.close();
			callback(jsonArray);
		});
		/*重置事件*/
		document.getElementById('offCanvasReset').addEventListener('tap', function() {
			var contents = mui(".screen-content .active");
			for(var i=0;i<contents.length;i++){
				contents[i].classList.remove("active");
			}
			var checks = mui(".mui-table-view[type='checkAll'] .part-val");
			for(var i=0;i<checks.length;i++){
				checks[i].innerHTML = "";
				checks[i].removeAttribute("name");
			}
		});
		_self.createFilter(data);
	},
	createFilter:function(data){
		for(let i in data) {
			var _ul = document.createElement("ul");
			_ul.className = "mui-table-view";
			_ul.setAttribute("type",data[i].collapse);
			_ul.setAttribute("name",data[i].field);
			mui(".mui-content")[0].appendChild(_ul);
			var _li = document.createElement("li");
			_ul.appendChild(_li);
			var _a = document.createElement("a");
			_a.innerHTML = data[i].groupName;
			var _div = document.createElement("div");
			_div.className = "mui-collapse-content";
			_li.appendChild(_a);
			_li.appendChild(_div);
			if("no" == data[i].collapse) {
				_li.className = "mui-table-view-cell";
				_a.className = "navigate-title";
			} else if("part" == data[i].collapse) {
				_li.className = "mui-table-view-cell mui-collapse";
				_a.className = "mui-navigate-right navigate-title";
				_div.className = "mui-collapse-content screen-part";
				var _span = document.createElement("span");
				_span.innerHTML = "全部";
				_span.className = "part-title";
				_li.appendChild(_span);
			} else if("all" == data[i].collapse) {
				_li.className = "mui-table-view-cell mui-collapse";
				_a.className = "mui-navigate-right navigate-title";
			} else if("checkAll" == data[i].collapse) {
				_li.className = "mui-table-view-cell";
				_a.className = "navigate-title";
				var _checkImg = document.createElement("i");
				_checkImg.className = "check-img mui-icon mui-icon-arrowright";
				_li.appendChild(_checkImg);
				var _spanVal = document.createElement("span");
				_spanVal.innerHTML = checkAllVal;
				_spanVal.className = "part-val";
				_li.appendChild(_spanVal);
				_a.addEventListener('tap', function() {
					if(mui("#"+data[i].field).length>0){
						mui("#"+data[i].field)[0].style.transform = "translate3d(0px, 0px, 0px)";
						mui("#"+data[i].field)[0].style.visibility = "visible";
						var classL = mui("#"+data[i].field)[0].classList;
						classL.add('mui-active');
						return;
					}
				});
				
				var offCanvasSide = document.getElementById("offCanvasSide");
				var _aside = document.createElement("aside");
				_aside.className = "side-custom mui-off-canvas-right mui-transitioning";
				_aside.setAttribute("id",data[i].field);
				//_aside.innerHTML = "<div class=\"mui-content\"></div><p style=\"margin: 10px 15px;\"><button id=\"offCanvasHideCustom\" type=\"button\" class=\"mui-btn mui-btn-danger mui-btn-block\" style=\"padding: 5px 20px;\">关闭侧滑菜单</button></p>";
				_aside.innerHTML = "<div class=\"mui-content\"></div>";
				offCanvasSide.appendChild(_aside);
				var _top = mui("#"+data[i].field+" .mui-content")[0];
				var _tul = document.createElement("ul");
				_tul.className = "mui-table-view";
				_tul.innerHTML = "<li class=\"mui-table-view-cell tree-li-title\"><i class=\"mui-icon mui-icon-arrowleft\" style=\"position: absolute;left: 8px;\"></i><a class=\"navigate-title\" style=\"text-align: center;pointer-events: none;\">"+data[i].groupName+"</a></li>";
				_top.appendChild(_tul);
				mui(".tree-li-title i")[0].addEventListener('tap', function() {
					offCanvasHideCustom(data[i].field);
				});
				var items = data[i].data;
				getTreeAll(data[i].field,_top,items);
				continue;
			}
			var _sc = document.createElement("div");
			if("single" == data[i].type) {
				_sc.className = "screen-content screen-single";
			} else if("multiple" == data[i].type) {
				_sc.className = "screen-content";
			}
			_sc.setAttribute("name", "screen-content");
			_div.appendChild(_sc);

			var items = data[i].data;
			for(var t in items) {
				var _item = document.createElement("div");
				_item.setAttribute("name", items[t].value);
				var _i = document.createElement("i");
				_item.innerHTML = items[t].text;
				_item.appendChild(_i);
				if(items[t].selected) {
					_item.className = "active";
				}
				/*添加选中事件*/
				_item.addEventListener('tap', function() {
					if(this.className == "active") {
						this.className = "";
					} else {
						if(this.parentNode.className.indexOf("screen-single") != -1) {
							var arr = this.parentNode.children;
							for(var r = 0; r < arr.length; r++) {
								arr[r].removeAttribute("class");
							}
						}
						this.className = "active";
					}
				});
				_sc.appendChild(_item);
			}
		}
	},
	open:function(){
		this.offCanvasWrapper.offCanvas('show');
	},
	close:function(){
		this.offCanvasWrapper.offCanvas('close');
	}
};

/*确定并返回json数组*/
function doSubmit(){
	var jsonArray = [];
	var list = mui("#offCanvasSide>#offCanvasSideScroll>.mui-scroll>.mui-content>.mui-table-view");
	for(var i=0;i<list.length;i++){
		var type = list[i].getAttribute("type");
		var name = list[i].getAttribute("name");
		var value;
		if(type=="checkAll"){
			value = list[i].children[0].children[3].getAttribute("name");
			if(value){
				var obj = {
					text:name,
					value:value,
					type:"tree"
				};
				jsonArray.push(obj);
			}
		}else{
			var cdata = list[i].children[0].children[1].children[0].children;
			for(var d=0;d<cdata.length;d++){
				if(cdata[d].classList.contains("active")){
					value = cdata[d].getAttribute("name");
					if(value){
						var obj = {
							text:name,
							value:value,
							type:"normal"
						};
						jsonArray.push(obj);
					}
				}
			}
		}
	}
	return jsonArray;
}

/*关闭自定义第二层侧滑窗口*/
function offCanvasHideCustom(id){
	var _tmp = document.getElementById(id)
	_tmp.style.transform = "";
	_tmp.style.visibility = "visible";
	var classList = _tmp.classList;
	classList.remove('mui-active');
}

/*获取自定义树形结构start*/
function getTreeAll(id,_top,items){
	for(var t in items) {
		var _ul = document.createElement("ul");
		_ul.className = "mui-table-view side-checkAll-ul";
		var _li = document.createElement("li");
		_li.className = "mui-table-view-cell mui-collapse";
		var _a = document.createElement("a");
		_a.innerHTML = items[t].text;
		_a.setAttribute("name",items[t].value);
		var _div = document.createElement("div");
		_div.className = "mui-collapse-content";
		_div.style.background = "rgba(247, 247, 247, 1)";
		var _i = document.createElement("i");
		_i.className = "navigate-img";
		if(items[t].children&&items[t].children.length>0){
			_a.className = "mui-navigate-right navigate-title";
			var num = 1;
			getTreeChild(id,_div,items[t].children,num);
		}else{
			_a.className = "navigate-title";
			_a.addEventListener("tap",function(){
				activeCheckAll(this,id);
			});
		}
		_li.appendChild(_a);
		_li.appendChild(_i);
		_li.appendChild(_div);
		_ul.appendChild(_li);
		_top.appendChild(_ul);
	}
}
function getTreeChild(id,_cdiv,items,num){
	num += 1;
	var paddinfLeft = 15*num;
	var bgc = 255-8*num;
	var color = "rgba("+bgc+", "+bgc+", "+bgc+", 1)";
	for(var t in items) {
		var _ul = document.createElement("ul");
		_ul.className = "mui-table-view";
		var _li = document.createElement("li");
		_li.className = "mui-table-view-cell mui-collapse";
		var _a = document.createElement("a");
		_a.innerHTML = items[t].text;
		_a.setAttribute("name",items[t].value);
		_a.style.paddingLeft = paddinfLeft+"px";
		var _div = document.createElement("div");
		_div.className = "mui-collapse-content";
		_div.style.background = color;
		var _i = document.createElement("i");
		_i.className = "navigate-img";
		if(items[t].children&&items[t].children.length>0){
			_a.className = "mui-navigate-right navigate-title";
			getTreeChild(id,_div,items[t].children,num);
		}else{
			_a.className = "navigate-title";
			_a.addEventListener("tap",function(){
				activeCheckAll(this,id);
			});
		}
		_li.appendChild(_a);
		_li.appendChild(_i);
		_li.appendChild(_div);
		_ul.appendChild(_li);
		_cdiv.appendChild(_ul);
	}
}
/*获取自定义树形结构end*/

/*自定义侧滑窗口选中start*/
function activeCheckAll(item,id){
	var list = mui("#"+id+" .mui-table-view-cell.active");
	for(var i=0;i<list.length;i++){
		if(list[i].classList.contains("active")){
			list[i].classList.remove("active");
		}
	}
	checkAllVal = item.innerHTML;
	checkAllRealVal = item.getAttribute("name");
	var classL = item.parentNode.classList;
	classL.add('active');
	getParentNodeVal(item.parentNode);
	mui(".part-val")[0].innerHTML = checkAllVal;
	mui(".part-val")[0].setAttribute("name",checkAllRealVal);
	mui(".part-val")[0].style.display = "block";
	offCanvasHideCustom(id);
}
var checkAllVal = "";
var checkAllRealVal = "";
function getParentNodeVal(item){
	if(item.className.indexOf("side-checkAll-ul")!=-1){
		return;
	}
	if(item.parentNode.className.indexOf("mui-table-view-cell mui-collapse")!=-1){
		if(checkAllVal==""){
			checkAllVal = item.parentNode.children[0].innerHTML;
			checkAllRealVal = item.parentNode.children[0].getAttribute("name");
		}else{
			checkAllVal = item.parentNode.children[0].innerHTML+"/"+checkAllVal;
			checkAllRealVal = item.parentNode.children[0].getAttribute("name")+"/"+checkAllRealVal;
		}
	}
	getParentNodeVal(item.parentNode);
}
/*自定义侧滑窗口选中end*/

/***********公共工具方法***********/
/*↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓*/

// 封装异步请求方法
function ajax(options) {
	options = options || {};
	options.type = (options.type || "GET").toUpperCase();
	options.dataType = options.dataType || "json";
	options.async = options.async || true;
	var params = formatParams(options.data);

	// 创建 - 非IE6 - 第一步
	if(window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	} else { // IE6及其以下版本浏览器
		var xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	// 接收 - 第三步
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			var status = xhr.status;
			if((status >= 200 && status < 300) || status == 0) {
				options.success &&
					options.success(xhr.responseText, xhr.responseXML);
			} else {
				options.fail && options.fail(status);
			}
		}
	}

	// 连接 和 发送 - 第二步
	if(options.type == "GET") {
		xhr.open("GET", options.url + "?" + params, options.async);
		xhr.send(null);
	} else if(options.type == "POST") {
		xhr.open("POST", options.url, options.async);
		// 设置表单提交时的内容类型
		xhr.setRequestHeader("Content-Type",
			"application/x-www-form-urlencoded");
		xhr.send(params);
	}
}
// 格式化参数
function formatParams(data) {
	var arr = [];
	for(var name in data) {
		arr.push(encodeURIComponent(name) + "=" +
			encodeURIComponent(data[name]));
	}
	arr.push(("v=" + Math.random()).replace(".", ""));
	return arr.join("&");
}
//获取项目根目录
function getRealPath() {
	var curWwwPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName);
	var localhostPaht = curWwwPath.substring(0, pos);
	var projectName = "";
	//
	if(pathName.substr(1).indexOf('www/') == -1) {
		projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1) + "/";
	} else {
		projectName = pathName.substring(0, pathName.substr(1).indexOf('www/') + 4) + "/";

	}
	var realPath = localhostPaht + projectName;
	return realPath;
}