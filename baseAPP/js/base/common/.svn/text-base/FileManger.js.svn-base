/*
 * 文件管理
 * 调用请在plus.ready后
 */
(function(f) {
	//安卓复制文件,移动先复制，后删除
	f.moveFileAndroid = function(oldPath, newPath) {
		oldPath = plus.io.convertLocalFileSystemURL(oldPath);
		newPath = plus.io.convertLocalFileSystemURL(newPath);
		var RandomAccessFile = plus.android.importClass('java.io.RandomAccessFile');
		var FileChannel = plus.android.importClass('java.nio.channels.FileChannel');
		var ByteBuffer = plus.android.importClass('java.nio.ByteBuffer');
		var FileClass = plus.android.importClass('java.io.File');
		var fileDir = new FileClass(oldPath);
		if(!fileDir.getParentFile().exists()) {
			if(!fileDir.getParentFile().mkdirs()) {
				//console.log(fileDir.getParentFile()+"创建失败");
			}
		}
		oldfile = new RandomAccessFile(oldPath, 'rw');
		newfile = new RandomAccessFile(newPath, 'rw');
		inChannel = oldfile.getChannel();
		outChannel = newfile.getChannel();
		outChannel.transferTo(0, outChannel.size(), inChannel);
		inChannel.close();
		outChannel.close();
		oldfile.close();
		newfile.close();
		//console.log('文件复制成功');
	}
	/**
	 * 备份文件
	 * @param {Object} filePath 被备份的文件
	 * @param {Object} folder 下载zip的文件夹
	 */
	f.fileBackupsAndroid = function(filePath, folder) {
		console.log("备份开始");
		console.log("备份文件夹：" + filePath);
		var backupsFolderPath = filePath.split("www")[1];
		backupsPath = plus.io.convertLocalFileSystemURL("_www/backups/" + folder + backupsFolderPath);
		filePath = plus.io.convertLocalFileSystemURL(filePath);
		var RandomAccessFile = plus.android.importClass('java.io.RandomAccessFile');
		var FileChannel = plus.android.importClass('java.nio.channels.FileChannel');
		var ByteBuffer = plus.android.importClass('java.nio.ByteBuffer');
		var FileClass = plus.android.importClass('java.io.File');
		var fileBackupsDir = new FileClass(filePath);
		if(fileBackupsDir.exists()) {
			var fileDir = new FileClass(backupsPath);
			//console.log(backupsPath);
			if(!fileDir.getParentFile().exists()) {
				if(!fileDir.getParentFile().mkdirs()) {
					//console.log(fileDir.getParentFile()+"创建备份文件夹失败");
				}
			}
			if(!fileBackupsDir.getParentFile().exists()) {
				if(!fileBackupsDir.getParentFile().mkdirs()) {
					//console.log(fileBackupsDir.getParentFile()+"创建备份文件路径失败");
				}
			}
			backupsPath = new RandomAccessFile(backupsPath, 'rw');
			filePath = new RandomAccessFile(filePath, 'rw');
			inChannel = backupsPath.getChannel();
			outChannel = filePath.getChannel();
			outChannel.transferTo(0, outChannel.size(), inChannel);
			inChannel.close();
			outChannel.close();
			filePath.close();
			backupsPath.close();
			//console.log('备份文件成功');
		} else {
			console.log('备份文件不存在');
		}
	}
	f.fileBackupsIos = function(filePath, backupFile) {
		var backupsFolderPath = filePath.split("www")[1];
		backupsPath = plus.io.convertLocalFileSystemURL("_www/backups/" + backupFile);
		filePath = plus.io.convertLocalFileSystemURL(filePath);
		var nfm = plus.ios.importClass('NSFileManager');
		var err = plus.ios.importClass('NSError');
		var nsd = plus.ios.importClass('NSDictionary');
		var nsds = new nsd();
		var errors = new err();
		var fm = new nfm();
		nsds.NSFilePosixPermissions = 777;
		if(fm.fileExistsAtPath(filePath) && fm.isReadableFileAtPath(filePath)) {
			var backupsfilePath = backupsPath.substr(0, backupsPath.lastIndexOf('/'));
			var createFlag = fm.createDirectoryAtPathwithIntermediateDirectoriesattributeserror(backupsfilePath, true, 'nil', errors);
			var result = fm.moveItemAtPathtoPatherror(filePath, backupsPath, errors);
			if(result) {
				//console.log('备份文件成功');
			} else {
				console.log('备份文件失败,源文件未找到');
			}
		} else {
			console.log('备份文件失败,源文件未找到');
		}
	}

	//安卓删除文件
	f.deleteFileAndroid = function(path) {
		var File = plus.android.importClass("java.io.File");
		var dpath = plus.io.convertLocalFileSystemURL(path);
		var fd = new File(dpath);
		if(fd != null && fd.exists()) {
			fd.delete();
			//console.log(dpath + "删除成功!");
		}
	}

	//ios删除
	f.deleteFileIos = function(path) {
		var nfm = plus.ios.importClass('NSFileManager');
		var err = plus.ios.importClass('NSError');
		var errors = new err();
		var fm = new nfm();
		path = plus.io.convertLocalFileSystemURL(path);
		var result = fm.removeItemAtPatherror(path, errors);
		//console.log("ios删除文件结果：" + result);
	}

	//ios移动
	f.moveFileIos = function(oldPath, newPath) {
		oldPath = plus.io.convertLocalFileSystemURL(oldPath);
		newPath = plus.io.convertLocalFileSystemURL(newPath);
		var nfm = plus.ios.importClass('NSFileManager');
		var err = plus.ios.importClass('NSError');
		var nsd = plus.ios.importClass('NSDictionary');
		var nsds = new nsd();
		var errors = new err();
		var fm = new nfm();
		var olddirPath = oldPath.substr(0, oldPath.lastIndexOf('/'));
		var df = fm.fileExistsAtPath(oldPath);
		//console.log("是否存在文件"+df);
		var createFlag = fm.createDirectoryAtPathwithIntermediateDirectoriesattributeserror(olddirPath, false, nsds, errors);
		//console.log("是否创建文件夹："+createFlag);
		console.log(oldPath);
		var result = fm.moveItemAtPathtoPatherror(newPath, oldPath, errors);
		//console.log("ios移动文件结果：" + result);
	}
	//IOS写文件
	f.writeFileIos = function(str, filePath) {
		str = JSON.stringify(str);
		var nfm = plus.ios.importClass('NSFileManager');
		var fm = new nfm();
		var result = fm.createFileAtPathcontentsattributes(filePath, str, null);
		//console.log('写入文件-----'+result);
	}

	//删除目录下文件
	f.deleteFileDir = function(parentDir) {
		//parentDir = '_doc/downloads/'
		plus.io.resolveLocalFileSystemURL(parentDir, function(fs) {
			if(fs.isDirectory) { //目录文件
				fs.removeRecursively(function() {
					//console.log("success");
				}, function() {
					//console.log("dg error");
				});
			} else if(fs.isFile) { //文件
				fs.remove(function() {
					//console.log(parentDir+"文件删除成功");
				}, function() {
					console.log(parentDir+"文件删除失败");
				});
			}
		}, function() {
			console.log("删除文件或目录'"+parentDir+"'失败!");
		});
	}
	//写入文件android
	f.writeFileAndroid = function(content, filePath) {
		var JavaFile = plus.android.importClass('java.io.File');
		var FileWriter = plus.android.importClass('java.io.FileWriter');
		var BufferedWriter = plus.android.importClass('java.io.BufferedWriter');
		var files = new JavaFile(filePath);
		if(!files.exists()){
			files.createNewFile();
		}
		var fileWritter = new FileWriter(files, false);
		content = JSON.stringify(content);
		fileWritter.write(content);
		fileWritter.close();

	}

	//获取项目根路径
	f.getRealPath = function() {
		var curWwwPath = window.document.location.href;
		var pathName = window.document.location.pathname;
		var pos = curWwwPath.indexOf(pathName);
		var localhostPaht = curWwwPath.substring(0, pos);
		var projectName = pathName.substring(0, pathName.substr(1).indexOf('www/') + 5);
		var realPath = localhostPaht + projectName;
		return realPath;
	}
})(window.file = {});