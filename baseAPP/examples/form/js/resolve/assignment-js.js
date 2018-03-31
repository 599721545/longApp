var assignment = {
	getJSONValue : function(data, map) {
		var json = cloneObj(data);
		if(map){
			this.getPanelsMap(data, map, json);
		}
		return json;
	},
	getPanelsMap : function(data, map, json) {
		var panels = data["panels"].concat() || [];
//		var jsonArr = [];
		if (panels) {
			json["panels"] = [];
			for (var i = 0; i < panels.length; i++) {
//				var jsonPanel = {};
				this.getColsMap(panels[i], map, json);
//				if (!objectIsEmpty(jsonPanel)) {
//					jsonArr.push(jsonPanel);
//				}
			}
		}
		if(data.hasOwnProperty("hidden")){
			var hiddens = data["hidden"].concat() || [];
			if (hiddens) {
				json["hidden"] = [];
				for (var i = 0; i < hiddens.length; i++) {
					this.getHideMap(hiddens[i], map, json);
				}
			}
		}
	},
	getPanelsObj : function(data, obj, json) {
		var panels = data["panels"].concat() || []
		var jsonArr = [];
		if (panels) {
			for (var i = 0; i < panels.length; i++) {
				var jsonPanel =  cloneObj( panels[i]);
				this.getColsObj(panels[i], obj, jsonPanel, jsonArr);
				if (!objectIsEmpty(jsonPanel)) {
					jsonArr.push(jsonPanel);
				}
			}
		}
		json["panels"] = jsonArr;

	},
	getHideMap : function(data, map, json) {
		var tagJson = cloneObj(data);
		var fieldName = tagJson["fieldName"];
		if (fieldName && map) {
			tagJson["initValue"] = map[fieldName] || tagJson["initValue"];
			resolveformat.typeConversion(tagJson);//数据格式化
		}
		json["hidden"].push(tagJson);
	},
	getColsMap : function(panel, map, jsonPanel) {
		var cols = panel["cols"].concat() || [];
		var panelType = panel["type"]
		if (cols) {
			if (panelType == "list") {// 处理animateJson
				var animateJson = this.decompose(panel["animate"]);
				var beanName = panel["beanName"];
				var list = [];
				if (beanName) {
					list = map[beanName] || [];

					for (var i = 0; i < list.length; i++) {
						var tempPanel = cloneObj(  panel);
						var tempColsArr = [];
						for (var j = 0; j < cols.length; j++) {
							var tempColsObj = cloneObj(cols[j]);
							if (!list[i]) {
								this.getPanelsMap(cols[j], map, tempColsObj);
							} else {
								this.getPanelsObj(cols[j], list[i],tempColsObj);
							}
							this.getTagsObj(cols[j], list[i], tempColsObj);
							tempColsArr.push(tempColsObj);
							analyticParameter(tempPanel,list[i]);
						}
						//tempPanel = cloneObj(panel);
						
						
						tempPanel["animate"] = this.listStep(animateJson, i);
						tempPanel["cols"] = tempColsArr;
						jsonPanel["panels"].push(tempPanel);
					}
				}

			} else {
				var beanName = panel["beanName"];
				var obj;
				if (beanName) {
					obj = map[beanName];
				}
				var colsArr = [];
				for (var j = 0; j < cols.length; j++) {
					var colJson = cloneObj(cols[j]);
					if (!obj) {
						this.getPanelsMap(cols[j], map, colJson);
					} else {
						this.getPanelsObj(cols[j], obj, colJson);
					}
					this.getTagsObj(cols[j], obj, colJson);
					colsArr.push(colJson);
				}
				var tempPanel = cloneObj(panel);
				tempPanel["cols"] = colsArr;
				jsonPanel["panels"].push(tempPanel);
			}
		}
	},
	getColsObj : function(panel, obj, jsonPanel, jsonArr) {
		var cols = panel["cols"].concat() || [];
		var colsArr = [];
		for (var j = 0; j < cols.length; j++) {
			var colJson = cloneObj(cols[j]);
			this.getPanelsObj(cols[j], obj, colJson);
			this.getTagsObj(cols[j], obj, colJson);
			colsArr.push(colJson);
		}
		jsonPanel["cols"] = colsArr;
	},
	getTagsObj : function(col, obj, colJson) {
		var tags = (col["tags"] || []).concat();
		var jsonArr = [];
		for (var i = 0; i < tags.length; i++) {
			var tagJson = cloneObj(tags[i]);
			var fieldName = tags[i]["fieldName"];
			if (fieldName && obj) {
				tagJson["initValue"] = obj[fieldName] || tags[i]["initValue"];
				resolveformat.typeConversion(tagJson);//数据格式化
				analyticParameter(tagJson,obj);
			}
			jsonArr.push(tagJson);
		}
		colJson["tags"] = jsonArr;
	},
	decompose : function(animateStr) {
		var json ={};
		if (animateStr) {
			var arr = animateStr.split(";");
			for (var i = 0; i < arr.length; i++) {
				var subArr = arr[i].split(":");
				if (subArr[0] && subArr[1] && subArr[1] != "undefined") {
					json[subArr[0]] = subArr[1];
				}
			}
		}
		return json;
	},
	listStep : function(json, count) {
		var style = "";
		if (json&&!objectIsEmpty(json)) {
//			$.each(json, function(k, v) {
//				if (k != "animation-delay" && k != "listStep") {
//					style += k + ":" + v + ";";
//				}
//			});
			for(var i in json){
		        if (json.hasOwnProperty(i)) { //filter,只输出man的私有属性
		            style += i + ":" + json[i] + ";";
		        };
		    }
			if (json["animation-delay"]) {
				if (json["listStep"]) {
					var delayStr = json["animation-delay"];
					if (delayStr.indexOf("ms") > -1) {
						delayStr = delayStr.replace(new RegExp("ms", "gm"), "");
					}
					var delay = Number(delayStr);
					delay = delay + Number(json["listStep"]) * count;
					style += "animation-delay" + ":" + delay + "ms;";
				} else {
					style += "animation-delay" + ":" + json["animation-delay"]
							+ ";";
				}

			} else {
				if (json["listStep"]) {
					var delayStr = json["animation-delay"];
					if (delayStr&&delayStr.indexOf("ms") > -1) {
						delayStr = delayStr.replace(new RegExp("ms", "gm"), "");
					}
					var delay = 0;
					delay = Number(json["listStep"]) * count;
					style += "animation-delay" + ":" + delay + "ms;";
				} else {
					style += "animation-delay" + ":" + json["animation-delay"]
							+ ";";
				}
			}
		}
		return style;
	}
}
var cloneObj = function(obj){
	var str, newobj = obj.constructor === Array ? [] : {};
	if(typeof obj !== 'object'){
	    return;
	} else if(window.JSON){
	    str = JSON.stringify(obj), //序列化对象
	    newobj = JSON.parse(str); //还原
	} else {
	    for(var i in obj){
	        newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]; 
	    }
	}
	return newobj;
}

