// 按 1rem =(640 / 16)px 换算
(function (doc, win) {
  var docEl = doc.documentElement,
	resizeEvt = 'orientationchange' in window ? 'orientationchange': 'resize',
	recalc = function () {
	  var clientWidth = docEl.clientWidth;
	  if (!clientWidth) return;
	  // 按照设计稿640px来计算 浏览器默认基数单位为1rem = 16px,所以这里的1rem = 640 / 16
	  docEl.style.fontSize = (640 / 16) * (clientWidth / 640) + 'px';
	};

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  recalc();
})(document, window);
$(function(){
	$.Scroll({
		//离开页面监听
		onLeave:function(page){
			page = page;
			if(page == 1){
				console.log(1);
			}
			if(page == 2){
			}
			if(page == 3){
			}
			if(page == 4){
			}
			if(page == 5){
			}
			if(page == 6){
			}
			if(page == 7){
			}
			if(page == 8){
			}
			if(page == 9){
			}
			if(page == 10){
			}
			if(page == 11){
			}
		},
		//进入页面监听
		onLoad:function(page){
			page = page;
			if(page == 1){
			}
			if(page == 2){
			}
			if(page == 3){
			}
			if(page == 4){
			}
			if(page == 5){
			}
			if(page == 6){
			}
			if(page == 7){
			}
			if(page == 8){
			}
			if(page == 9){
			}
			if(page == 10){
			}
			if(page == 11){
				console.log(11);
			}
		}
	});	
})