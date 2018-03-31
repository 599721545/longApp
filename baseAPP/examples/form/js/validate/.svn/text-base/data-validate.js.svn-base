var dataValidate = {
	validateParm: {},
	validateDefaultParm: { //配置表单实时校验的调用方法
		"click": [],
		"blur": ["valStringType", "valLength", "required"],
		"keyup": ["toMoney", "toDouble"]
	},
	validateCallback: { //对应方法的回调方法
		"required": function(obj, msg) {
			console.log(obj, msg);
		}
	},
	validateFormParm: ["required"], //配置提交表单要调用的方法
	validateFormCallback: { //对应方法的回调方法
		"required": function(obj, msg) {
			console.log(obj, msg);
		}
	},
	init: function(options) {
		this.options = options;
		this.elem = options.elem;
		this.validateCallback = options.callback||{};
		this.domParm = options.domParm;
		this.domEvent = options.domEvent||{};
		this.initEvent();
	},
	formValidate: function(options) {
		this.formOptions = options;
		this.formElem = options.elem;
		this.validateFormCallback = options.callback;
		this.formParm = options.parm;
		this.formEvent = options.formEvent||{};
		this.returnMsg();
	},
	callback:function(obj, msg,funcName){
		//console.log(funcName);
	},
	returnMsg: function() {
		var msg = [];
		var _self = this;
		var callback = this.validateFormCallback;
		var validateFormParm = this.validateFormParm;
		var formParm = this.formParm || [];
		var formElem = this.formElem;
		var parm = validateFormParm.concat(formParm);

		var elem = document.querySelectorAll(formElem)[0];
		var inputs = elem.getElementsByTagName("INPUT");
		var textareas = elem.getElementsByTagName("TEXTAREA");
		for(var i = 0; i < inputs.length; i++) {
			for(var j = 0; j < parm.length; j++) {
				var str = _self[parm[j]](inputs[i]);
				if(str && str != "") {
					var temp = {
						obj: inputs[i],
						msg: str
					};
					msg.push(temp);
				}
			}
		}
		for(var k in formEvent){
			var $dom = elem.querySelectorAll(k);
			for (var i = 0; i < $dom.length; i++) {
				var arr =formEvent[k];
				for (var j = 0; j < arr.length; j++) {
					var str = _self[arr[j]]($dom[i]);
					if(str && str != "") {
						var temp = {
							obj: $dom[i],
							msg: str
						};
						msg.push(temp);
					}
				}
			}
		}
		if(msg.length > 0) {
			if(callback && typeof(callback) == "function") {
				callback.call(this, msg);
			}
			return false;
		}
	},
	initEvent: function() {
		var _self = this;
		var options= this.options;
		var domEvent= this.domEvent;
		var validateParm = this.validateParm;
		var validateDefaultParm = this.validateDefaultParm;
		var parm = this.getValidateParm(validateParm, validateDefaultParm);

		var validateCallback = this.validateCallback;
		var $elem;
		if(typeof(options.elem)=="object"){
			$elem = options.elem;
		}else if (typeof(options.elem)=="string") {
			$elem = document.querySelectorAll(elem)[0];
		}
		var inputs = $elem.getElementsByTagName("INPUT");
		var textareas = $elem.getElementsByTagName("TEXTAREA");
		for(var i = 0; i < inputs.length; i++) {
			for(var k in parm) {
				inputs[i].addEventListener(k, function(e) {
					var arr = parm[e.type];
					for(var j = 0; j < arr.length; j++) {
						if(validateCallback.hasOwnProperty(arr[j])) {
							_self[arr[j]](e.target, validateCallback[arr[j]]);
						} else {
							_self[arr[j]](e.target,function(obj, msg){
								_self.callback.call(this,obj, msg,arr[j]);
							});
						}
					}
				})
			}
		}
		for(var i = 0; i < textareas.length; i++) {
			for(var k in parm) {
				textareas[i].addEventListener(k, function(e) {
					var arr = parm[e.type];
					for(var j = 0; j < arr.length; j++) {
						if(validateCallback.hasOwnProperty(arr[j])) {
							_self[arr[j]](e.target, validateCallback[arr[j]]);
						} else {
							_self[arr[j]](e.target,function(obj, msg){
								_self.callback.call(this,obj, msg,arr[j]);
							});
						}
					}
				})
			}
		}
		for (var k in domEvent) {
			var $dom = $elem.querySelectorAll(k);
			for (var i = 0; i < $dom.length; i++) {
				for (var u in domEvent[k]) {
					$dom[i].addEventListener(u,function(e){
						var arr = domEvent[k][e.type];
						for(var j = 0; j < arr.length; j++) {
							if(validateCallback.hasOwnProperty(arr[j])) {
								_self[arr[j]](e.target, validateCallback[arr[j]]);
							} else {
								_self[arr[j]](e.target,function(obj, msg){
									_self.callback.call(this,obj, msg,arr[j]);
								});
							}
						}
					})
				}
			}
		}
		
	
	},

	getValidateParm: function(a, b) { //
		var parm = {};
		for(var x in a) {
			var c = a[x];
			if(b.hasOwnProperty(x)) {
				c = a[x].concat(b[x]);
			}
			parm[x] = c;
		}
		for (var y in b) {
			if(!parm.hasOwnProperty(y)) {
				parm[y] = b[y];
			}
		}
		return parm;
	},
	getCursorPsn: function(inObject) {
		var position = 0;
		var domObj = inObject;
		if(document.selection) { // for IE
			domObj.focus();
			var sel = document.selection.createRange();
			sel.moveStart('character', -domObj.value.length);

			position = sel.text.length;
		} else if(domObj.selectionStart || domObj.selectionStart == '0') {
			position = domObj.selectionStart;
		}
		return position;
	},
	getOstr: function(inObject, position) {
		var sumOstr = 0;
		var inStr = inObject.value;
		if(inStr.length > 0) {
			var lStr = inStr.substring(0, position);
			for(var i = 0; i < lStr.length; i++) {
				var v = lStr.charAt(i);
				if(isNaN(v)) {
					sumOstr++;
				}
			}
		}
		return sumOstr;
	},
	toMoney: function(inObject) { // <!-- 千分位 -->
		var type = inObject.getAttribute('datatype');
		if(type == 7) {
			// 获取光标位置
			var position = this.getCursorPsn(inObject);
			// 获取光标前非数字个数
			var sumOstr = this.getOstr(inObject, position);

			var inStr = inObject.value;

			var i, charValue, outStr, id = 0,
				fs = 0;

			for(i = 0; i < inStr.length; i++) {
				charValue = inStr.charAt(i);
				if(isNaN(parseInt(charValue, 10)) && (charValue != ".") &&
					(charValue != ",") && (charValue != "-")) {
					if(fs == 1) {
						inObject.value = "-" + inStr.substring(0, i) +
							inStr.substring(i + 1, inStr.length);
					} else {
						inObject.value = inStr.substring(0, i) +
							inStr.substring(i + 1, inStr.length);
					}

					return;
				}
				if(i > 0 && charValue == "-") {
					if(fs == 1) {
						inObject.value = "-" + inStr.substring(0, i) +
							inStr.substring(i + 1, inStr.length);
					} else {
						inObject.value = inStr.substring(0, i) +
							inStr.substring(i + 1, inStr.length);
					}

					return;
				}
				if(i == 0 && charValue == "-") {
					fs = 1;
					inStr = inStr.substr(1, inStr.length);
					i = -1;
				}
				if(charValue != "0") {
					id = 1;
				}

				if(id == 0 && i == 1 && charValue == "0") {
					inStr = inStr.substr(1, inStr.length - 1);
					i = 0;
				}
			}

			var valueArr;
			// 最大长度和保留小数位数处理
			var dbmaxlength = inObject.getAttribute('dbmaxlength');
			var dotSize = inObject.getAttribute('size');
			var maxlength = inObject.getAttribute('maxlength');
			if(!dbmaxlength) {
				dbmaxlength = maxlength;
				inObject.setAttribute('dbmaxlength', dbmaxlength);
				if(dotSize && dotSize.indexOf(".") > -1) {
					var dotSizeArr = dotSize.split(".");
					var tempSize = Number(dbmaxlength) - dotSizeArr[1].length;
					inObject.setAttribute('maxlength', Number(dbmaxlength) +
						parseInt(tempSize / 3) + 1);
					inObject.setAttribute('dotlength', dotSizeArr[1].length);
				} else {
					inObject.setAttribute('maxlength', Number(dbmaxlength) + 1);
				}
			}

			valueArr = inStr.split(".");

			if(valueArr.length > 2) {
				alert(inStr + " 非法金额!");
				inObject.focus();
				inObject.select();
				return;
			}

			var dotStr, dotValue;
			var datatype = inObject.getAttribute('datatype');
			var dotlength = inObject.getAttribute('dotlength');
			if(valueArr.length == 2) {
				dotValue = valueArr[1];
				if(dotValue.length == 0) {
					dotStr = "";
				} else {
					if(dotValue.length == 1) {
						dotStr = dotValue + "";
					} else {
						if(dotlength > 0 && typeof(dotlength) != "undefined") {
							dotStr = dotValue.substring(0, dotlength);
						} else if(datatype && typeof(datatype) != "undefined") { // 根据数据类型判断小数点保留后几位
							if(datatype == "3" || datatype == "12") {
								dotStr = dotValue.substring(0, 2);
							} else if(datatype == "8") {
								dotStr = dotValue.substring(0, 4);
							} else if(datatype == "9") {
								dotStr = dotValue.substring(0, 6);
							}
							dotlength = 0;
						} else {
							dotStr = dotValue.substring(0, dotValue.length);
							dotlength = 0
						}
					}
				}
			}

			var intArr;

			intArr = valueArr[0].split(",");

			var intValue = "";

			for(i = 0; i < intArr.length; i++) {
				intValue += intArr[i];
			}
			var intStr = "";

			if(intValue.length > 1 && intValue.charAt(0) == "0" &&
				intValue.charAt(1) != ".") {
				intValue = intValue.substr(1, intValue.length - 1);
			}
			if(intValue.length > (Number(dbmaxlength) - Number(dotlength))) {
				if(dotlength > 0 && typeof(dotlength) != "undefined") {
					intValue = intValue.substring(0, Number(dbmaxlength) -
						Number(dotlength));
				} else if(datatype && typeof(datatype) != "undefined") { // 根据数据类型判断小数点前保留几位
					if(datatype == "3") {
						intValue = intValue.substring(0,
							Number(dbmaxlength) - 2);
					} else if(datatype == "8") {
						intValue = intValue.substring(0,
							Number(dbmaxlength) - 4);
					} else if(datatype == "9") {
						intValue = intValue.substring(0,
							Number(dbmaxlength) - 6);
					}
				} else {
					intValue = dotValue.substring(0, maxlength);
				}
			}
			while(intValue.length > 3) {
				intStr = "," +
					intValue.substring(intValue.length - 3,
						intValue.length) + intStr;
				intValue = intValue.substring(0, intValue.length - 3);
			}
			intStr = intValue + intStr;

			if(dotStr == null)
				outStr = intStr;
			else
				outStr = intStr + "." + dotStr;

			if(fs == 1) {
				outStr = "-" + outStr;
			}

			inObject.value = outStr;
			// var esumOstr = getOstr(inObject,position);

			// 设置光标位置
			// position = position + (esumOstr - sumOstr);
			// setgetCursorPsn(inObject,position);

			return;
		}

	},
	toDouble: function(inObject) {
		var type = inObject.getAttribute('datatype');
		if(type == 3 || type == 8 || type == 9 || type == 13 || type == 14 ||
			type == 15 || type == 16 || type == 17 || type == 18 ||
			type == 19) {
			var inStr = inObject.value;
			var i, charValue, outStr, id = 0,
				fs = 0;
			for(i = 0; i < inStr.length; i++) {
				charValue = inStr.charAt(i);
				if(isNaN(parseInt(charValue, 10)) && (charValue != ".") &&
					(charValue != ",") && (charValue != "-")) {
					if(fs == 1)
						inObject.value = "-" + inStr.substring(0, i) +
						inStr.substring(i + 1, inStr.length);
					else
						inObject.value = inStr.substring(0, i) +
						inStr.substring(i + 1, inStr.length);
					return;
				}
				if(i > 0 && charValue == "-") {
					if(fs == 1)
						inObject.value = "-" + inStr.substring(0, i) +
						inStr.substring(i + 1, inStr.length);
					else
						inObject.value = inStr.substring(0, i) +
						inStr.substring(i + 1, inStr.length);
					return;
				}
				if(i == 0 && charValue == "-") {
					fs = 1;
					inStr = inStr.substr(1, inStr.length);
					i = -1;
				}
				if(charValue != "0") {
					id = 1;
				}
				if(id == 0 && i == 1 && charValue == "0") {
					inStr = inStr.substr(1, inStr.length - 1);
					i = 0;
				}
			}
			var valueArr;
			valueArr = inStr.split(".");
			if(valueArr.length > 2) {
				alert(inStr + " 非法数值!");
				inObject.focus();
				inObject.select();
				return;
			}
			var dbmaxlength = inObject.getAttribute('dbmaxlength'); // 最大长度加1处理，小数点占一位
			var maxlength = inObject.getAttribute('maxlength');
			var dotSize = inObject.getAttribute('size');
			if(!dbmaxlength) {
				dbmaxlength = maxlength;
				inObject.setAttribute('dbmaxlength', dbmaxlength);
				if(dotSize && dotSize.indexOf(".") > -1) {
					var dotSizeArr = dotSize.split(".");
					inObject.setAttribute('dotlength', dotSizeArr[1].length);
				}
				inObject.setAttribute('maxlength', Number(dbmaxlength) + 1);
			}
			var dotStr, dotValue;
			var datatype = inObject.getAttribute('datatype');
			var dotlength = inObject.getAttribute('dotlength');
			if(valueArr.length == 2) {
				dotValue = valueArr[1];
				if(dotValue.length == 0) {
					dotStr = "";
				} else {
					if(dotValue.length == 1) {
						dotStr = dotValue + "";
					} else {
						if(dotlength > 0 && typeof(dotlength) != "undefined") {
							dotStr = dotValue.substring(0, dotlength);
						} else if(datatype && typeof(datatype) != "undefined") { // 根据数据类型判断小数点保留后几位
							if(datatype == "3") {
								dotStr = dotValue.substring(0, 2);
							} else if(datatype == "8") {
								dotStr = dotValue.substring(0, 4);
							} else if(datatype == "9") {
								dotStr = dotValue.substring(0, 6);
							}
						} else {
							dotStr = dotValue.substring(0, dotValue.length);
						}
					}
				}
			}
			var intArr;
			intArr = valueArr[0].split(",");
			var intValue = "";
			for(i = 0; i < intArr.length; i++) {
				intValue += intArr[i];
			}
			var intStr = "";
			if(intValue.length > 1 && intValue.charAt(0) == "0" &&
				intValue.charAt(1) != ".") {
				intValue = intValue.substr(1, intValue.length - 1);
			}

			if(dotlength > 0 && typeof(dotlength) != "undefined") {
				intValue = intValue.substring(0, Number(dbmaxlength) -
					Number(dotlength));
			} else if(datatype && typeof(datatype) != "undefined") { // 根据数据类型判断小数点前保留几位
				if(datatype == "3") {
					intValue = intValue.substring(0, Number(dbmaxlength) - 2);
				} else if(datatype == "8") {
					intValue = intValue.substring(0, Number(dbmaxlength) - 4);
				} else if(datatype == "9") {
					intValue = intValue.substring(0, Number(dbmaxlength) - 6);
				}
			} else {
				intValue = dotValue.substring(0, maxlength);
			}

			intStr = intValue + intStr;
			if(dotStr == null)
				outStr = intStr;
			else
				outStr = intStr + "." + dotStr;
			if(fs == 1) {
				outStr = "-" + outStr;
			}
			inObject.value = outStr;
			return;
		}

	},
	required: function(obj, callback) {
		var value = obj.value;
		var mustInput = obj.getAttribute('mustinput');
		if(mustInput == 'true') {
			if(value == 'undefined' || this.trim(value) == '') {
				var msg = "不能为空";
				if(callback && typeof(callback) == "function") {
					callback.call(this, obj, msg);
				}
				return msg;
			}
		}
		return "";
	},
	valStringType: function(obj) { // 校验数据类型
		var str = obj.value;
		var type = obj.getAttribute('datatype');
		var msg = '';
		if(type != 'undefined' && this.trim(type) != '') {
			if(type == 1) {
				var reg = /^-?[1-9]\d*|0$/;
				if(!reg.test(str)) {
					msg = '内容不是整数!\n';
					obj.value = "0";
				}
			} else if(type == 2) {
				var reg = /^-?[1-9]\d*|0$/;
				if(!reg.test(str)) {
					msg = '内容不是长整数!\n';
					obj.value = "0";
				}
			} else if(type == 3 || type == 8 || type == 9 || type == 13 ||
				type == 14 || type == 15 || type == 16 || type == 17 ||
				type == 18 || type == 19) {
				var reg = /^-?([1-9]\d*|[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/;
				if(!reg.test(str)) {
					msg = '内容不是数字!\n'
					obj.value = "0";
				}
			} else if(type == 4) {
				var reg = /^[1-9]\d*|[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/;
				if(!reg.test(str)) {
					msg = '内容不是数字(正数)!\n';
					obj.value = "0";
				}
			} else if(type == 5) {
				if(str != 'true' && str != 'false') {
					msg = '内容不是布尔值!\n';
				}
			} else if(type == 6) {
				if(str.length == 10 || str.length == 8) {
					var yy = 0,
						mm = 0,
						dd = 0;
					if(str.length == 8) {
						yy = parseInt(str.substring(0, 4), 10);
						mm = parseInt(str.substring(4, 6), 10);
						dd = parseInt(str.substring(6, 8), 10);
					} else {
						yy = parseInt(str.substring(0, 4), 10);
						mm = parseInt(str.substring(5, 7), 10);
						dd = parseInt(str.substring(8, 10), 10);
					}
					if(mm > 12 || mm <= 0 || dd <= 0 || dd > 31)
						return '内容不是日期!\n';
					var rndd = ((yy % 4 == 0) && (yy % 100 != 0) || (yy % 400 == 0)) ? 29 :
						28;
					switch(mm) {
						case 4:
						case 6:
						case 9:
						case 11:
							if(dd > 30 || dd <= 0)
								msg = '内容不是日期!\n';
							break;
						case 1:
						case 3:
						case 5:
						case 7:
						case 8:
						case 10:
						case 12:
							if(dd > 31 || dd <= 0)
								msg = '内容不是日期!\n';
							break;
						case 2:
							if(dd > rndd || dd <= 0)
								msg = '内容不是日期!\n';
							break;
					}
				} else {
					msg = '内容不是日期!\n';
				}
			} else if(type == 12) {
				// 金额类型 0.00;1.00;1,000.00;1,000;1
				var reg = /^([+-]?)((\d{1,3}(,\d{3})*)|(\d+))(\.\d*)?$/;
				if(!reg.test(str)) {
					if(str == "") {
						obj.value = "0.00";
					} else {
						msg = '内容不是金额类型!\n';
						obj.value = "0.00";
					}
				}
			}
		}
		return msg;
	},
	valLength: function(obj) {
		var type = obj.getAttribute('datatype');
		if((type != 0 && type != "0") ||
			(obj.getAttribute("type") != "TEXT" && obj
				.getAttribute("type") != "text")) {
			return '';
		}
		var str = obj.value;
		var msg = '';
		var maxLengthStr = obj.getAttribute('maxLength');
		if(maxLengthStr == "null" || maxLengthStr == null ||
			maxLengthStr == 'undefined' || !isNaN(maxLengthStr)) {
			maxLengthStr = obj.getAttribute('maxlength');
		}
		var reg = /^[1-9]*|0$/;
		if(maxLengthStr && maxLengthStr != 'undefined' &&
			reg.test(maxLengthStr)) {
			var maxLength = parseInt(maxLengthStr, 10);
			var count = window.top.SysConstant ? window.top.SysConstant.Chinese_characters_count :
				1;
			var tempStr = "";
			for(var i = 0; i < count; i++) {
				tempStr += "m";
			}
			str = str.replace(/[\u4e00-\u9fa5]/g, tempStr); // 将中文字符进行转化
			str = str.replace(/[^\x00-\xff]/g, 'qq'); // 将全角字符进行转化
			if(str.length > maxLength) {
				msg = '内容长度不能超过' + maxLength + '个字符或' +
					parseInt((maxLength / count), 10) + '个汉字!';
			}
		}

		return msg;
	},
	trim: function(str) { // 去除首尾空格
		var result = '';
		if(str != null) {
			result = str.replace(/^\s|\s$/g, '');
		}
		return result;
	},
	cloneObj: function(obj) {
		var str, newobj = obj.constructor === Array ? [] : {};
		if(typeof obj !== 'object') {
			return;
		} else if(window.JSON) {
			str = JSON.stringify(obj), // 序列化对象
				newobj = JSON.parse(str); // 还原
		} else {
			for(var i in obj) {
				newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
			}
		}
		return newobj;
	}
};