/**
 * 登录
 **/
(function($, owner) {
	owner.login = function(loginInfo, callback) {
		var successFlag = 0;
		callback = callback || $.noop;
		//取本地token，如无token或token失效，先取token,再登录
		var token = null;
		if(token == null) {
			var enc_data = encryptUserInfo();
			mui.ajax({
				url : 'http://'+serverIp+'/app/login/getToken',
				data : {
					'encryptData' : enc_data.split(',')[0],
					'timestamp' : enc_data.split(',')[1],
					'nonce' : enc_data.split(',')[2],
					'signature' : enc_data.split(',')[3]
				},
				type : 'POST',
				dataType : 'JSON',
				async : false,
				success : function(response){
					var response = JSON.parse(response);
					if(response.flag == "success"){
						localStorage.setItem('token',response.token);
					}else{
						plus.nativeUI.closeWaiting();
						return callback('token未获取，禁止登录');
					}
				},
				error: function(a,b,c){
					plus.nativeUI.closeWaiting();
					return callback('网络故障，联系服务器');
				}
			});
		}

		
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		var authed = users.some(function(user) {
			return loginInfo.account == user.account && loginInfo.password == user.password;
		});
		//成功响应的回调函数
		var success = function(response) {
			console.log("callback" + response);

			if(response.flag == 'success') {
				//todo  保存token数据
				successFlag = 1;
				return owner.createState(loginInfo.account, response.token, callback);
			} else {
				plus.nativeUI.closeWaiting();
				return callback('用户名或密码错误');
			}
		};
		var error = function(state, cause) {
			plus.nativeUI.closeWaiting();
			console.log("-------" + cause, state);
			return callback('服务器网络故障');
		}
		//var roleType = plus.storage.getItem("isStaff") ? 'staff' : 'user'; //保存是否员工标识
		var url = 'http://'+ serverIp +'/app/login/apploginAjax/'; //staff应该时灵活的，先写死等需要时在放开，暂时预留字段' + roleType + '
		//'http://'+serverIp+'/app_base/login/apploginAjax/{roleType}/{deviceType}/{deviceid}'  
		var loc = userLocation();
		var data = {
			appId: plus.runtime.appid,
			userName: loginInfo.account,
			password: loginInfo.password,
			downChannel: 0, //给不同应用商店打包时，区分码
			iosToken: plus.push.getClientInfo().token,
			clientId: plus.push.getClientInfo().clientid, //clientid---个推id
			vendor: plus.device.vendor+","+plus.device.model,
			token: localStorage.getItem('token')
			//async: false

		};

		function userLocation() {
			//mmap.showUserLocation(true);
			var address = "";
			plus.geolocation.getCurrentPosition(function(postion) {
				address = postion.addresses;
				mmap.getUserLocation(function(state, pos) {
					//mmap.setCenter(pos);
					if(0 == state) {
						var optionloc = {
							url: 'http://' + serverIp + '/app/login/getLocationAjax',
							data: {
								"appId": plus.runtime.appid,
								"name": loginInfo.account,
								"location": pos.longitude + ',' + pos.latitude,
								"address": address
							},
							success: function(data) {},
							error: function(a, b, c) {},
							dataType: 'json',
							type: 'POST',
							async: true
							//false同步
						};
						if(successFlag == 1) {
							$.ajax(optionloc);
						} else {

						}

					} else {
						return 'failed';
					}
				});
			}, function(e) {}, {});
		}
		var async = false;
		//$.post(url, data, success, async);封装不支持同步
		var options = {
			url: url,
			data: data,
			success: success,
			error: error,
			dataType: 'json',
			type: 'POST',
			async: false
			//false同步
		};
		$.ajax(options);

		/*		if (authed) {
					return owner.createState(loginInfo.account, callback);
				} else {
					return callback('用户名或密码错误');
				}*/
	};

	owner.createState = function(name, token, callback) {
		var state = owner.getState();
		state.account = name;
		//state.token = token; //"token123456789";
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if(regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if(regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if(!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return(email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if(!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
	/**
	 * 获取本地是否安装客户端
	 **/
	owner.isInstalled = function(id) {
		if(id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if(mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch(e) {}
		} else {
			switch(id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.app = {}));

function encryptUserInfo() {
	var KEY = "4pRVwKWixuYtnPAkigKdvw9E9TddddsdewweewewQ";
	var uuid = plus.device.uuid; //设备id
	var timestamp = new Date().getTime(); //时间戳
	var deviceId = hex_sha1(uuid + new Date().getTime()).toUpperCase(); //设备id+时间戳 大写化 sha1加密
	var sb = new StringBuilder(deviceId); //变成字符串
	sb.append(hex_sha1(sb.reverse().toString()).toUpperCase()); //反转大写
	var encryptData = sb.toString(); //加密数据就是了
	var nonce = getRandomString(); //随机字符串
	var arr = new Array();
	arr.push(KEY);
	arr.push(encryptData);
	arr.push(timestamp);
	arr.push(nonce);
	arr.sort();
	var val = new StringBuilder();
	for(var _val in arr) {
		val.append(arr[_val]);
	}
	var signature = hex_sha1(val.toString()); //算出签名
	console.log("签名："+encryptData + "," + timestamp + "," + nonce + "," + signature);
	return encryptData + "," + timestamp + "," + nonce + "," + signature;
}

function getRandomString() {
	var $chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var len = 32;
	var maxPos = $chars.length;　　
	var str = '';　　
	for(i = 0; i < len; i++) {　　　　
		str += $chars.charAt(Math.floor(Math.random() * maxPos));　　
	}
	return str;
}
