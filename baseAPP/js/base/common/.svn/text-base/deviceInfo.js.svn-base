/***
 * 设备信息获取工具类
 * 需在plusready后调用
 * 引入此js
 * device.方法名（参数）就可以直接调用
 * 获取定位和位置的方法底层是异步，调用的话得需要回调函数，回调函数的第一个参数就是结果
 * @param {Object} device
 */
(function(dev) {
	//设备操作系统+操作系统版本号
	dev.osName = function() {
		return plus.os.name + " " + plus.os.version;
	};
	//设备imei号
	dev.imei = function() {
		return plus.device.imei;
	};
	//设备uuid（唯一标识）
	dev.uuid = function() {
		return plus.device.uuid;
	};
	//设备厂商+手机型号
	dev.vendor = function() {
		return plus.device.vendor + " " + plus.device.model;
	};
	//获取mac
	dev.mac = function() {
		var result = "待完善";
		return result;
	};
	//获取http请求信息
	dev.httpInfo = function() {
		//模拟一个http请求，去获取它的头部信息
		return "需要有请求才可以实现";
	};
	//获取ip
	dev.ip = function(callback) {
		var callback = callback;
		//调用搜狐第三方接口
		mui.ajax({
			type: "get",
			url: "http://pv.sohu.com/cityjson",
			dataType: "text",
			async: false,
			success: function(resp) {
				//"var returnCitySN = {"cip": "124.93.197.170", "cid": "210200", "cname": "辽宁省大连市"};"
				var ip = resp.substr(19, resp.length - 20);
				var ipaddress = JSON.parse(ip).cip;
				callback.call(this, ipaddress);
			},
			error: function(a, b, c) {
				mui.toast("请连接网络获取ip");
			}
		});
	};
	//获取定位信息
	dev.postion = function(callback) {
		var callback = callback;
		var result = "";
		plus.geolocation.getCurrentPosition(function(pos) {
			var longitude = pos.coords.longitude; //经度
			var latitude = pos.coords.latitude; //纬度
			var address = pos.address; //地图上的位置信息
			result = address.country + " " + address.province + " " + address.city +
				" " + address.district + " " + address.street + address.streetNum;
			callback.call(this, result);
		}, function() {
			result = '获取定位失败';
			callback.call(this, result);
		}, {});
	};
})(window.device = {});

//转换ip的形式
function parse(i) {
	return(i & 0xFF) + "." +
		((i >> 8) & 0xFF) + "." +
		((i >> 16) & 0xFF) + "." +
		(i >> 24 & 0xFF);
}