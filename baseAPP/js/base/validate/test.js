//这个是demo

dataValidate.test=function(obj,callback){
	console.log("测试进入方法",obj);
	if(callback&&typeof(callback)=="function"){
		callback.call(this,obj,"回调测试");
		console.log("dsads");
	}
}