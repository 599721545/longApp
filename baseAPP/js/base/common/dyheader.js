/***
 * 动态表头配置
 * 需要mui.js支持
 * 在plusready内调用
 * 使用方法：在所需页面引入此js，直接调用dyheader即可使用本插件
 * @param {Object} dh
 */
(function(dh) {
	/***
	 * 创建表头的初始化方法
	 * 表头的高度、颜色，文字的位置、样式，左上角箭头的图片、位置、大小都可以配置，在下方方法中个配置项都有注释
	 * @param {Object} url 打开页面的url
	 * @param {Object} id 打开页面的id标识
	 * @param {Object} extras 附带的额外参数，object类型
	 * 调用方法:dyheader.init(url,id,extras);
	 */
	dh.init = function(url, id, extras) {
		//校验extras
		var extra = extras || {};
		var nView = getTitleNView(id);
		var NView = { //WebviewTitleNViewStyles类型,定义窗口的标题栏控件样式.设置此属性值则表明创建Webview窗口的标题栏控件,并可通过其属性值设置背景颜色、文本内容、文本颜色等.通过Webview窗口的getTitleNView()方法可获取标题栏控件对象.http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewTitleNViewStyles
			autoBackButton: true, //Boolean类型,标题栏控件是否显示左侧返回按钮.true:显示返回按钮.false:不显示返回按钮.默认:false.返回按钮的颜色为窗口标题文字颜色,按下时颜色自动调整透明度为0.3.点击返回按钮的逻辑与按下系统返回键逻辑一致.
			backgroundColor: "#fff", //String类型,标题栏控件的背景颜色.颜色值格式为"#RRGGBB",如"#FF0000"表示为红色背景,默认值为"#F7F7F7".
			buttons: [],
//			type: "default",//String类型,标题栏控件样式.default:默认样式,顶部停靠显示,挤压Webview页面内容显示区域;transparent:透明样式,顶部沉浸式显示覆盖Webview页面内容,标题栏上内容(除按钮外)全部透明,当页面滚动时透明度逐渐变化,直到不透明显示.默认:default.
//			coverage: '132px', //String类型,标题栏控件变化作用范围.仅在type值为transparent时有效,页面滚动时标题栏背景透明度将发生变化.当页面滚动到指定偏移量时标题栏背景变为完全不透明.支持百分比、像素值,默认为'132px'.
//			progress: { //WebviewProgressStyles类型,标题栏控件的进度条样式.设置此属性则在标题栏控件的底部显示进度条,可配置进度条颜色值即高度.设置此属性值为undefined或null则隐藏进度条.默认不显示底部进度条.
//				color: '', //String类型,进度条颜色.可取值:"#RRGGBB"格式字符串,如"#FF0000"表示绘制红色分割线;"rgba(R,G,B,A)",其中R/G/B分别代表红色值/绿色值/蓝色值,正整数类型,取值范围为0-255,A为透明度,浮点数类型,取值范围为0-1(0为全透明,1为不透明),如"rgba(255,0,0,0.5)",表示红色半透明.默认值为"#00FF00".
//				height: '', //String类型,进度条高度.可取值:像素值(逻辑像素),支持小数点,如"1px"表示1像素高;百分比,如"1%",相对于标题栏控件的高度.默认值为"2px".
//			},
			splitLine: { //WebviewSplitLineStyles类型,标题栏控件的底部分割线.设置此属性则在标题栏控件的底部显示分割线,可配置颜色值及高度.设置此属性值为undefined或null则隐藏分割线.默认不显示底部分割线.
				color: '#e6e6e6', //String类型,进度条颜色.可取值:"#RRGGBB"格式字符串,如"#FF0000"表示绘制红色分割线;"rgba(R,G,B,A)",其中R/G/B分别代表红色值/绿色值/蓝色值,正整数类型,取值范围为0-255,A为透明度,浮点数类型,取值范围为0-1(0为全透明,1为不透明),如"rgba(255,0,0,0.5)",表示红色半透明.默认值为"#cccccc".
				height: '1px', //String类型,底部分割线高度.可取值:像素值(逻辑像素),支持小数点,如"1px"表示1像素高;百分比,如"1%",相对于标题栏控件的高度.默认值为"1px".
			}
//			titleColor: "#000", //String类型,标题栏控件的标题文字颜色.颜色值格式为"#RRGGBB",如"#FF0000"表示标题文字颜色为红色,默认值为"#000000".
//			titleOverflow: "ellipsis", //String类型,标题栏控件的标题文字超出显示区域时处理方式.clip:超出显示区域时内容裁剪;ellipsis:超出显示区域时尾部显示省略标记(...).默认:ellipsis.
//			titleText: "测试DEMO", //String类型,标题栏控件的标题文字内容.在标题栏控件居中(水平和垂直)显示,左右边距为88px,如果文本过长则尾部裁剪(加三个点"...")显示.当不设置titleText属性或属性值为undefined/null时,使用当前Webview窗口加载页面的标题,并自动同步更新页面的标题.
//			titleSize: "20px", //String类型,标题栏控件的标题文字字体大小.字体大小单位为像素,如"20px"表示字体大小为20像素,默认值为17像素.
		}

		NView = copy(nView, NView);

		for(var n in NView.buttons){
			if(NView.buttons[n].click){
				NView.buttons[n].onclick = function(item){
					eval(item.click);
				}
			}
		}

		mui.openWindow({
			url: url, //这里是给那个页面加表头的url
			id: id, //这个是页面的id，用于操作这个页面的
			createNew: false, //Boolean类型,是否重复创建相同id的webview.true:不判断重复,每次都新建webview.fasle:先查找当前App中是否已存在同样id的webview，若存在则直接显示；否则新创建并根据show参数执行显示逻辑.默认:false.注意:plusReady事件仅在webview首次创建时触发,使用mui.openWindow方法多次打开已存在的同样id的webview时,是不会重复触发plusReady事件的;因此若业务写在plusReady事件中,可能会出现执行结果和预期不一致的情况;此时可通过自定义事件触发.
			waiting: {
				autoShow: false,
				title: '加载中...', //等待框上的提示文字
				options: { //原生等待对话框的参数
					width: '20px', //String类型,等待框背景区域的宽度.值支持像素值("500px")或百分比("50%"),百分比相对于屏幕的宽计算,如果不设置则根据内容自动计算合适的宽度.
					height: '20px', //String类型,等待框背景区域的高度.值支持像素绝对值("500px")或百分比("50%")，如果不设置则根据内容自动计算合适的高度.
					color: '#ff0000', //String类型,等待框中文字的颜色.颜色值支持(参考CSS颜色规范):颜色名称(参考CSS Color Names)/十六进制值/rgb值/rgba值,默认值为白色.
					size: '14px', //String类型,等待框中文字的字体大小.如"14px"表示使用14像素高的文字,未设置则使用系统默认字体大小.
					textalign: 'center', //String类型,等待对话框中标题文字的水平对齐方式.left:水平居左对齐显示.center:水平居中对齐显示.right:水平居右对齐显示.默认:center.
					//padding: '', //String类型,等待对话框的内边距.值支持像素值("10px")和百分比("5%"),百分比相对于屏幕的宽计算,默认值为"3%".
					//background: '', //String类型,等待对话框显示区域的背景色.背景色的值支持(参考CSS颜色规范):颜色名称(参考CSS Color Names)/十六进制值/rgb值/rgba值,默认值为rgba(0,0,0,0.8).
					//style: '', //String类型,等待对话框样式.black:黑色雪花样式,通常在背景主色为浅色时使用.white表示等待框为白色雪花样式,通常在背景主色为深色时使用.默认:white.安卓不支持.
					//modal: true, //Boolen类型,等待框是否模态显示.模态显示时用户不可操作直到等待对话框关闭，否则用户在等待对话框显示时也可操作下面的内容.默认true.
					//round: '10px', //Number类型,等待框显示区域的圆角.值支持像素值"10px",未设置时使用默认值"10px".
					//padlock: false, //Boolen类型,点击等待显示区域是否自动关闭.true:点击等待对话框显示区域时自动关闭.false:不关闭.默认:false.
					//back: '', //String类型,返回键处理方式.none:截获处理返回键,但不做任何响应.close:截获处理返回键并关闭等待框.transmit:不截获返回键,向后传递给Webview窗口继续处理(与未显示等待框的情况一致).iOS不支持.
					/*loading: { //WaitingLoadingOptions类型,自定义等待框上loading图标样式.
						display: '', //String类型,loading图标显示样式.block:图标与文字分开两行显示,上面显示loading图标,下面显示文字.inline:loading图标与文字在同一行显示,左边显示loading图标,右边显示文字.none:不显示loading图标.
						height: '', //String类型,loading图标高度.设置loading图标的高度(宽度等比率缩放),取值类型:像素值,如"14px"表示14像素高.
						icon: '', //String类型,loading图标路径.自定义loading图标的路径,png格式,并且必须是本地资源地址;loading图要求宽是高的整数倍,显示等待框时按照图片的高横向截取每帧刷新.
						interval: 100 //Number类型,loading图每帧刷新间隔.单位为ms(毫秒),默认值为100ms.
					}*/
				}
			},
			show: { //窗口显示控制参数
				autoShow: true, //Boolean类型,目标窗口loaded事件发生后,是否自动显示.true:loaded事件发生后自动显示.false:仅创建但不显示webview.若目标页面为预加载页面,则该参数无效.
				aniShow: 'none', //AnimationTypeShow类型.auto:自动选择动画效果,使用上次显示窗口设置的动画效果,如果是第一次显示则默认动画效果"none".none:立即显示页面,无任何动画效果,页面显示默认的动画效果.此效果忽略动画时间参数,立即显示.对应关闭动画"none".slide-in-right:页面从屏幕右侧外向内横向滑动显示.对应关闭动画"slide-out-right".slide-in-left:页面从屏幕左侧向右横向滑动显示.对应关闭动画"slide-out-left".slide-in-top:页面从屏幕上侧向下竖向滑动显示.对应关闭动画"slide-out-top".slide-in-bottom:页面从屏幕下侧向上竖向滑动显示.对应关闭动画"slide-out-bottom".fade-in:页面从完全透明到不透明逐渐显示.对应关闭动画"fade-out".zoom-out:页面在屏幕中间从小到大逐渐放大显示.对应关闭动画"zoom-in".zoom-fade-out:页面在屏幕中间从小到大逐渐放大并且从透明到不透明逐渐显示.对应关闭动画"zoom-fade-in".pop-in:页面从屏幕右侧滑入显示,同时上一个页面带阴影效果从屏幕左侧滑出隐藏.对应关闭动画"pop-out".http://www.dcloud.io/docs/api/zh_cn/webview.html#plus.webview.AnimationTypeShow.
				duration: 600, //显示Webview窗口动画的持续时间,单位为ms
				event: 'loaded', //页面显示时机.loaded:当页面加载完成时触发此事件.titleUpdate:此事件会先于loaded事件触发,通常在加载页面时通过此事件可更快获取到页面的标题<title></title>.loaded常用于判断页面是否载入完毕,载入完毕才显示新页面.但有时页面内容很长时,全部载入完毕比较慢,导致显示新窗体比较慢.为了让新窗体打开快点,我们可以在titleUpdate时就显示新窗体.
				/*extras: { //窗口动画是否使用图片加速.http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewExtraOptions
					acceleration: 'auto', //String类型,窗口动画加速.开启窗口动画加速功能可优化窗口动画效果,提升动画流程度,可避免部分设备上打开(关闭)窗口闪屏的问题.auto:自动优化窗口动画.none:关闭窗口动画加速功能.capture:使用截屏方式加速窗口动画.默认:auto.iOS不支持.
					capture: '', //Bitmap类型,窗口动画加速时使用的图片.当使用截屏方式加速窗口动画时,可设置已经创建好的截屏图片,此时不会进行实时截屏操作,加速窗口动画响应时间,提升用户体验.如果未指定截屏图片,则实时截取当前Webview窗口对象的图片进行动画操作.如果窗口未使用截屏方式加速动画,则忽略此参数.iOS不支持.
					otherCapture: '' //Bitmap类型,关联窗口动画使用的图片.当使用截屏方式加速窗口动画时,可设置已经创建好的截屏图片,此时不会进行实时截屏操作,加速关联窗口动画响应时间,提升用户体验。 如果未指定截屏图片,则实时截取关联Webview窗口对象的图片进行动画操作.如果窗口未使用截屏方式加速动画,则忽略此参数.iOS不支持
				}*/
			},
			styles: {
				//标题栏配置
				titleNView: NView,
				bounce: "all", //可取值： "none" - 表示没有反弹效果； "vertical" - 表示垂直方向有反弹效果； "horizontal" - 表示水平方向有反弹效果； "all" - 表示垂直和水平方向都有反弹效果。 默认值为"none"。
//				bounceBackground: "#FF0000", //android不支持;窗口回弹效果区域背景可支持颜色值或图片： 颜色值格式为"#RRGGBB"，如"#FFFFFF"为设置白色背景； 背景图为"url(%image path%)"，如"url(./icon.png)"为设置icon.png为背景图，图片采用平铺模式绘制。
				popGesture: "close", //可取值"none"：无侧滑返回功能；"close"：侧滑返回关闭Webview窗口；"hide"：侧滑返回隐藏webview窗口。
				scalable: false, //窗口设置为可缩放（scalable:true）时，用户可通过双指操作放大或缩小页面，此时html页面可通过meta节点设置“name="viewport" content="user-scalable=no"”来限制页面不可缩放。 窗口设置为不可缩放（scalable:false）时，用户不可通过双指操作放大或缩小页面，即使页面中的meta节点也无法开启可缩放功能。 默认值为false，即不可缩放。
				scrollIndicator: "none", //用于控制窗口滚动条样式，可取值： "all"：垂直和水平滚动条都显示； "vertical"：仅显示垂直滚动条； "horizontal"：仅显示水平滚动条； "none"：垂直和水平滚动条都不显示。 默认值为"all"，即垂直和水平滚动条都显示。 注意：显示滚动条的前提条件是窗口中的内容超过窗口显示的宽或高。
				scrollsToTop: true, //android不支持;true表示点击设备的状态栏可以滚动返回至顶部，false表示点击设备的状态栏不可以，默认值为true。 此功能仅iOS平台支持，在iPhone上有且只有一个Webview窗口的scrollsToTop属性值为true时才生效，所以在显示和关闭Webview窗口时需动态更新所有Webview的scrollsToTop值，已确保此功能生效。
//				statusbar: {
//					background: "#fff"
//				}, //颜色值格式为"#RRGGBB"，如"#FF0000"表示为红色背景。 默认值为应用manifest.json中plus->statusbar->background属性配置的值，如果未配置此属性值，则使用系统默认状态栏的背景颜色。

				//窗口动画优化方式
				animationOptimization: "auto", //ios不支持;可取值： "auto" - 如果窗口中存在titleNView或subNViews，窗口动画时真实Webview控件从动画窗口中移除加速（避免真实Webview渲染影响动画效率）； "none" - 窗口动画不使用优化。 默认值为"auto"。
				//background: "#FF0000", //窗口空白区域的背景模式，设置background为颜色值(参考CSS Color Names，可取值/十六进制值/rgb值/rgba值)，窗口为独占模式显示（占整个屏幕区域）； 设置background为“transparent”，则表示窗口背景透明，为非独占模式。
				//blockNetworkImage: false, //ios不支持;布尔类型，true表示阻塞，false表示不阻塞，默认值为false。 阻塞后Webview窗口将不加载页面中使用的所有网络图片，可通过Webview窗口对象的setBlockNetWorkImage()方法动态修改此状态。
				//decelerationRate: 0.1, //android不支持;当Webview加载的内容超过其高度时，可以拖拽滑动内容，decelerationRate属性控制手指松开后页面滑动的速度。 设置值越大手指松开后的滑动速度越快（滑动距离越长），其值域范围为0.0-1.0，默认值为0.989。
				//errorPage:"", //当Webview窗口无法加载指定的url地址时（如本地页面不存在，或者无法访问的网络地址），此时会自动跳转到指定的错误页面地址（仅支持本地页面地址）。 设置为“none”则关闭跳转到错误页面功能，此时页面显示Webview默认的错误页面内容。默认使用5+ Runtime内置的错误页面。
				//transition: {
				//	property: "all",
				//	duration: "3",
				//	timingfunction: "ease-out"
				//} //可取值： "linear"：匀速变化，匀速动画效果； "ease-in"：匀加速变化，逐渐变快的动画效果； "ease-out"：匀减速变化，逐渐变慢的动画效果； "ease-in-out"：先加速后减速变化，先变快后变慢的动画效果。 默认值为"ease-in-out"。
				//videoFullscreen:"", //可取值： "auto": 自动适配，如果当前页面竖屏，则竖屏显示；如果当前页面横盘显示，则横屏；如果当前页面自动感应，则自动感应横竖屏切换。 "portrait-primary": 竖屏正方向； "portrait-secondary": 竖屏反方向，屏幕正方向按顺时针旋转180°； "landscape-primary": 横屏正方向，屏幕正方向按顺时针旋转90°； "landscape-secondary": 横屏方向，屏幕正方向按顺时针旋转270°； "landscape": 横屏正方向或反方向，根据设备重力感应器自动调整； 默认值为“auto”。
				//userSelect:true, //可取值： true - 表示可选择内容，用户可通过长按来选择页面内容，如文本内容选择后可以弹出系统复制粘贴菜单； false - 表示不可选择内容，用户不可通过长按来选择页面内容。 默认值为true。 注意：在Web页面中可通过CSS的user-select对单个页面元素进行控制，前提是Webview对象的userSelect设置为true，否则CSS设置的user-select失效。
				//mask: 'rgba(0,0,0,0.5)', //用于设置Webview窗口的遮罩层样式，遮罩层会覆盖Webview中所有内容，包括子webview，并且截获webview的所有触屏事件，此时Webview窗口的点击操作会触发maskClick事件。 字符串类型，可取值： rgba格式字符串，定义纯色遮罩层样式，如"rgba(0,0,0,0.5)"，表示黑色半透明； "none"，表示不使用遮罩层； 默认值为"none"，即无遮罩层。

			},
			extras: extra
		});
	}

	//获取标题栏配置
	function getTitleNView(id) {
		var result = {};
		var path = getRealPath();
		//console.log(path+"------------------");
		mui.ajax(path + 'js/base/common/dyheader.json',{
			dataType: 'json', //服务器返回json格式数据
			type: 'GET', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			async: false,
			success: function(resp) {
				//console.log(resp[id]);
				result = resp[id];
			},
			error: function(xhr, type, errorThrown) {
				console.log(type);
			}
		});
		return result;
	}

	//深复制
	function copy(obj1, obj2) {
		var obj2 = obj2 || {}; //最初的时候给它一个初始值=它自己或者是一个json
		for(var name in obj1) {
			if(typeof obj1[name] === "object") { //先判断一下obj[name]是不是一个对象
				obj2[name] = (obj1[name].constructor === Array) ? [] : {}; //我们让要复制的对象的name项=数组或者是json
				copy(obj1[name], obj2[name]); //然后来无限调用函数自己 递归思想
			} else {
				obj2[name] = obj1[name]; //如果不是对象，直接等于即可，不会发生引用。
			}
		}
		return obj2; //然后在把复制好的对象给return出去
	}

	//第二个按钮的点击事件，看json文件配置的函数名(仅供参考)
	function click(item) {
		console.log(item);
		alert('点击');
	}
	
	//第一个按钮的点击事件，看json配置的函数名（仅供参考）
	function back(id){
		var w = plus.webview.getWebviewById(id);
		w.close();
	}
})(window.dyheader = {})