var objectIsEmpty = function(obj){
	return JSON.stringify(obj) == "{}";
}


//格式化
var resolveformat = {
		typeConversion:function(tag){
			var dataType = tag.dataType;
			if(dataType=="7"){//金额类型，千分位
				tag["initValue"] = this.fmoney(tag["initValue"],2);
			}
		},
		toThousands:function (num) {//金额类型，千分位
		    var num = (num || 0).toString(), result = '';
		    while (num.length > 3) {
		        result = ',' + num.slice(-3) + result;
		        num = num.slice(0, num.length - 3);
		    }
		    if (num) { result = num + result; }
		    return result;
		},
		fmoney:function (s, n)   
		{   
		   n = n > 0 && n <= 20 ? n : 2;   
		   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
		   var l = s.split(".")[0].split("").reverse(),   
		   r = s.split(".")[1];   
		   t = "";   
		   for(i = 0; i < l.length; i ++ )   
		   {   
		      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
		   }   
		   return t.split("").reverse().join("") + "." + r;   
		} 
};

function analyticParameter(obj, map)  {
	if(obj["onclick"]){
		var eventStr = "";
		var str = obj["onclick"];
		try {
			if (str.indexOf(";") > -1) {
				var tempArr = str.split(";");
				var event = tempArr[0];
				eventStr = event.substring(0, event.length - 1);
				for (var i = 1; i < tempArr.length; i++) {
					if (tempArr[i] != null && ""!=tempArr[i].trim()) {
						var val = map[tempArr[i]];
						if (val == null) {
							continue;
						}
						if (eventStr.indexOf("this") > -1) {
							eventStr += ",\"" + val + "\"";
						} else {
							if (i == 1) {
								eventStr += "\"" + val + "\"";
							} else {
								eventStr += ",\"" + val + "\"";
							}
						}
					}
				}
				eventStr += ");";
				obj["onclick"] = eventStr
			}
		} catch (e) {
			console.log("组件事件参数配置错误");
		}
	}
	
}