var resolve = {
	options : {
		jsonUrl : 'jsonData/',// json文件目录
		optionsPath:getRealPath() + "design/resolve/optionsJson.json",//选项配置文件或者是获取选项的url地址
		DISPLAY_TYPE_FLEX : 'display:flex;',
		ROW_STYLE : 'min-height: 50px;',
		colGrid : "1|2|3|4",
		scrollFlag : false
	},
	getHtml : function(formId, elem, callback) {
		var _self = this;
		ajax({
			url : getRealPath() + _self.options.jsonUrl + formId + '.json', // 请求地址
			type : "GET", // 请求方式
			dataType : "json",
			async : false,
			success : function(response) {
				// 此处放成功后执行的代码
				var $html = _self.bulid_Form(JSON.parse(response));
				if (typeof (elem) == "object") {
					elem.innerHTML = "";
					elem.appendChild($html);
				} else if (elem && elem.length > 0) {
					var _elem = document.querySelectorAll(elem);
					_elem[0].innerHTML = "";
					_elem[0].appendChild($html);
				}
				if (callback && typeof (callback) == "function") {
					callback.call(this, $html);
				}
				if (_self.options.scrollFlag) {
					mui('.panel-scroll .mui-scroll-wrapper').scroll({
						deceleration : 0.0005,// 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
						bounce : true,
						indicators : false// 是否显示滚动条
					});
				}
				if (window.Ripple) {
					new Ripple({
						opacity : 0.6, // 水波纹透明度
						speed : 0.5, // 水波纹扩散速度
						bgColor : "#ddd", // 水波纹颜色
						cursor : false
					// 是否显示手型指针
					});
				}
			},
			fail : function(status) {
				// 此处放失败后执行的代码
			}
		});
	},
	getHtmlVal : function(formId, elem, callback, data) {
		getRealPath();
		var _self = this;
		var $html;
		// $.ajaxSettings.async = false;

		ajax({
			url : getRealPath() + _self.options.jsonUrl + formId + '.json', // 请求地址
			type : "GET", // 请求方式
			async : false,
			dataType : "json",
			success : function(response) {
				var jsonVal = assignment.getJSONValue(JSON.parse(response),
						data);
				// 此处放成功后执行的代码
				var $html = _self.bulid_Form(jsonVal);
				if (typeof (elem) == "object") {
					elem.innerHTML = "";
					elem.appendChild($html);
				} else if (elem && elem.length > 0) {
					var _elem = document.querySelectorAll(elem);
					_elem[0].innerHTML = "";
					_elem[0].appendChild($html);
				}
				if (callback && typeof (callback) == "function") {
					callback.call(this, $html);

				}
				if (_self.options.scrollFlag) {
					console.log("初始化滚动加载！")
					mui('.panel-scroll .mui-scroll-wrapper').scroll({
						deceleration : 0.0005, // flick
												// 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
						bounce : true,
						indicators : false
					// 是否显示滚动条
					});
				}
				if (window.Ripple) {
					console.log("初始化水波纹！")
					new Ripple({
						opacity : 0.6, // 水波纹透明度
						speed : 0.5, // 水波纹扩散速度
						bgColor : "#ddd", // 水波纹颜色
						cursor : false
					// 是否显示手型指针
					});
				}
			},
			fail : function(status) {
				// 此处放失败后执行的代码
			}
		});

	},
	bulid_Form : function(formData) {
		var _self = this;
		var panels = formData.panels;
		var hidetags = formData.hidden;
		if (panels.legth == 0)
			return;
		var _formDiv = document.createElement("div");
		_formDiv.className = "mui-content";
		_formDiv.style.width = "100%";
		for (var i = 0; i < panels.length; i++) {
			_formDiv.appendChild(_self.bulid_Panel(panels[i]))
		}
		if (hidetags) {
			for (var i = 0; i < hidetags.length; i++) {
				_formDiv.appendChild(_self.bulid_Hidden(hidetags[i]))
			}
		}
		return _formDiv;
	},
	bulid_Hidden : function(tag) {
		var _self = this;
		var panels = formData.panels;
		var hidetags = formData.hidden;
		if (panels.legth == 0)
			return;
		var _formDiv = document.createElement("div");
		_formDiv.className = "mui-content";
		_formDiv.style.width = "100%";
		for (var i = 0; i < panels.length; i++) {
			_formDiv.appendChild(_self.bulid_Panel(panels[i]))
		}
		if (hidetags) {

			for (var i = 0; i < hidetags.length; i++) {
				_formDiv.appendChild(_self.bulid_Hidden(hidetags[i]))
			}
		}
		return _formDiv;
	},
	bulid_Panel : function(panel) {
		var _self = this;

		var cols = panel.cols;
		var _panelDiv = document.createElement("div");

		if ("input" == _self.jsonGetVal(panel, "uiType")) {
			_self.inputGroupTag(_panelDiv, panel);
		} else if ("select" == _self.jsonGetVal(panel, "uiType")) {
			_self.selectGroupTag(_panelDiv, panel);
		} else if ("checkbox" == _self.jsonGetVal(panel, "uiType")) {
			_self.checkboxGroupTag(_panelDiv, panel);
		} else if (_self.jsonGetVal(panel, "scroll") == "true") {
			_self.options.scrollFlag = true;
			_panelDiv.className = "panel-auto "
					+ _self.jsonGetVal(panel, "domClass");
			addClass(_panelDiv, "panel-" + panel["deep"] + "_" + panel["index"]);
			addClass(_panelDiv, "panel-scroll");
			_panelDiv.setAttribute("onclick", _self
					.jsonGetVal(panel, "onclick"));
			var wrapper = document.createElement("div");
			addClass(wrapper, 'mui-scroll-wrapper');
			var scroll = document.createElement("div");
			wrapper.appendChild(scroll);
			addClass(scroll, "mui-scroll");
			for (var i = 0; i < cols.length; i++) {
				scroll.appendChild(_self.bulid_Col(cols[i], panel.type));
			}
			_panelDiv.setAttribute("style", _self.jsonGetVal(panel, "animate"));
			_panelDiv.appendChild(wrapper);
		} else {

			if (panel.type == "card") {
				_panelDiv.className = "mui-card  panel-auto "
						+ _self.jsonGetVal(panel, "domClass");
			} else if (panel.type == "form") {
				_panelDiv.className = "mui-input-group panel-auto "
						+ _self.jsonGetVal(panel, "domClass");
			} else {
				_panelDiv.className = "panel-auto "
						+ _self.jsonGetVal(panel, "domClass");
			}
			addClass(_panelDiv, "panel-" + panel["deep"] + "_" + panel["index"]);
			_panelDiv.setAttribute("onclick", _self
					.jsonGetVal(panel, "onclick"));
			if (_self.jsonGetVal(panel, "ripple") == "true") {
				_panelDiv.setAttribute("data-ripple", "ripple");
			}
			_panelDiv.setAttribute("style", _self.jsonGetVal(panel, "animate"));
			for (var i = 0; i < cols.length; i++) {
				_panelDiv.appendChild(_self.bulid_Col(cols[i], panel.type));
			}
		}
		return _panelDiv;
	},
	bulid_Col : function(col, type) {
		var _self = this;
		var panels = col.panels || [];
		var tags = col.tags || [];
		var _colDiv = document.createElement("div");
		addClass(_colDiv, "col-auto");
		addClass(_colDiv, "col-" + col["deep"]);
		_colDiv.style.width = col.col + "%";
		for (var i = 0; i < panels.length; i++) {
			_colDiv.appendChild(_self.bulid_Panel(panels[i]))
		}
		for (var i = 0; i < tags.length; i++) {
			_colDiv.appendChild(_self.bulid_Tag(tags[i]))
		}
		return _colDiv;

	},
	bulid_Tag : function(tag) {
		var _self = this;
		var $tag;
		switch (tag.tagType.toLowerCase()) {
		case "textlabel":
			$tag = _self.textLabel(tag);
			break;
		case "icon":
			$tag = _self.icon(tag);
			break;
		case "text":
			$tag = _self.text(tag);
			break;
		case "image":
			$tag = _self.image(tag);
			break;
		case "label":
			$tag = _self.label(tag);
			break;
		case "select":
			$tag = _self.select(tag);
			break;
		case "switch":
			$tag = _self.switchTag(tag);
			break;
		case "slider":
			$tag = _self.slider(tag);
			break;
		case "textarea":
			$tag = _self.textarea(tag);
			break;
		case "textarealabel":
			$tag = _self.textareaLabel(tag);
			break;
		case "selectlabel":
			$tag = _self.selectLabel(tag);
			break;
		case "button":
			$tag = _self.button(tag);
			break;
		case "checkbox":
			$tag = _self.checkbox(tag);
			break;
		case "radio":
			$tag = _self.radio(tag);
			break;
		case "line":
			$tag = _self.line(tag);
			break;
		case "title":
			$tag = _self.title(tag);
			break;
		default:
			$tag = document.createElement("div");
			$tag.innerHTML = "未匹配到对应标签";
			break;
		}
		_self.setDomAttr(tag, $tag);
		return $tag;
	},
	bulid_Hidden : function(tag) {
		var _self = this;
		var $tag = _self.hidden(tag);
		return $tag;
	},
	jsonGetVal : function(data, key, initVal) {
		var val = "";
		if (data[key] && data[key] != "false") {
			val = data[key];
		} else if (initVal) {
			val = initVal;
		}
		return val;
	},
	createCustomOpt : function(select, param) {
		var $tempOption = document.createElement("option");
		$tempOption.value = "";
		$tempOption.innerHTML = "请选择";
		select.appendChild($tempOption);
		if (param.indexOf("|") > -1 && param.indexOf("-") > -1) {
			var arr = param.split("|");
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].indexOf("-") == -1)
					continue;

				var $option = document.createElement("option");
				$option.value = arr[i].split("-")[1];
				$option.innerHTML = arr[i].split("-")[0];
				select.appendChild($option);
			}
		}
	},
	createParmkeyOpt : function(select, param) {
		var _self = this;
		if(!param)return;
		var $tempOption = document.createElement("option");
		$tempOption.value = "";
		$tempOption.innerHTML = "请选择";
		select.appendChild($tempOption);
		ajax({
			url : _self.options.optionsPath, // 请求地址
			type : "GET", // 请求方式
			dataType : "json",
			data:{
				param:param
			},
			async : false,
			success : function(response) {
				var parmKey = JSON.parse(response);
				var parmDic = parmKey[param];
				if(parmDic&&parmDic.length>0){
					for (var i = 0; i < parmDic.length; i++) {
						var $option = document.createElement("option");
						$option.value =parmDic[i].value;
						$option.innerHTML = parmDic[i].name;
						select.appendChild($option);
					}
				}
			},
			fail : function(status) {
				// 此处放失败后执行的代码
			}
		});
	},
	setDomAttr : function(tag, $tag) {
		var attrs = tag["attribute"];
		try {
			if (attrs && attrs.indexOf(";") > -1) {
				var arr = attrs.split(";");
				for (var i = 0; i < arr.length; i++) {
					var strs = arr[i];
					if (strs.indexOf("-") > -1) {
						var val = strs.split("-");
						$tag.setAttribute(val[0], val[1]);
					}
				}
			} else if (attrs && attrs.indexOf("-") > -1) {
				var val = attrs.split("-");
				$tag.setAttribute(val[0], val[1]);
			}
		} catch (e) {
			console.log("标签属性配置错误！例:key-value;key-value;key-value");
		}

	},
	textLabel : function(tag) {
		var _self = this;
		var $tag = document.createElement("div");
		$tag.className = "mui-input-row";
		var $label = document.createElement("label");
		var $input = document.createElement("input");
		$input.setAttribute("placeholder", "请输入");
		$input.className = "mui-input-clear";
		var $span = document.createElement("span");
		$span.className = "unit";

		$input.setAttribute("name", _self.jsonGetVal(tag, "fieldName"));
		$input.setAttribute("dataType", _self.jsonGetVal(tag, "dataType"));
		$input.setAttribute("type", _self.jsonGetVal(tag, "type"));
		$input.setAttribute("maxlength", _self.jsonGetVal(tag, "maxLength"));
		$input.setAttribute("mustinput", _self.jsonGetVal(tag, "mustInput"));
		if (_self.jsonGetVal(tag, "readonly", false)) {
			$input.setAttribute("readonly", _self.jsonGetVal(tag, "readonly",
					false));
		}
		$input.setAttribute("onblur", _self.jsonGetVal(tag, "onblur"));
		$input.setAttribute("onchange", _self.jsonGetVal(tag, "onchange"));
		$input.setAttribute("onclick", _self.jsonGetVal(tag, "onclick"));
		$input.setAttribute("onfocus", _self.jsonGetVal(tag, "onfocus"));
		$input.setAttribute("onkeyup", _self.jsonGetVal(tag, "onkeyup"));
		$input.setAttribute("onkeydown", _self.jsonGetVal(tag, "onkeydown"));
		$input.setAttribute("onkeypress", _self.jsonGetVal(tag, "onkeypress"));
		$input.setAttribute("title", _self.jsonGetVal(tag, "labelName"));
		$input
				.setAttribute("placeholder", _self.jsonGetVal(tag,
						"placeholder"));

		$span.innerHTML = _self.jsonGetVal(tag, "unit");
		addClass($tag, _self.jsonGetVal(tag, "domClass"));

		$input.value = _self.jsonGetVal(tag, "initValue");
		$label.innerHTML = _self.jsonGetVal(tag, "labelName");
		$tag.appendChild($label);
		$tag.appendChild($input);
		$tag.appendChild($span);
		return $tag;
	},
	icon : function(tag) {
		var _self = this;
		var $tag = document.createElement("i");
		$tag.className = "mui-icon mui-icon-help";
		$tag.setAttribute("onclick", _self.jsonGetVal(tag, "onclick"));
		$tag.setAttribute("class", _self.jsonGetVal(tag, "initValue") + " "
				+ _self.jsonGetVal(tag, "domClass"));
		$tag.setAttribute("style", _self.jsonGetVal(tag, "animate"));
		return $tag;
	},
	text : function(tag) {
		var _self = this;
		var $tag = document.createElement("input");
		$tag.className = "mui-input-clear";
		$tag.setAttribute("placeholder", "请输入");

		$tag.setAttribute("name", _self.jsonGetVal(tag, "fieldName"));
		$tag.setAttribute("dataType", _self.jsonGetVal(tag, "dataType"));
		$tag.setAttribute("type", _self.jsonGetVal(tag, "type"));
		if("number"==_self.jsonGetVal(tag, "type")){
			var num = _self.jsonGetVal(tag, "maxLength");
			$tag.setAttribute("oninput", "if(value.length>"+num+")value=value.slice(0,"+num+")");
		}else{
			$tag.setAttribute("maxlength", _self.jsonGetVal(tag, "maxLength"));
		}
		$tag.setAttribute("mustinput", _self.jsonGetVal(tag, "mustInput"));
		if (_self.jsonGetVal(tag, "readonly", false)) {
			$tag.setAttribute("readonly", _self.jsonGetVal(tag, "readonly",
					false));
		}
		$tag.setAttribute("onblur", _self.jsonGetVal(tag, "onblur"));
		$tag.setAttribute("onchange", _self.jsonGetVal(tag, "onchange"));
		$tag.setAttribute("onclick", _self.jsonGetVal(tag, "onclick"));
		$tag.setAttribute("onfocus", _self.jsonGetVal(tag, "onfocus"));
		$tag.setAttribute("onkeyup", _self.jsonGetVal(tag, "onkeyup"));
		$tag.setAttribute("onkeydown", _self.jsonGetVal(tag, "onkeydown"));
		$tag.setAttribute("onkeypress", _self.jsonGetVal(tag, "onkeypress"));
		$tag.setAttribute("placeholder", _self.jsonGetVal(tag, "placeholder"));
		$tag.setAttribute("style", _self.jsonGetVal(tag, "animate"));
		addClass($tag, _self.jsonGetVal(tag, "domClass"));
		$tag.value = _self.jsonGetVal(tag, "initValue");
		return $tag;
	},
	hidden : function(tag) {
		var _self = this;
		var $tag = document.createElement("input");

		$tag.setAttribute("name", _self.jsonGetVal(tag, "fieldName"));
		$tag.setAttribute("dataType", _self.jsonGetVal(tag, "dataType"));
		$tag.setAttribute("type", "hidden");
		$tag.value = _self.jsonGetVal(tag, "initValue");
		return $tag;
	},
	image : function(tag) {
		var _self = this;
		var $tag = document.createElement("img");
		$tag.setAttribute("onclick", _self.jsonGetVal(tag, "onclick"));
		$tag.setAttribute("src", _self.jsonGetVal(tag, "initValue"));
		$tag.setAttribute("class", _self.jsonGetVal(tag, "domClass"));
		$tag.setAttribute("name", _self.jsonGetVal(tag, "fieldName"));
		$tag.setAttribute("style", _self.jsonGetVal(tag, "animate"));
		return $tag;
	},
	label : function(tag) {
		var _self = this;
		var $tag = document.createElement("label");
		$tag.setAttribute("onclick", _self.jsonGetVal(tag, "onclick"));
		$tag.innerHTML = _self.jsonGetVal(tag, "initValue");
		$tag.setAttribute("class", _self.jsonGetVal(tag, "domClass"));
		$tag.setAttribute("name", _self.jsonGetVal(tag, "fieldName"));
		$tag.setAttribute("style", _self.jsonGetVal(tag, "animate"));
		return $tag;

	},
	select : function(tag) {
		var _self = this;
		var $tag = document.createElement("select");
		$tag.setAttribute("name", _self.jsonGetVal(tag, "fieldName"));
		$tag.setAttribute("dataType", _self.jsonGetVal(tag, "dataType"));
		$tag.setAttribute("mustinput", _self.jsonGetVal(tag, "mustInput"));
		if (_self.jsonGetVal(tag, "readonly", false)) {
			$input.setAttribute("readonly", _self.jsonGetVal(tag, "readonly",
					false));
		}
		$tag.setAttribute("style", _self.jsonGetVal(tag, "animate"));
		$tag.setAttribute("onchange", _self.jsonGetVal(tag, "onchange"));
		$tag.setAttribute("onclick", _self.jsonGetVal(tag, "onclick"));
		addClass($tag, _self.jsonGetVal(tag, "domClass"));

		if (_self.jsonGetVal(tag, "para")) {
			_self.createParmkeyOpt($tag, _self.jsonGetVal(tag, "para"));
		} else if (_self.jsonGetVal(tag, "optionArray")) {
			_self.createCustomOpt($tag, _self.jsonGetVal(tag, "optionArray"));
		} else {
			$tag.innnerHTML = "";
			var $option = document.createElement("option");
			$option.value = "";
			$option.innerHTML = "请选择";
			$tag.appendChild($option);
		}
		$tag.value = _self.jsonGetVal(tag, "initValue");
		return $tag;
	},
	switchTag : function(tag) {
		var _self = this;
		var $tag = document.createElement("div");
		$tag.className = "mui-switch mui-switch-mini";
		var $subtag = document.createElement("div");
		$subtag.className = "mui-switch-handle";
		$tag.appendChild($subtag);

		$tag.setAttribute("name", _self.jsonGetVal(tag, "fieldName"));
		$tag.setAttribute("onclick", _self.jsonGetVal(tag, "onclick"));
		addClass($tag, _self.jsonGetVal(tag, "domClass"));
		$tag.setAttribute("style", _self.jsonGetVal(tag, "animate"));
		if (_self.jsonGetVal(tag, "initValue") == "1") {
			addClass($tag, "mui-active");
		}
		return $tag;
	},
	slider : function(tag) {
		var _self = this;
		var $tag = document.createElement("div");
		return $tag;
	},
	textarea : function(tag) {
		var _self = this;
		var $tag = document.createElement("textarea");
		$tag.setAttribute("name", _self.jsonGetVal(tag, "fieldName"));
		$tag.setAttribute("dataType", _self.jsonGetVal(tag, "dataType"));
		$tag.setAttribute("type", _self.jsonGetVal(tag, "type"));
		$tag.setAttribute("maxlength", _self.jsonGetVal(tag, "maxLength"));
		$tag.setAttribute("mustinput", _self.jsonGetVal(tag, "mustInput"));
		if (_self.jsonGetVal(tag, "readonly", false)) {
			$tag.setAttribute("readonly", _self.jsonGetVal(tag, "readonly",
					false));
		}
		$tag.setAttribute("onblur", _self.jsonGetVal(tag, "onblur"));
		$tag.setAttribute("onchange", _self.jsonGetVal(tag, "onchange"));
		$tag.setAttribute("onclick", _self.jsonGetVal(tag, "onclick"));
		$tag.setAttribute("onfocus", _self.jsonGetVal(tag, "onfocus"));
		$tag.setAttribute("onkeyup", _self.jsonGetVal(tag, "onkeyup"));
		$tag.setAttribute("onkeydown", _self.jsonGetVal(tag, "onkeydown"));
		$tag.setAttribute("onkeypress", _self.jsonGetVal(tag, "onkeypress"));
		$tag.setAttribute("placeholder", _self.jsonGetVal(tag, "placeholder"));
		$tag.setAttribute("style", _self.jsonGetVal(tag, "animate"));
		addClass($tag, _self.jsonGetVal(tag, "domClass"));
		$tag.value = _self.jsonGetVal(tag, "initValue");
		return $tag;
	},
	textareaLabel : function(tag) {
		var _self = this;
		var $tag = document.createElement("div");
		$tag.className = "mui-input-row";
		var $label = document.createElement("label");
		var $input = document.createElement("textarea");

		$input.setAttribute("name", _self.jsonGetVal(tag, "fieldName"));
		$input.setAttribute("dataType", _self.jsonGetVal(tag, "dataType"));
		$input.setAttribute("type", _self.jsonGetVal(tag, "type"));
		$input.setAttribute("maxlength", _self.jsonGetVal(tag, "maxLength"));
		$input.setAttribute("mustinput", _self.jsonGetVal(tag, "mustInput"));
		if (_self.jsonGetVal(tag, "readonly", false)) {
			$input.setAttribute("readonly", _self.jsonGetVal(tag, "readonly",
					false));
		}
		$input.setAttribute("onblur", _self.jsonGetVal(tag, "onblur"));
		$input.setAttribute("onchange", _self.jsonGetVal(tag, "onchange"));
		$input.setAttribute("onclick", _self.jsonGetVal(tag, "onclick"));
		$input.setAttribute("onfocus", _self.jsonGetVal(tag, "onfocus"));
		$input.setAttribute("onkeyup", _self.jsonGetVal(tag, "onkeyup"));
		$input.setAttribute("onkeydown", _self.jsonGetVal(tag, "onkeydown"));
		$input.setAttribute("onkeypress", _self.jsonGetVal(tag, "onkeypress"));
		$input
				.setAttribute("placeholder", _self.jsonGetVal(tag,
						"placeholder"));
		$input.setAttribute("title", _self.jsonGetVal(tag, "labelName"));
		$label.innerHTML = _self.jsonGetVal(tag, "labelName");
		addClass($tag, _self.jsonGetVal(tag, "domClass"));
		$input.value = _self.jsonGetVal(tag, "initValue");
		$tag.appendChild($label);
		$tag.appendChild($input);
		$tag.appendChild($span);
		return $tag;
	},
	selectLabel : function(tag) {
		var _self = this;
		var $tag = document.createElement("div");
		$tag.className = "mui-input-row";

		var $label = document.createElement("label");
		var $input = document.createElement("select");
		var $span = document.createElement("span");
		$span.className = "unit";

		$input.setAttribute("name", _self.jsonGetVal(tag, "fieldName"));
		$input.setAttribute("dataType", _self.jsonGetVal(tag, "dataType"));
		$input.setAttribute("mustinput", _self.jsonGetVal(tag, "mustInput"));
		if (_self.jsonGetVal(tag, "readonly", false)) {
			$input.setAttribute("readonly", _self.jsonGetVal(tag, "readonly",
					false));
		}
		$input.setAttribute("onchange", _self.jsonGetVal(tag, "onchange"));
		$input.setAttribute("onclick", _self.jsonGetVal(tag, "onclick"));

		if (_self.jsonGetVal(tag, "para")) {
			_self.createParmkeyOpt($input, _self.jsonGetVal(tag, "para"));
		} else if (_self.jsonGetVal(tag, "optionArray")) {
			_self.createCustomOpt($input, _self.jsonGetVal(tag, "optionArray"));
		} else {
			$input.innerHTML = "";
			var $option = document.createElement("option");
			$option.value = "";
			$option.innerHTML = "请选择";
			$input.appendChild($option);
		}
		$input.value = _self.jsonGetVal(tag, "initValue");

		$span.innerHTML = _self.jsonGetVal(tag, "unit");
		addClass($tag, _self.jsonGetVal(tag, "domClass"));

		$label.innerHTML = _self.jsonGetVal(tag, "labelName");
		$tag.appendChild($label);
		$tag.appendChild($input);
		$tag.appendChild($span);
		return $tag;
	},
	button : function(tag) {
		var _self = this;
		var $tag = document.createElement("button");
		$tag.setAttribute("type", "button");
		$tag.className = "mui-btn";
		$tag.setAttribute("onclick", _self.jsonGetVal(tag, "onclick"));

		addClass($tag, _self.jsonGetVal(tag, "domClass"));
		if (_self.jsonGetVal(tag, "btnBlock") == "true") {
			addClass($tag, "mui-btn-block");
		}
		if (_self.jsonGetVal(tag, "btnOutlined") == "true") {
			addClass($tag, "mui-btn-outlined");
		}
		$tag.setAttribute("style", _self.jsonGetVal(tag, "animate"));
		addClass($tag, _self.jsonGetVal(tag, "scene"));
		$tag.innerHTML = _self.jsonGetVal(tag, "initValue");
		return $tag;
	},
	checkbox : function(tag) {
		var _self = this;
		var $tag = document.createElement("input");
		$tag.type = "checkbox";

		$tag.setAttribute("name", _self.jsonGetVal(tag, "fieldName"));
		addClass($tag, _self.jsonGetVal(tag, "domClass"));
		$tag.setAttribute("onchange", _self.jsonGetVal(tag, "onchange"));
		$tag.setAttribute("onclick", _self.jsonGetVal(tag, "onclick"));
		if ("true" == _self.jsonGetVal(tag, "para")) {
			$tag.setAttribute("checked", _self.jsonGetVal(tag, "para"));
		}
		$tag.setAttribute("style", _self.jsonGetVal(tag, "animate"));
		$tag.value = _self.jsonGetVal(tag, "initValue");

		return $tag;
	},
	radio : function(tag) {
		var _self = this;
		var $tag = document.createElement("div");
		return $tag;
	},
	line : function(tag) {
		var _self = this;
		var $tag = document.createElement("div");
		addClass($tag, _self.jsonGetVal(tag, "domClass"));
		$tag.setAttribute("style", _self.jsonGetVal(tag, "animate"));
		return $tag;
	},
	title : function(tag) {
		var _self = this;
		var $tag;
		if (_self.jsonGetVal(tag, "tagTitle") == "h1") {
			$tag = document.createElement("h1");
		} else if (_self.jsonGetVal(tag, "tagTitle") == "h2") {
			$tag = document.createElement("h2");
		} else if (_self.jsonGetVal(tag, "tagTitle") == "h3") {
			$tag = document.createElement("h3");
		} else if (_self.jsonGetVal(tag, "tagTitle") == "h4") {
			$tag = document.createElement("h4");
		} else if (_self.jsonGetVal(tag, "tagTitle") == "h5") {
			$tag = document.createElement("h5");
		} else if (_self.jsonGetVal(tag, "tagTitle") == "h6") {
			$tag = document.createElement("h6");
		} else {
			$tag = document.createElement("label");
		}

		$tag.setAttribute("onclick", _self.jsonGetVal(tag, "onclick"));
		$tag.innerHTML = _self.jsonGetVal(tag, "initValue");
		$tag.setAttribute("class", _self.jsonGetVal(tag, "domClass"));
		$tag.setAttribute("name", _self.jsonGetVal(tag, "fieldName"));
		return $tag;

	},
	inputGroupTag : function(elem, panel) {
		var _self = this;

		var cols = panel.cols;
		if (!cols || cols.length == 0 || cols.length != 2) {
			return;
		}

		try {
			var labelTag = cols[0]["tags"][0];
			var inputTag = cols[1]["tags"][0];
			var labelWidth = "width:" + cols[0]["col"] + "%;";
			var inputWidth = "width:" + cols[1]["col"] + "%;";

			var $labelTag = document.createElement("label");
			$labelTag.setAttribute("onclick", _self.jsonGetVal(labelTag,
					"onclick"));
			$labelTag.innerHTML = _self.jsonGetVal(labelTag, "initValue");
			$labelTag.setAttribute("class", _self.jsonGetVal(labelTag,
					"domClass"));
			$labelTag.setAttribute("name", _self.jsonGetVal(labelTag,
					"fieldName"));

			var $inputTag = document.createElement("input");
			$inputTag.className = "mui-input-clear";
			$inputTag.setAttribute("placeholder", "请输入");

			$labelTag.setAttribute("style", _self.jsonGetVal(labelTag,
					"animate"));
			$inputTag.setAttribute("style", _self.jsonGetVal(inputTag,
					"animate"));

			$inputTag.setAttribute("name", _self.jsonGetVal(inputTag,
					"fieldName"));
			$inputTag.setAttribute("dataType", _self.jsonGetVal(inputTag,
					"dataType"));
			$inputTag.setAttribute("type", _self.jsonGetVal(inputTag, "type"));
			
			if("number"==_self.jsonGetVal(inputTag, "type")){
				var num = _self.jsonGetVal(inputTag, "maxLength");
				$inputTag.setAttribute("oninput", "if(value.length>"+num+")value=value.slice(0,"+num+")");
			}else{
				$inputTag.setAttribute("maxlength", _self.jsonGetVal(inputTag, "maxLength"));
			}
			
			$inputTag.setAttribute("maxlength", _self.jsonGetVal(inputTag,
					"maxLength"));
			$inputTag.setAttribute("mustinput", _self.jsonGetVal(inputTag,
					"mustInput"));
			if (_self.jsonGetVal(inputTag, "readonly", false)) {
				$inputTag.setAttribute("readonly", _self.jsonGetVal(inputTag,
						"readonly", false));
			}
			$inputTag.setAttribute("onblur", _self.jsonGetVal(inputTag,
					"onblur"));
			$inputTag.setAttribute("onchange", _self.jsonGetVal(inputTag,
					"onchange"));
			$inputTag.setAttribute("onclick", _self.jsonGetVal(inputTag,
					"onclick"));
			$inputTag.setAttribute("onfocus", _self.jsonGetVal(inputTag,
					"onfocus"));
			$inputTag.setAttribute("onkeyup", _self.jsonGetVal(inputTag,
					"onkeyup"));
			$inputTag.setAttribute("onkeydown", _self.jsonGetVal(inputTag,
					"onkeydown"));
			$inputTag.setAttribute("onkeypress", _self.jsonGetVal(inputTag,
					"onkeypress"));
			$inputTag.setAttribute("placeholder", _self.jsonGetVal(inputTag,
					"placeholder"));

			addClass($inputTag, _self.jsonGetVal(inputTag, "domClass"));
			$inputTag.value = _self.jsonGetVal(inputTag, "initValue");

			var $span = document.createElement("span");
			$span.className = "unit";
			$span.innerHTML = _self.jsonGetVal(inputTag, "unit");

			addClass(elem, "mui-input-row");
			addClass(elem, _self.jsonGetVal(panel, "domClass"));
			_self.setDomAttr(labelTag, $labelTag);
			_self.setDomAttr(inputTag, $inputTag);

			elem.appendChild($labelTag);
			if (cols[0]["tags"].length > 1) {
				for (var i = 1; i < cols[0]["tags"].length; i++) {
					_self.bulid_Tag(cols[0]["tags"][i])
				}
			}
			elem.appendChild($inputTag);
			elem.appendChild($span);
			if (cols[1]["tags"].length > 1) {
				for (var i = 1; i < cols[1]["tags"].length; i++) {
					_self.bulid_Tag(cols[1]["tags"][i])
				}
			}

		} catch (e) {
			console.log(e);
		}

	},
	checkboxGroupTag : function(elem, panel) {
		var _self = this;

		var cols = panel.cols;
		if (!cols || cols.length == 0 || cols.length != 2) {
			return;
		}

		try {

			var labelTag = cols[0]["tags"][0];
			var inputTag = cols[1]["tags"][0];
			var labelWidth = "width:" + cols[0]["col"] + "%;";
			var inputWidth = "width:" + cols[1]["col"] + "%;";

			var $labelTag = document.createElement("label");
			$labelTag.setAttribute("onclick", _self.jsonGetVal(labelTag,
					"onclick"));
			$labelTag.innerHTML = _self.jsonGetVal(labelTag, "initValue");
			$labelTag.setAttribute("class", _self.jsonGetVal(labelTag,
					"domClass"));
			$labelTag.setAttribute("name", _self.jsonGetVal(labelTag,
					"fieldName"));

			// ----------
			var $inputTag = document.createElement("input");
			$inputTag.className = "mui-input-clear";
			$inputTag.setAttribute("placeholder", "请输入");

			$labelTag.setAttribute("style", _self.jsonGetVal(labelTag,
					"animate"));
			$inputTag.setAttribute("style", _self.jsonGetVal(inputTag,
					"animate"));

			$inputTag.setAttribute("name", _self.jsonGetVal(inputTag,
					"fieldName"));
			$inputTag.setAttribute("dataType", _self.jsonGetVal(inputTag,
					"dataType"));
			$inputTag.setAttribute("type", "checkbox");
			$inputTag.setAttribute("mustinput", _self.jsonGetVal(inputTag,
					"mustInput"));
			if (_self.jsonGetVal(inputTag, "readonly", false)) {
				$inputTag.setAttribute("readonly", _self.jsonGetVal(inputTag,
						"readonly", false));
			}
			$inputTag.setAttribute("onchange", _self.jsonGetVal(inputTag,
					"onchange"));
			$inputTag.setAttribute("onclick", _self.jsonGetVal(inputTag,
					"onclick"));
			if ("true" == _self.jsonGetVal(inputTag, "para")) {
				$inputTag.setAttribute("checked", _self.jsonGetVal(inputTag,
						"para"));
			}
			addClass($inputTag, _self.jsonGetVal(inputTag, "domClass"));
			$inputTag.value = _self.jsonGetVal(inputTag, "initValue");
			_self.setDomAttr(labelTag, $labelTag);
			_self.setDomAttr(inputTag, $inputTag);
			addClass(elem, "mui-input-row");
			addClass(elem, "mui-checkbox");
			addClass(elem, _self.jsonGetVal(panel, "domClass"));

			elem.appendChild($labelTag);
			if (cols[0]["tags"].length > 1) {
				for (var i = 1; i < cols[0]["tags"].length; i++) {
					_self.bulid_Tag(cols[0]["tags"][i])
				}
			}
			elem.appendChild($inputTag);
			if (cols[1]["tags"].length > 1) {
				for (var i = 1; i < cols[1]["tags"].length; i++) {
					_self.bulid_Tag(cols[1]["tags"][i])
				}
			}
		} catch (e) {
			console.log(e);
		}

	},
	selectGroupTag : function(elem, panel) {
		var _self = this;
		var $tag = document.createElement("div");

		var cols = panel.cols;
		if (!cols || cols.length == 0 || cols.length != 2) {
			return;
		}

		try {

			var labelTag = cols[0]["tags"][0];
			var inputTag = cols[1]["tags"][0];
			var labelWidth = "width:" + cols[0]["col"] + "%;";
			var inputWidth = "width:" + cols[1]["col"] + "%;";

			var $labelTag = document.createElement("label");
			$labelTag.setAttribute("onclick", _self.jsonGetVal(labelTag,
					"onclick"));
			$labelTag.innerHTML = _self.jsonGetVal(labelTag, "initValue");
			$labelTag.setAttribute("class", _self.jsonGetVal(labelTag,
					"domClass"));
			$labelTag.setAttribute("name", _self.jsonGetVal(labelTag,
					"fieldName"));

			// ----

			var $inputTag = document.createElement("select");
			$inputTag.setAttribute("name", _self.jsonGetVal(inputTag,
					"fieldName"));
			$inputTag.setAttribute("dataType", _self.jsonGetVal(inputTag,
					"dataType"));
			$inputTag.setAttribute("mustinput", _self.jsonGetVal(inputTag,
					"mustInput"));
			if (_self.jsonGetVal(inputTag, "readonly", false)) {
				$input.setAttribute("readonly", _self.jsonGetVal(inputTag,
						"readonly", false));
			}

			$labelTag.setAttribute("style", _self.jsonGetVal(labelTag,
					"animate"));
			$inputTag.setAttribute("style", _self.jsonGetVal(inputTag,
					"animate"));

			$inputTag.setAttribute("onchange", _self.jsonGetVal(inputTag,
					"onchange"));
			$inputTag.setAttribute("onclick", _self.jsonGetVal(inputTag,
					"onclick"));
			addClass($inputTag, _self.jsonGetVal($inputTag, "domClass"));

			if (_self.jsonGetVal(inputTag, "para")) {
				// CreateParmkeyOpt(tagDom, tag.getPara());
				_self.createParmkeyOpt($inputTag, _self.jsonGetVal(inputTag, "para"));
			} else if (_self.jsonGetVal(inputTag, "optionArray")) {
				_self.createCustomOpt($inputTag, _self.jsonGetVal(inputTag,
						"optionArray"));
				// CreateCustomOpt(tagDom, tag.getOptionArray());
			} else {
				$inputTag.innnerHTML = "";
				var $option = document.createElement("option");
				$option.value = "";
				$option.innerHTML = "请选择";
				$inputTag.appendChild($option);
			}
			$inputTag.value = _self.jsonGetVal(inputTag, "initValue");

			var $span = document.createElement("span");
			$span.className = "unit";
			$span.innerHTML = _self.jsonGetVal(inputTag, "unit");

			addClass(elem, _self.jsonGetVal(panel, "domClass"));
			addClass(elem, "mui-input-row");
			_self.setDomAttr(labelTag, $labelTag);
			_self.setDomAttr(inputTag, $inputTag);
			elem.appendChild($labelTag);
			if (cols[0]["tags"].length > 1) {
				for (var i = 1; i < cols[0]["tags"].length; i++) {
					_self.bulid_Tag(cols[0]["tags"][i])
				}
			}
			elem.appendChild($inputTag);
			elem.appendChild($span);
			if (cols[1]["tags"].length > 1) {
				for (var i = 1; i < cols[1]["tags"].length; i++) {
					_self.bulid_Tag(cols[1]["tags"][i])
				}
			}
		} catch (e) {
			console.log(e);
		}

	}
}

