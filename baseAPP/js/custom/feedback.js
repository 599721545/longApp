/*!
 *
 */
(function() {
	var index = 1;
	var size = null;
	var imageIndexIdNum = 0;
	var starIndex = 0;
	var feedback = 	{
		form: new FormData(document.getElementById('customerForm')),
		//question: document.getElementById('question'), 
		//contact: document.getElementById('contact'), 
		imageList: document.getElementById('image-list'),
		submitBtn: document.getElementById('submit')
	};
	var stateText = localStorage.getItem('$state') || "{}";
	var localstate = JSON.parse(stateText);
	var url = "http://"+serverIp+":8080/app_base/order/insertOrderAjax?token="+encodeURIComponent(localstate.token);//"e4oOJBcJOzknMEu1NKmORA==";
	//"http://'+serverIp+'/app_base/util/upLoad/0001/"; //'https://service.dcloud.net.cn/feedback';
	feedback.files = [];
	feedback.uploader = null;  
	feedback.deviceInfo = null; 
	mui.plusReady(function() {
		//设备信息，无需修改
		feedback.deviceInfo = {
			appid: plus.runtime.appid, 
			imei: plus.device.imei, //设备标识
			images: feedback.files, //图片文件
			p: mui.os.android ? 'a' : 'i', //平台类型，i表示iOS平台，a表示Android平台。
			md: plus.device.model, //设备型号
			app_version: plus.runtime.version,
			plus_version: plus.runtime.innerVersion, //基座版本号
			os:  mui.os.version,
			net: ''+plus.networkinfo.getCurrentType()
		}
	});
	/**
	 *提交成功之后，恢复表单项 
	 */
	feedback.clearForm = function() {
		//feedback.question.value = '';
		//feedback.contact.value = '';
		feedback.imageList.innerHTML = '';
		feedback.newPlaceholder();
		feedback.files = [];
		index = 0;
		size = 0;
		imageIndexIdNum = 0;
		starIndex = 0;
		//清除所有星标
		mui('.icons i').each(function (index,element) {
			if (element.classList.contains('mui-icon-star-filled')) {
				element.classList.add('mui-icon-star')
	  			element.classList.remove('mui-icon-star-filled')
			}
		})
	};
	feedback.getFileInputArray = function() {
		return [].slice.call(feedback.imageList.querySelectorAll('.file'));
	};
	feedback.addFile = function(path) {
		feedback.files.push({name:"images"+index,path:path,id:"img-"+index});
		index++;
	};
	/**
	 * 初始化图片域占位
	 */
	feedback.newPlaceholder = function() {
		var fileInputArray = feedback.getFileInputArray();
		if (fileInputArray &&
			fileInputArray.length > 0 &&
			fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
			return;
		};
		imageIndexIdNum++;
		var placeholder = document.createElement('div');
		placeholder.setAttribute('class', 'image-item space');
		var up = document.createElement("div");
		up.setAttribute('class','image-up')
		//删除图片
		var closeButton = document.createElement('div');
		closeButton.setAttribute('class', 'image-close');
		closeButton.innerHTML = 'X';
		closeButton.id = "img-"+index;
		//小X的点击事件
		closeButton.addEventListener('tap', function(event) {
			setTimeout(function() {
				for(var temp=0;temp<feedback.files.length;temp++){
					if(feedback.files[temp].id==closeButton.id){
						feedback.files.splice(temp,1);
					}
				}
				feedback.imageList.removeChild(placeholder);
			}, 0);
			return false;
		}, false);
		
		//
		var fileInput = document.createElement('div');
		fileInput.setAttribute('class', 'file');
		fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
		function compressImageAddFile (e, name,target,index) {
			plus.zip.compressImage({
				src: e,
				dst: '_doc/' + name,
				overwrite: true,
				quality: 50
			}, function(zip) {
				size += zip.size
				console.log("filesize:" + zip.size + ",totalsize:" + size);
				if(size > (10 * 1024 * 1024)) {
					return mui.toast('文件超大,请重新选择~');
				}
				if(!target.parentNode.classList.contains('space')) { //已有图片
					feedback.files.splice(index - 1, 1, {
						name: "images" + index,
						path: e
					});
				} else { //加号
					placeholder.classList.remove('space');
					feedback.addFile(zip.target);
					feedback.newPlaceholder();
				}
				up.classList.remove('image-up');
				placeholder.style.backgroundImage = 'url(' + zip.target + ')';
			}, function(zipe) {
				mui.toast('压缩失败！')
			});
		}
		fileInput.addEventListener('tap', function(event) {
			var self = this;
			var index = (this.id).substr(-1);
			
			var btnArray = [{
				title: "拍照"
			}, {
				title: "从相册选择"
			}];
			plus.nativeUI.actionSheet({
				title: "选择照片",
				cancel: "取消",
				buttons: btnArray
			}, function(e) {
				var index = e.index;
				switch (index) {
					case 0:
						break;
					case 1:
						var cmr = plus.camera.getCamera();
						cmr.captureImage(function(path) {
/*										send({
											sender: 'self',
											type: 'image',
											content: "file://" + plus.io.convertLocalFileSystemURL(path)
										});*/
							var pathUri = "file://" + plus.io.convertLocalFileSystemURL(path);
							var name = pathUri.substr(pathUri.lastIndexOf('/') + 1);
							console.log("name:"+name);
							compressImageAddFile(pathUri,name,self,index);	
						}, function(err) {});
						break;
					case 2:
						/*plus.gallery.pick(function(path) {
							send({
								sender: 'self',
								type: 'image',
								content: path
							});
						}, function(err) {}, null);*/
									plus.gallery.pick(function(e) {
						//				console.log("event:"+e);
										var name = e.substr(e.lastIndexOf('/') + 1);
										console.log("name:"+name);
										compressImageAddFile(e, name, self, index);	
									}, function(e) {
										mui.toast(e.message);
									},{});
						break;
				}
			});

		}, false);
		placeholder.appendChild(closeButton);
		placeholder.appendChild(up);
		placeholder.appendChild(fileInput);
		feedback.imageList.appendChild(placeholder);
	};
	feedback.newPlaceholder();
	function GetRadioValue(RadioName){
	    var obj;    
	    obj=document.getElementsByName(RadioName);
	    if(obj!=null){
	        var i;
	        for(i=0;i<obj.length;i++){
	            if(obj[i].checked){
	                return obj[i].value;            
	            }
	        }
	    }
	    return null;
	}
	feedback.submitBtn.addEventListener('tap', function(event) {
//		if (//feedback.question.value == '' ||
//			(feedback.contact.value != '' &&
//				feedback.contact.value.search(/^(\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+)|([1-9]\d{4,9})$/) != 0)) {
//			return mui.toast('信息填写不符合规范');
//		}
//		if (//feedback.question.value.length > 200 || 
//			feedback.contact.value.length > 200) {
//			return mui.toast('信息超长,请重新填写~')
//		}
		//判断网络连接
		if(plus.networkinfo.getCurrentType()==plus.networkinfo.CONNECTION_NONE){
			return mui.toast("连接网络失败，请稍后再试");
		}
//		console.log(mui(this.form));

		var formInfo ={
			customerName: document.getElementsByName('customerName')[0].value,
			customerPhone: document.getElementsByName('customerPhone')[0].value,
			carBrand: document.getElementsByName('carBrand')[0].value,
			carFirm: document.getElementsByName('carFirm')[0].value,
			carDept: document.getElementsByName('carDept')[0].value,
			carType: document.getElementsByName('carType')[0].value,
			carId: document.getElementsByName('carId')[0].value,
			rentPlan: document.getElementsByName('rentPlan')[0].value,
			rentFirstPay: document.getElementsByName('rentFirstPay')[0].value,
			rentRate: document.getElementsByName('rentRate')[0].value,
			rentBond: document.getElementsByName('rentBond')[0].value,
			rentTerm: document.getElementsByName('rentTerm')[0].value,
			bankNum: document.getElementsByName('bankNum')[0].value,
		};
		var customerTypeRadioValue=GetRadioValue('customerType');
		if(customerTypeRadioValue){
			formInfo.customerType=customerTypeRadioValue;
			if(customerTypeRadioValue==0){
				formInfo.customerCode=document.getElementsByName('enterpriseCode')[0].value;
			}else{
				formInfo.customerCode=document.getElementsByName('personalCode')[0].value;
			}
		}

		feedback.send(mui.extend(true, {}, feedback.deviceInfo, formInfo/*{
			//content: feedback.question.value,
			contact: feedback.contact.value,
			images: feedback.files,
			score:''+starIndex
		}*/)) 
	}, false)
	feedback.send = function(content) {
		console.log(content);
		feedback.uploader = plus.uploader.createUpload(url, {
			method: 'POST'
		}, function(upload, status) {
//			plus.nativeUI.closeWaiting()
			console.log("upload cb:"+upload.responseText);
			if(status==200){
				var data = JSON.parse(upload.responseText);
				//上传成功，重置表单
				if (data.ret === 0 && data.desc === 'Success') {
//					mui.toast('反馈成功~')
					console.log("upload success");
//					feedback.clearForm();
				}
			}else{
				console.log("upload fail");
			}
			
		});
		//添加上传数据
		mui.each(content, function(index, element) {
			if (index !== 'images') {
				console.log("addData:"+index+","+element);
//				console.log(index);
				feedback.uploader.addData(index, element)
			} 
		});
		//添加上传文件
		mui.each(feedback.files, function(index, element) {
			var f = feedback.files[index];
			console.log("addFile:"+JSON.stringify(f));
			feedback.uploader.addFile(f.path, {
				key: f.name
			});
		});
		//开始上传任务
		feedback.uploader.start();
		mui.alert("上传证件以及信息保存成功，点击确定关闭","客户下单","确定",function () {
			feedback.clearForm();
			mui.back();
		});
//		plus.nativeUI.showWaiting();
	};
	
	 //应用评分
	 mui('.icons').on('tap','i',function(){
	  	var index = parseInt(this.getAttribute("data-index"));
	  	var parent = this.parentNode;
	  	var children = parent.children;
	  	if(this.classList.contains("mui-icon-star")){
	  		for(var i=0;i<index;i++){
  				children[i].classList.remove('mui-icon-star');
  				children[i].classList.add('mui-icon-star-filled');
	  		}
	  	}else{
	  		for (var i = index; i < 5; i++) {
	  			children[i].classList.add('mui-icon-star')
	  			children[i].classList.remove('mui-icon-star-filled')
	  		}
	  	}
	  	starIndex = index;
  });
  	//选择快捷输入
	mui('.mui-popover').on('tap','li',function(e){
	  //document.getElementById("question").value = document.getElementById("question").value + this.children[0].innerHTML;
	  mui('.mui-popover').popover('toggle')
	}) 
})();
