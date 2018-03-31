var message = null;
// 监听plusready事件  
document.addEventListener( "plusready", function(){
	message = document.getElementById("message");
	// 监听点击消息事件
	plus.push.addEventListener( "click", function( msg ) {
		// 判断是从本地创建还是离线推送的消息
		switch( msg.payload ) {
			case "LocalMSG":
				outSet( "点击本地创建消息启动：" );
			break;
			default:
				outSet( "点击离线推送消息启动：");
			break;
		}
		// 提示点击的内容
		plus.nativeUI.alert( msg.content );
		// 处理其它数据
	}, false );
	// 监听在线消息事件
	plus.push.addEventListener( "receive", function( msg ) {
		if ( msg.aps ) {  // Apple APNS message
			outSet( "接收到在线APNS消息：" );
		} else {
			outSet( "接收到在线透传消息：" );
		}
	}, false );
	
	plus.key.addEventListener('keydown', function(e) {
					console.log(e.keyCode);
					if(e.keyCode == 4) {
						var w = plus.webview.currentWebview();
						plus.screen.lockOrientation("portrait-primary");
						plus.webview.close(w);
					}
				});
}, false );


/**
 * 获取本地推送标识信息
 */
function getPushInfo(){
	var info = plus.push.getClientInfo();
	outSet( "获取客户端推送标识信息：" );
	outLine("id: "+info.id);
	outLine( "token: "+info.token );
	outLine( "clientid: "+info.clientid );
	outLine( "appid: "+info.appid );
	outLine( "appkey: "+info.appkey );
}
/**
 * 本地创建一条推动消息
 */
function createLocalPushMsg(){
	var options = {cover:false};
	var str = dateToStr(new Date());
	str += ": 您点击按钮创建了一条本地推送记录";
	plus.push.createMessage( str, "LocalMSG", options );
	outSet( "创建本地消息成功！" );
	outLine( "请到系统消息中心查看！" );
	if(plus.os.name=="iOS"){
		outLine('*如果无法创建消息，请到"设置"->"通知"中配置应用在通知中心显示!');
	}
}
/**
 * 清空所有推动消息
 */
function clearAllPush(){
	plus.push.clear();
	outSet( "清空所有推送消息成功！" );
}

function back(id) {
				var w = plus.webview.getWebviewById(id);
				w.close();
			}