function hasClass(elements, cName) {
	return !!elements.className
			.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); // ( \\s|^ )
	// 判断前面是否有空格
	// （\\s | $
	// ）判断后面是否有空格
	// 两个感叹号为转换为布尔值
	// 以方便做判断
}
function addClass(elements, cName) {
	if (!hasClass(elements, cName)) {
		elements.className += " " + cName;
	}
}
function removeClass(elements, cName) {
	if (hasClass(elements, cName)) {
		elements.className = elements.className.replace(new RegExp("(\\s|^)"
				+ cName + "(\\s|$)"), " "); // replace方法是替换
	}
}

// 封装异步请求方法
function ajax(options) {
	options = options || {};
	options.type = (options.type || "GET").toUpperCase();
	options.dataType = options.dataType || "json";
	options.async = options.async || true;
	var params = formatParams(options.data);

	// 创建 - 非IE6 - 第一步
	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	} else { // IE6及其以下版本浏览器
		var xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	// 接收 - 第三步
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var status = xhr.status;
			if ((status >= 200 && status < 300) || status == 0) {
				options.success
						&& options.success(xhr.responseText, xhr.responseXML);
			} else {
				options.fail && options.fail(status);
			}
		}
	}

	// 连接 和 发送 - 第二步
	if (options.type == "GET") {
		xhr.open("GET", options.url + "?" + params, options.async);
		xhr.send(null);
	} else if (options.type == "POST") {
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
	for ( var name in data) {
		arr.push(encodeURIComponent(name) + "="
				+ encodeURIComponent(data[name]));
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
	if(pathName.substr(1).indexOf('www/')==-1){
		projectName = pathName.substring(0,pathName.substr(1).indexOf('/') + 1)+"/";
	}else{
		projectName = pathName.substring(0,pathName.substr(1).indexOf('www/') + 4)+"/";
		
	}
	var realPath = localhostPaht + projectName;
	return realPath;
}
