//热更新轮询
/**
 * 页面引用此js
 * 调用方式 
 * plus.ready 内 调用此方法
 * hu.createHu({
		url:"128.1.217.11:9999/myHandler",长连接地址
		versionJson:versionJson,版本控制文本
		versionFile:versionFile,json本本控制文件路径
		time:60000;//根据实际的时间来定（插件默认为一分钟（60000毫秒））
	});
});
 * @param {Object} hu
 */
(function(hu) {
	hu.requestSts = 0;//0:未连接或关闭,1:已连接,2:热更新执行过程中
	/***
	 * 热更新方法初始化
	 * @param {String} ipPort
	 * @param {Object} versionJson
	 */
	hu.init = function(options) {
		var ws = null;
		var versionFile = options.versionFile;
		var url = options.url
		var versionJson = options.versionJson;
		var time = 600000; //默认60s心跳一次
		var times = 20; //长连接关闭后重连次数
		var rejoin = 1;
		if(options.time != null && options.time !== undefined && options.time != "") {
			time = options.time;
		}
		var wsInterval;
		var wsConnect = {
			init:function(){
				ws = new WebSocket("ws://" + url + "?uuid=" + plus.device.uuid);
				hu.requestSts = 1;
				ws.onopen = function() {
					hu.requestSts = 2;
					console.log("热更新连接成功");
					wsConnect.openSend();
				};
				//热更新服务器响应
				ws.onmessage = function(msg) {
					hu.requestSts = 2;
					console.log("服务器相应："+msg);
					//转json对象
					var data = JSON.parse(msg.data);
					//console.log("长连接返回的数据" + msg.data);
					if(data.flag == "1") { //需要更新文件
						hu.downZip(data.downUrl,versionFile); //下载处理
					} else {
						console.log("暂时不需要要更新！");
						hu.requestSts = 1;
					}
				};
				ws.onclose = function() {
					hu.requestSts = 0;
					console.log("热更新关闭，等待重新连接");
				};
				ws.onerror = function () {
					hu.requestSts = 0;
				    console.log("连接错误");
				};
			},openSend:function(){
				var jsonsionJson = "";
				var verFile = plus.io.convertLocalFileSystemURL('_www/' + versionFile);
				mui.getJSON(verFile, {
					async: true
				}, function(response) {
					jsonsionJson = JSON.stringify(response);
					console.log("jsonsionJson:"+jsonsionJson);
					ws.send(jsonsionJson);
				});
			}
		}
		
		wsConnect.init();
		wsInterval = setInterval(function() {
			console.log("hu.requestSts："+hu.requestSts);
			if(hu.requestSts==0){
				console.log("进行一次重新连接...");
				if(ws.readyState == 1) {
					
				} else {
					console.log("进行关闭，然后重连");
					wsConnect.init();
				}
			}else if(hu.requestSts==1){
				console.log("再次发起热更新验证...");
				wsConnect.openSend();
			}else if(hu.requestSts==2){
				console.log("热更新中...");
			}
			}, time);
	}
	//文件下载
	hu.downZip = function(downUrls, versionFile) {
		if(plus.os.name == "iOS") {
			//删除源文件
			//console.log("删除源文件");
			file.deleteFileIos('_doc/downloads/');
		} else {
			//移动下载文件至源文件地址
			//console.log(fileName+"删除");
			file.deleteFileDir("_doc/downloads/");
		}
		var downSize = 0;
		for(var indexI=0,indexJ=downUrls.length;indexI<indexJ;indexI++){
			var downUrl = downUrls[indexI];
			var downFileName = downUrl.split("/")[downUrl.split("/").length - 1]; //压缩文件名称
			var fileFolder = downFileName.substr(0,downFileName.lastIndexOf('.')); //文件夹
			var down = plus.downloader.createDownload(downUrl, {
				filename: '_doc/downloads/',
				retry: 10,
				retryInterval: 30
			}, function(d, state) {
				downSize++;
				console.log("文件下载成功" + d.filename);
				if(state == 200) {
					//console.log("文件下载成功" + d.filename);
					//解压压缩文件
					plus.zip.decompress(d.filename,
						'_doc/zip/' + fileFolder,
						function() {
							//先取到files
							var filesPath = plus.io.convertLocalFileSystemURL('_doc/zip/' + fileFolder + "/path.json");
							var files = hu.getFiles(filesPath,'_doc/zip/' + fileFolder);
							for(var i in files) {
								switch(files[i].sts) {
									case '-1':
										//不操作
										break;
									case '0':
										//删除操作
										if(plus.os.name == "iOS") {
											file.fileBackupsIos("_www/" + files[i].src, fileFolder + '/' + files[i].src)
											file.deleteFileIos("_www/" + files[i].src);
										} else {
											file.fileBackupsAndroid("_www/" + files[i].src, fileFolder);
											file.deleteFileAndroid("_www/" + files[i].src);
										}
										break;
									case '1':
										//新增操作
										if(plus.os.name == 'iOS') {
											file.fileBackupsIos("_www/" + files[i].src, fileFolder + '/' + files[i].src);
										} else {
											file.fileBackupsAndroid("_www/" + files[i].src, fileFolder);
										}
										hu.update(files[i], fileFolder)
										break;
									case '2':
										//更新操作
										if(plus.os.name == 'iOS') {
											file.fileBackupsIos("_www/" + files[i].src, fileFolder + '/' + files[i].src);//旧 新
										} else {
											file.fileBackupsAndroid("_www/" + files[i].src, fileFolder);
										}
										hu.update(files[i], fileFolder);
										break;
									default:
										break;
								}
	
							}
							hu.updateVersion(versionFile, plus.storage.getItem('version')); //更新版本
							//console.log("解压成功");
							if(indexJ==downSize){
								hu.requestSts = 1;
								console.log("更新完成");
							}
						},
						function() {
							//console.log("解压失败");
						});
				}else{
					console.log("下载失败");
				}
			});
			down.start();
		}
	}

	//更新文件
	hu.update = function(files, fileFolder) {
		if(plus.os.name == "iOS") {
			//删除源文件
			file.deleteFileIos('_www/' + files.src);
			//移动下载文件至源文件地址
			file.moveFileIos('_www/' + files.src, '../../../doc/zip/' + fileFolder + "/" + files.src);
		} else {
			//移动下载文件至源文件地址
			file.moveFileAndroid('_www/' + files.src, '../../../doc/zip/' + fileFolder + "/" + files.src);
		}
	}
	//更新版本
	hu.updateVersion = function(versionFile, version) {
		console.log("开始更新版本");
		var jsonsionJson = "";

		var versionfile = plus.io.convertLocalFileSystemURL('_www/' + versionFile);
		//存储版本控制  及更新路径位置
		console.log("版本：" + version);
		var vfile = file.getRealPath();
		if(plus.os.name == 'iOS'){
			vfile = vfile.substr(7,vfile.length);
		}
		mui.ajax(vfile + versionFile, {
			async: false,
			dataType: 'json',
			success: function(response) {
				jsonsionJson = response;
			},error(a,b,c){
				console.log(b);
				console.log(a.responseUrl);
			}
		});
		console.log(jsonsionJson);
		jsonsionJson["version"] = version;
		if(plus.os.name == 'iOS') {
			file.deleteFileIos(versionfile);
			file.writeFileIos(jsonsionJson, versionfile);
		} else {
			file.writeFileAndroid(jsonsionJson, versionfile);
		}
		console.log("结束更新版本");
	}

	hu.getFiles = function(path,zipPath) {
		var files = "";
		var filesArray = new Array();
		//console.log(file.getRealPath());
		var url1 = '';
		if (plus.os.name == 'iOS') {
			url1 = path;
		} else{
			url1 = "file://" +  path;
		}
		mui.ajax(url1, {
			async: false,
			dataType: 'json',
			success: function(response) {
				files = response['file'];
				plus.storage.setItem("version",response.version);
			},error: function(a,b,c){
				console.log("aaaaa");
			}
		});
		mui.each(files, function(index, item) {
			if(item instanceof Array){
				for(var i in item) {
					filesArray.push(item[i]);
				}
			}
		});
		//处理下文件是否存在
		for(var i in filesArray){
			plus.io.resolveLocalFileSystemURL(zipPath + "/" + filesArray[i].src,function(){},function(error){
				console.log(error);
			});
		}
		return filesArray;
	}
})(window.hotUpdate = {});

