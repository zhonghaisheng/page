(function() {
    var Scroll = function(opts){
		var me = this,
		defaults = {
			onLeave:me.onLeave,
			onLoad:me.onLoad
		};
		me.opt = $.extend({}, defaults, opts);
		var height = $('.flip-box .pages').height();
		var _startX = 0,_startY = 0,_moveX = 0,_moveY = 0,index = 1,marX = 0,marY = 0,_flagY = 0;
		var $len = $('.pages').length;	
		/*让容器居中*/
		var _dHeight = $(window).height(),_fHeight = $('.flip-box').height();
		if(_dHeight > _fHeight){
			$('.flip-box').css({'height':$('.flip-box .pages').height(),'margin-top':(_dHeight - _fHeight) / 2});	
		}else{
			$('.flip-box').css({'height':_dHeight,'margin-top':0});	
		}
		$(window).resize(function(){
			_dHeight = $(window).height(),_fHeight = $('.flip-box').height();
			if(_dHeight > _fHeight){
				$('.flip-box').css({'height':$('.flip-box .pages').height(),'margin-top':(_dHeight - _fHeight) / 2});	
			}else{
				$('.flip-box').css({'height':_dHeight,'margin-top':0});
			}
		})
		function scrollNone(index,distance){
			$('.pages.page'+index+'').css({'transform':'translate3d(0px, '+distance+'px,0px)','transition': 'none'});
			$('.pages.page'+index+'').css({'-webkit-transform':'translate3d(0px, '+distance+'px,0px)','-webkit-transition':'none'});	
		}
		function scrollDis(index,distance){
			$('.pages.page'+index+'').css({'transform':'translate3d(0px, '+distance+'px,0px)','transition': 'all 0.5s ease-in-out'});
			$('.pages.page'+index+'').css({'-webkit-transform':'translate3d(0px, '+distance+'px,0px)','-webkit-transition': 'all 0.5s ease-in-out'});	
		}
		function moveClass(index1,index2){
			$('.flip-box .page'+index1+'').removeClass('z-active').addClass('z-current');
			$('.flip-box .page'+index2+'').addClass('z-active');
		}
		function setClass(index1,index2){
			$('.flip-box .page'+index2+'').addClass('z-active');
			window.setTimeout(function(){
				$('.flip-box .page'+index1+'').removeClass('z-current');
				$('.flip-box .page'+index2+'').removeClass('z-active').addClass('z-current');	
			},500)
		}
		$('.flip-box .page1').addClass('z-current');
		me.opt.onLeave(index);
		me.opt.onLoad(index);
		$('.flip-box')[0].addEventListener('touchstart',function(event){
			_startX = event.touches[0].clientX;
			_startY = event.touches[0].clientY;
			_flagX = _startX;
			_flagY = _startY;
			return false	
		})
		$('.flip-box')[0].addEventListener('touchmove',function(event){
			event.preventDefault();
			_moveY = event.touches[0].clientY;
			var cha = _moveY - _startY;
			var curY = marY + cha;
			//scrollNone(index,curY);
			//向下滑动
			if(cha>0){
				scrollNone((index-1),-(height-curY));
				moveClass(index,(index-1));
			}
			//向上滑动
			if(cha<0){
				scrollNone((index+1),(height+curY));
				moveClass(index,(index+1));
			}	
			_flagX = _moveX;
			_flagY = _moveY;
			return false	
		})
		$('.flip-box')[0].addEventListener('touchend',function(event){
			var cha = _moveY - _startY;
			var dis = Math.abs(cha);
			if(index<=$len&&index>=1){
				if(Math.abs(_flagY- _startY)>=10){
					if(cha<0){
						if(index<$len){
							me.opt.onLeave(index);
						}
						scrollDis((index+1),0);
						setClass(index,(index+1));
					}else{
						if(index == 1){
							scrollDis(1,0);
							$('.flip-box .page1').addClass('z-current');	
						}else{
							me.opt.onLeave(index);
							scrollDis((index-1),0);
							setClass(index,(index-1));
						}
					}
					if(_moveY < _startY){
						index++;
					}else{
						index--;
					}
					if(index < 1){index = 1}
					if(index >= $len){index = $len}
				}
			}
			if(Math.abs(_flagY- _startY)>=10){
				me.opt.onLoad(index);
			}
			return false	
		})	
    };

    Scroll.prototype = {
		onLeave:function(page){
			//alert('leave');
		},
		onLoad:function(page){
			//alert('load');	
		},
		goToPage:function(page){
				
		}
    };

    $.Scroll = function(opts) {
        opts = opts || {};
        for(var i = 0, l = this.length; i < l; i++) {
            return new Scroll($.extend({elem: this[i]}, opts));
        }
    };

}())