webpackJsonp([2],{"5pPq":function(t,o){},GdEX:function(t,o){},HqzV:function(t,o,e){"use strict";var s=e("KRg4"),n=(s.a,Boolean,String,String,String,Array,Boolean,String,String,Boolean,{name:"search",mixins:[s.a],props:{required:{type:Boolean,default:!1},placeholder:String,cancelText:String,value:{type:String,default:""},results:{type:Array,default:function(){return[]}},autoFixed:{type:Boolean,default:!0},top:{type:String,default:"0px"},position:{type:String,default:"fixed"},autoScrollToTop:Boolean},created:function(){this.value&&(this.currentValue=this.value)},computed:{fixPosition:function(){return this.isFixed?"absolute"===this.position?"absolute":"fixed":"static"}},methods:{emitEvent:function(){var t=this;this.$nextTick(function(){t.$emit("input",t.currentValue),t.$emit("on-change",t.currentValue)})},onComposition:function(t,o){"start"===o&&(this.onInput=!0),"end"===o&&(this.onInput=!1,this.emitEvent()),"input"===o&&(this.onInput||this.emitEvent())},clear:function(){this.currentValue="",this.emitEvent(),this.isFocus=!0,this.setFocus(),this.autoFixed&&!this.isFixed&&(this.isFixed=!0),this.$emit("on-clear")},cancel:function(){this.isCancel=!0,this.currentValue="",this.emitEvent(),this.isFixed=!1,this.$emit("on-cancel")},handleResultClick:function(t){this.$emit("result-click",t),this.$emit("on-result-click",t),this.isCancel=!0,this.isFixed=!1},touch:function(){this.isCancel=!1,this.autoFixed&&(this.isFixed=!0),this.$emit("on-touch")},setFocus:function(){this.$refs.input.focus()},setBlur:function(){this.$refs.input.blur()},onFocus:function(){this.isFocus=!0,this.$emit("on-focus"),this.touch()},onBlur:function(){this.isFocus=!1,this.$emit("on-blur")}},data:function(){return{onInput:!1,currentValue:"",isCancel:!0,isFocus:!1,isFixed:!1}},watch:{isFixed:function(t){!0===t&&(this.setFocus(),this.isFocus=!0,this.autoScrollToTop&&setTimeout(function(){window.scrollTo(0,0)},150))},value:function(t){this.currentValue=t}}}),i={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"vux-search-box",class:{"vux-search-fixed":t.isFixed},style:{top:t.isFixed?t.top:"",position:t.fixPosition}},[e("div",{staticClass:"weui-search-bar",class:{"weui-search-bar_focusing":!t.isCancel||t.currentValue}},[t._t("left"),t._v(" "),e("form",{staticClass:"weui-search-bar__form",attrs:{action:"."},on:{submit:function(o){o.preventDefault(),t.$emit("on-submit",t.value)}}},[e("label",{directives:[{name:"show",rawName:"v-show",value:!t.isFixed&&t.autoFixed,expression:"!isFixed && autoFixed"}],staticClass:"vux-search-mask",attrs:{for:"search_input_"+t.uuid},on:{click:t.touch}}),t._v(" "),e("div",{staticClass:"weui-search-bar__box"},[e("i",{staticClass:"weui-icon-search"}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.currentValue,expression:"currentValue"}],ref:"input",staticClass:"weui-search-bar__input",attrs:{type:"search",autocomplete:"off",id:"search_input_"+t.uuid,placeholder:t.placeholder,required:t.required},domProps:{value:t.currentValue},on:{focus:t.onFocus,blur:t.onBlur,compositionstart:function(o){t.onComposition(o,"start")},compositionend:function(o){t.onComposition(o,"end")},input:[function(o){o.target.composing||(t.currentValue=o.target.value)},function(o){t.onComposition(o,"input")}]}}),t._v(" "),e("a",{directives:[{name:"show",rawName:"v-show",value:t.currentValue,expression:"currentValue"}],staticClass:"weui-icon-clear",attrs:{href:"javascript:"},on:{click:t.clear}})]),t._v(" "),e("label",{directives:[{name:"show",rawName:"v-show",value:!t.isFocus&&!t.value,expression:"!isFocus && !value"}],staticClass:"weui-search-bar__label",attrs:{for:"search_input_"+t.uuid}},[e("i",{staticClass:"weui-icon-search"}),t._v(" "),e("span",[t._v(t._s(t.placeholder||"搜索"))])])]),t._v(" "),e("a",{staticClass:"weui-search-bar__cancel-btn",attrs:{href:"javascript:"},on:{click:t.cancel}},[t._v(t._s(t.cancelText||"取消")+"\n    ")]),t._v(" "),t._t("right")],2),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.isFixed,expression:"isFixed"}],staticClass:"weui-cells vux-search_show"},[t._t("default"),t._v(" "),t._l(t.results,function(o){return e("div",{staticClass:"weui-cell weui-cell_access",on:{click:function(e){t.handleResultClick(o)}}},[e("div",{staticClass:"weui-cell__bd weui-cell_primary"},[e("p",[t._v(t._s(o.title))])])])})],2)])},staticRenderFns:[]};var r=e("VU/8")(n,i,!1,function(t){e("NX8v")},null,null);o.a=r.exports},MdTC:function(t,o,e){var s,n;
/*!
 * mescroll -- 精致的下拉刷新和上拉加载js框架  ( a great JS framework for pull-refresh and pull-up-loading )
 * version 1.3.2
 * 2018-01-01
 * author: wenju < mescroll@qq.com > 文举
 * 
 * 官网:	http://www.mescroll.com
 * 文档:	https://github.com/mescroll/mescroll.git
 * 动态:	https://github.com/mescroll/mescroll-versions
 * 问答:http://www.mescroll.com/qa.html
 * issues: https://github.com/mescroll/mescroll/issues
 * QQ交流群: 633126761
 */!function(i,r){void 0!==t&&t.exports;void 0===(n="function"==typeof(s=r)?s.call(o,e,o,t):s)||(t.exports=n)}(0,function(){var t=function(t,o){var e=this;if(e.version="1.3.2",e.isScrollBody=!t||"body"==t,e.scrollDom=e.isScrollBody?document.body:e.getDomById(t),e.scrollDom){e.options=o||{};var s=navigator.userAgent,n=!!s.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),i=void 0===window.orientation,r=s.indexOf("Android")>-1||s.indexOf("Adr")>-1;e.os={ios:n,pc:i,android:r},e.isDownScrolling=!1,e.isUpScrolling=!1,e.initDownScroll(),e.initUpScroll(),setTimeout(function(){e.optDown.use&&e.optDown.auto&&(e.optDown.autoShowLoading?e.triggerDownScroll():e.optDown.callback&&e.optDown.callback(e)),e.optUp.use&&e.optUp.auto&&!e.isUpAutoLoad&&e.triggerUpScroll()},30)}};return t.prototype.extendDownScroll=function(o){t.extend(o,{use:!0,auto:!0,autoShowLoading:!1,isLock:!1,isBoth:!1,offset:80,outOffsetRate:.2,bottomOffset:20,minAngle:45,hardwareClass:"mescroll-hardware",warpId:null,warpClass:"mescroll-downwarp",resetClass:"mescroll-downwarp-reset",htmlContent:'<p class="downwarp-progress"></p><p class="downwarp-tip">下拉刷新 </p>',inited:function(t,o){t.downTipDom=o.getElementsByClassName("downwarp-tip")[0],t.downProgressDom=o.getElementsByClassName("downwarp-progress")[0]},inOffset:function(t){t.downTipDom&&(t.downTipDom.innerHTML="下拉刷新"),t.downProgressDom&&t.downProgressDom.classList.remove("mescroll-rotate")},outOffset:function(t){t.downTipDom&&(t.downTipDom.innerHTML="释放更新")},onMoving:function(t,o,e){if(t.downProgressDom){var s=360*o;t.downProgressDom.style.webkitTransform="rotate("+s+"deg)",t.downProgressDom.style.transform="rotate("+s+"deg)"}},beforeLoading:function(t,o){return!1},showLoading:function(t){t.downTipDom&&(t.downTipDom.innerHTML="加载中 ..."),t.downProgressDom&&t.downProgressDom.classList.add("mescroll-rotate")},callback:function(t){t.resetUpScroll()}})},t.prototype.extendUpScroll=function(o){var e=this.os.pc;t.extend(o,{use:!0,auto:!0,isLock:!1,isBoth:!1,isBounce:!0,callback:null,page:{num:0,size:10,time:null},noMoreSize:5,offset:100,toTop:{warpId:null,src:null,html:null,offset:1e3,warpClass:"mescroll-totop",showClass:"mescroll-fade-in",hideClass:"mescroll-fade-out",duration:300,supportTap:!1},loadFull:{use:!1,delay:500},empty:{warpId:null,icon:null,tip:"暂无相关数据~",btntext:"",btnClick:null,supportTap:!1},clearId:null,clearEmptyId:null,hardwareClass:"mescroll-hardware",warpId:null,warpClass:"mescroll-upwarp",htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',htmlNodata:'<p class="upwarp-nodata">-- END --</p>',inited:function(t,o){},showLoading:function(t,o){o.innerHTML=t.optUp.htmlLoading},showNoMore:function(t,o){o.innerHTML=t.optUp.htmlNodata},onScroll:null,scrollbar:{use:e,barClass:"mescroll-bar"}})},t.extend=function(o,e){if(!o)return e;for(var s in e)null==o[s]?o[s]=e[s]:"object"==typeof o[s]&&t.extend(o[s],e[s]);return o},t.prototype.initDownScroll=function(){var t=this;if(t.optDown=t.options.down||{},t.extendDownScroll(t.optDown),t.touchstartEvent=function(o){t.isScrollTo&&o.preventDefault(),t.startPoint=t.getPoint(o),t.lastPoint=t.startPoint,t.maxTouchmoveY=t.getBodyHeight()-t.optDown.bottomOffset,t.inTouchend=!1,t.os.pc&&t.getScrollTop()<=0&&(t.scrollDom.addEventListener("mousemove",t.touchmoveEvent),document.ondragstart=function(){return!1})},t.scrollDom.addEventListener("mousedown",t.touchstartEvent),t.scrollDom.addEventListener("touchstart",t.touchstartEvent),t.touchmoveEvent=function(o){var e=t.getScrollTop(),s=t.getPoint(o),n=s.y-t.startPoint.y;if(n>0){if(e<=0&&(o.cancelable&&!o.defaultPrevented&&o.preventDefault(),t.optDown.use&&!t.inTouchend&&!t.isDownScrolling&&!t.optDown.isLock&&(!t.isUpScrolling||t.isUpScrolling&&t.optUp.isBoth))){var i=Math.abs(t.lastPoint.x-s.x),r=Math.abs(t.lastPoint.y-s.y),l=Math.sqrt(i*i+r*r);if(0!=l)if(Math.asin(r/l)/Math.PI*180<t.optDown.minAngle)return;if(t.maxTouchmoveY>0&&s.y>=t.maxTouchmoveY)return t.inTouchend=!0,void t.touchendEvent();var a=s.y-t.lastPoint.y;t.downHight||(t.downHight=0),t.downHight<t.optDown.offset?(1!=t.movetype&&(t.movetype=1,t.optDown.inOffset(t),t.downwarp.classList.remove(t.optDown.resetClass),t.scrollDom.classList.add(t.optDown.hardwareClass),t.scrollDom.style.webkitOverflowScrolling="auto",t.isMoveDown=!0),t.downHight+=a):(2!=t.movetype&&(t.movetype=2,t.optDown.outOffset(t),t.downwarp.classList.remove(t.optDown.resetClass),t.scrollDom.classList.add(t.optDown.hardwareClass),t.scrollDom.style.webkitOverflowScrolling="auto",t.isMoveDown=!0),t.downHight+=a>0?a*t.optDown.outOffsetRate:a),t.downwarp.style.height=t.downHight+"px";var c=t.downHight/t.optDown.offset;t.optDown.onMoving(t,c,t.downHight)}}else if(n<0){var p=t.getScrollHeight(),u=t.getClientHeight(),d=p-u-e;!t.optUp.isBounce&&o.cancelable&&!o.defaultPrevented&&d<=0&&o.preventDefault(),t.optUp.use&&!t.optUp.isLock&&t.optUp.hasNext&&!t.isUpScrolling&&(!t.isDownScrolling||t.isDownScrolling&&t.optDown.isBoth)&&(u+t.optUp.offset>=p||d<=0)&&t.triggerUpScroll()}t.lastPoint=s},t.scrollDom.addEventListener("touchmove",t.touchmoveEvent),t.touchendEvent=function(){t.optDown.use&&t.isMoveDown&&(t.downHight>=t.optDown.offset?t.triggerDownScroll():(t.downwarp.classList.add(t.optDown.resetClass),t.downHight=0,t.downwarp.style.height=0),t.scrollDom.style.webkitOverflowScrolling="touch",t.scrollDom.classList.remove(t.optDown.hardwareClass),t.movetype=0,t.isMoveDown=!1),t.os.pc&&(t.scrollDom.removeEventListener("mousemove",t.touchmoveEvent),document.ondragstart=function(){return!0})},t.scrollDom.addEventListener("mouseup",t.touchendEvent),t.scrollDom.addEventListener("mouseleave",t.touchendEvent),t.scrollDom.addEventListener("touchend",t.touchendEvent),t.scrollDom.addEventListener("touchcancel",t.touchendEvent),t.optDown.use){t.downwarp=document.createElement("div"),t.downwarp.className=t.optDown.warpClass,t.downwarp.innerHTML='<div class="downwarp-content">'+t.optDown.htmlContent+"</div>";var o=t.optDown.warpId?t.getDomById(t.optDown.warpId):t.scrollDom;t.optDown.warpId&&o?o.appendChild(t.downwarp):(o||(o=t.scrollDom),o.insertBefore(t.downwarp,t.scrollDom.firstChild)),setTimeout(function(){t.optDown.inited(t,t.downwarp)},0)}},t.prototype.getPoint=function(t){return{x:t.touches?t.touches[0].pageX:t.clientX,y:t.touches?t.touches[0].pageY:t.clientY}},t.prototype.triggerDownScroll=function(){this.optDown.beforeLoading(this,this.downwarp)||(this.showDownScroll(),this.optDown.callback&&this.optDown.callback(this))},t.prototype.showDownScroll=function(){this.isDownScrolling=!0,this.optDown.showLoading(this),this.downHight=this.optDown.offset,this.downwarp.classList.add(this.optDown.resetClass),this.downwarp.style.height=this.optDown.offset+"px"},t.prototype.endDownScroll=function(){this.downHight=0,this.downwarp.style.height=0,this.isDownScrolling=!1,this.downProgressDom&&this.downProgressDom.classList.remove("mescroll-rotate")},t.prototype.lockDownScroll=function(t){null==t&&(t=!0),this.optDown.isLock=t},t.prototype.initUpScroll=function(){var t,o=this;(o.optUp=o.options.up||{use:!1},o.extendUpScroll(o.optUp),o.optUp.scrollbar.use&&o.scrollDom.classList.add(o.optUp.scrollbar.barClass),o.optUp.isBounce||o.setBounce(!1),0!=o.optUp.use)&&(o.optUp.hasNext=!0,o.upwarp=document.createElement("div"),o.upwarp.className=o.optUp.warpClass,o.optUp.warpId&&(t=o.getDomById(o.optUp.warpId)),t||(t=o.scrollDom),t.appendChild(o.upwarp),o.preScrollY=0,o.scrollEvent=function(){var t=o.getScrollTop(),e=t-o.preScrollY>0;if(o.preScrollY=t,!o.isUpScrolling&&(!o.isDownScrolling||o.isDownScrolling&&o.optDown.isBoth)){if(!o.optUp.isLock&&o.optUp.hasNext)o.getScrollHeight()-o.getClientHeight()-t<=o.optUp.offset&&e&&o.triggerUpScroll();var s=o.optUp.toTop;(s.src||s.html)&&(t>=s.offset?o.showTopBtn():o.hideTopBtn())}o.optUp.onScroll&&o.optUp.onScroll(o,t,e)},o.isScrollBody?window.addEventListener("scroll",o.scrollEvent):o.scrollDom.addEventListener("scroll",o.scrollEvent),setTimeout(function(){o.optUp.inited(o,o.upwarp)},0))},t.prototype.setBounce=function(t){!this.isScrollBody&&this.os.ios&&(0==t?(this.optUp.isBounce=!1,window.addEventListener("touchmove",this.bounceTouchmove)):(this.optUp.isBounce=!0,window.removeEventListener("touchmove",this.bounceTouchmove)))},t.prototype.bounceTouchmove=function(t){for(var o=this,e=t.target,s=!0;e!==document.body&&e!==document;){var n=e.classList;if(n){if(n.contains("mescroll")||n.contains("mescroll-touch")){s=!1;break}if(n.contains("mescroll-touch-x")||n.contains("mescroll-touch-y")){var i=t.touches?t.touches[0].pageX:t.clientX,r=t.touches?t.touches[0].pageY:t.clientY;o.preWinX||(o.preWinX=i),o.preWinY||(o.preWinY=r);var l=Math.abs(o.preWinX-i),a=Math.abs(o.preWinY-r),c=Math.sqrt(l*l+a*a);if(o.preWinX=i,o.preWinY=r,0!=c){var p=Math.asin(a/c)/Math.PI*180;if(p<=45&&n.contains("mescroll-touch-x")||p>45&&n.contains("mescroll-touch-y")){s=!1;break}}}}e=e.parentNode}s&&t.cancelable&&!t.defaultPrevented&&t.preventDefault()},t.prototype.triggerUpScroll=function(){this.isUpScrolling||(this.showUpScroll(),this.optUp.page.num++,this.isUpAutoLoad=!0,this.optUp.callback&&this.optUp.callback(this.optUp.page,this))},t.prototype.showUpScroll=function(){this.isUpScrolling=!0,this.upwarp.classList.add(this.optUp.hardwareClass),this.upwarp.style.visibility="visible",this.optUp.showLoading(this,this.upwarp)},t.prototype.showNoMore=function(){this.upwarp.style.visibility="visible",this.optUp.hasNext=!1,this.optUp.showNoMore(this,this.upwarp)},t.prototype.hideUpScroll=function(){this.upwarp.style.visibility="hidden",this.upwarp.classList.remove(this.optUp.hardwareClass);var t=this.upwarp.getElementsByClassName("upwarp-progress")[0];t&&t.classList.remove("mescroll-rotate")},t.prototype.endUpScroll=function(t){null!=t&&(t?this.showNoMore():this.hideUpScroll()),this.isUpScrolling=!1},t.prototype.resetUpScroll=function(t){if(this.optUp&&this.optUp.use){var o=this.optUp.page;this.prePageNum=o.num,this.prePageTime=o.time,o.num=1,o.time=null,this.isDownScrolling||0==t||(null==t?(this.removeEmpty(),this.clearDataList(),this.showUpScroll()):this.showDownScroll()),this.isUpAutoLoad=!0,this.optUp.callback&&this.optUp.callback(o,this)}},t.prototype.setPageNum=function(t){this.optUp.page.num=t-1},t.prototype.setPageSize=function(t){this.optUp.page.size=t},t.prototype.clearDataList=function(){var t=this.optUp.clearId||this.optUp.clearEmptyId;if(t){var o=this.getDomById(t);o&&(o.innerHTML="")}},t.prototype.endByPage=function(t,o,e){var s;this.optUp.use&&null!=o&&(s=this.optUp.page.num<o),this.endSuccess(t,s,e)},t.prototype.endBySize=function(t,o,e){var s;this.optUp.use&&null!=o&&(s=(this.optUp.page.num-1)*this.optUp.page.size+t<o);this.endSuccess(t,s,e)},t.prototype.endSuccess=function(t,o,e){if(this.isDownScrolling&&this.endDownScroll(),this.optUp.use){var s;if(null!=t){var n=this.optUp.page.num,i=this.optUp.page.size;if(1==n&&(this.clearDataList(),e&&(this.optUp.page.time=e)),t<i||0==o)if(this.optUp.hasNext=!1,0==t&&1==n)s=!1,this.showEmpty();else s=!((n-1)*i+t<this.optUp.noMoreSize),this.removeEmpty();else s=!1,this.optUp.hasNext=!0,this.removeEmpty()}this.endUpScroll(s),this.loadFull()}},t.prototype.endErr=function(){if(this.isDownScrolling){var t=this.optUp.page;t&&this.prePageNum&&(t.num=this.prePageNum,t.time=this.prePageTime),this.endDownScroll()}this.isUpScrolling&&(this.optUp.page.num--,this.endUpScroll(!1))},t.prototype.loadFull=function(){var t=this;t.optUp.loadFull.use&&!t.optUp.isLock&&t.optUp.hasNext&&t.getScrollHeight()<=t.getClientHeight()&&setTimeout(function(){t.getScrollHeight()<=t.getClientHeight()&&t.triggerUpScroll()},t.optUp.loadFull.delay)},t.prototype.lockUpScroll=function(t){null==t&&(t=!0),this.optUp.isLock=t},t.prototype.showEmpty=function(){var t=this,o=t.optUp.empty,e=o.warpId||t.optUp.clearEmptyId;if(null!=e){var s=t.getDomById(e);if(s){t.removeEmpty();var n="";if(o.icon&&(n+='<img class="empty-icon" src="'+o.icon+'"/>'),o.tip&&(n+='<p class="empty-tip">'+o.tip+"</p>"),o.btntext&&(n+='<p class="empty-btn">'+o.btntext+"</p>"),t.emptyDom=document.createElement("div"),t.emptyDom.className="mescroll-empty",t.emptyDom.innerHTML=n,s.appendChild(t.emptyDom),o.btnClick){var i=t.emptyDom.getElementsByClassName("empty-btn")[0];o.supportTap?i.addEventListener("tap",function(t){t.stopPropagation(),t.preventDefault(),o.btnClick()}):i.onclick=function(){o.btnClick()}}}}},t.prototype.removeEmpty=function(){this.removeChild(this.emptyDom)},t.prototype.showTopBtn=function(){if(!this.topBtnShow){this.topBtnShow=!0;var t,o=this,e=o.optUp.toTop;if(null==o.toTopBtn)e.html?(o.toTopBtn=document.createElement("div"),o.toTopBtn.innerHTML=e.html):(o.toTopBtn=document.createElement("img"),o.toTopBtn.src=e.src),o.toTopBtn.className=e.warpClass,e.supportTap?o.toTopBtn.addEventListener("tap",function(t){t.stopPropagation(),t.preventDefault(),o.scrollTo(0,o.optUp.toTop.duration)}):o.toTopBtn.onclick=function(){o.scrollTo(0,o.optUp.toTop.duration)},e.warpId&&(t=o.getDomById(e.warpId)),t||(t=document.body),t.appendChild(o.toTopBtn);o.toTopBtn.classList.remove(e.hideClass),o.toTopBtn.classList.add(e.showClass)}},t.prototype.hideTopBtn=function(){this.topBtnShow&&this.toTopBtn&&(this.topBtnShow=!1,this.toTopBtn.classList.remove(this.optUp.toTop.showClass),this.toTopBtn.classList.add(this.optUp.toTop.hideClass))},t.prototype.scrollTo=function(t,o){var e=this,s=e.getScrollTop(),n=t;if(n>0){var i=e.getScrollHeight()-e.getClientHeight();n>i&&(n=i)}else n=0;e.isScrollTo=!0,e.getStep(s,n,function(t){e.setScrollTop(t),t==n&&(e.isScrollTo=!1)},o)},t.prototype.getStep=function(t,o,e,s,n){var i=o-t;if(0!=s&&0!=i)var r=(s=s||300)/(n=n||30),l=i/r,a=0,c=window.setInterval(function(){a<r-1?(t+=l,e&&e(t,c),a++):(e&&e(o,c),window.clearInterval(c))},n);else e&&e(o)},t.prototype.getScrollHeight=function(){return this.scrollDom.scrollHeight},t.prototype.getClientHeight=function(){return this.isScrollBody&&"CSS1Compat"==document.compatMode?document.documentElement.clientHeight:this.scrollDom.clientHeight},t.prototype.getBodyHeight=function(){return document.body.clientHeight||document.documentElement.clientHeight},t.prototype.getScrollTop=function(){return this.isScrollBody?document.documentElement.scrollTop||document.body.scrollTop:this.scrollDom.scrollTop},t.prototype.getToBottom=function(){return this.getScrollHeight()-this.getClientHeight()-this.getScrollTop()},t.prototype.setScrollTop=function(t){this.isScrollBody?(document.documentElement.scrollTop=t,document.body.scrollTop=t):this.scrollDom.scrollTop=t},t.prototype.getDomById=function(t){var o;return t&&(o=document.getElementById(t)),o||console.error('the element with id as "'+t+'" can not be found: document.getElementById("'+t+'")==null'),o},t.prototype.removeChild=function(t){if(t){var o=t.parentNode;o&&o.removeChild(t),t=null}},t.prototype.destroy=function(){var t=this;t.scrollDom.removeEventListener("touchstart",t.touchstartEvent),t.scrollDom.removeEventListener("touchmove",t.touchmoveEvent),t.scrollDom.removeEventListener("touchend",t.touchendEvent),t.scrollDom.removeEventListener("touchcancel",t.touchendEvent),t.scrollDom.removeEventListener("mousedown",t.touchstartEvent),t.scrollDom.removeEventListener("mousemove",t.touchmoveEvent),t.scrollDom.removeEventListener("mouseup",t.touchendEvent),t.scrollDom.removeEventListener("mouseleave",t.touchendEvent),t.removeChild(t.downwarp),t.isScrollBody?window.removeEventListener("scroll",t.scrollEvent):t.scrollDom.removeEventListener("scroll",t.scrollEvent),t.removeChild(t.upwarp),t.removeChild(t.toTopBtn),t.setBounce(!0)},t})},NX8v:function(t,o){},R1TL:function(t,o){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAclBMVEUAAAAAAAAAAAAAAADp6ekAAAAAAAAAAADOzs4AAAAAAAAAAAAAAAAAAAAAAAAAAADo6OjW1tYeHh7l5eXh4eHY2NjAwMC5ubm3t7cxMTH7+/vv7+/s7Ozc3NzNzc2tra0TExPp6enS0tLQ0NDDw8P///9ezvBLAAAAJXRSTlNNAAod1T46NbASSEc0Kykk07pTzsm9o52ZWfXg2sGvk1HUtbOmfFE0sAAAAT1JREFUSMeV1t1ygjAQhuGvu4ZU+VUUqVrtX+7/FpuCTJEsmH2POMgzMEzYgBdlISAurEmB1NiC6RkgzjYYtcmYFgCVBkGmpDnACcQSFgHlmC2nEKwtFrLrKVgnWCwZBKT1shgDsniapRHIEVH+DxhR8QAoiQMJ3UGJyMoekIkFhjrAiI47kGHU2U06Y1T2B+hhP7evfdfr/aJ92O3kAUMRe1BA6K3e7yBUeGCl9ZVz7x8Isx4Ycf3pJArjQYppu9rd6qpxhxCkHoTr9+6Gzwo/bhsKD4T1LbBaAUdBCI90cEf0wIsv4ZHMFDQYAJrpLYz8Wgcgv9ZCAwoPWAO423zxYEPd9o4HWf8BxQPuAJlYYGh+CFwuCCsXxsz2Wxoz2kGmHZXqYawe9/oDRX9k6Q9F/bGrP9j1vw76nxNlv9R2ECcaFzswAAAAAElFTkSuQmCC"},TWgP:function(t,o){},gtMf:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var s=e("3nMf"),n=e("ryOD"),i=e("rHil"),r=e("UNGY"),l=e("wwIJ"),a=e("HqzV"),c=e("rGqP"),p=e("2sLL"),u=e("YxJB"),d=e("3Lt7"),h=e("ignk"),m=e("MdTC"),v=e.n(m),w=(e("GdEX"),n.a,s.a,i.a,r.a,l.a,a.a,c.a,p.a,u.a,d.a,h.a,{name:"searc",components:{heade:n.a,foot:s.a,Group:i.a,Datetime:r.a,Selector:l.a,Search:a.a,Divider:c.a,XButton:p.a,Flexbox:u.a,FlexboxItem:d.a,XTable:h.a},data:function(){return{startDate:"",endDate:"",list:[{key:"",value:"全部"},{key:"1",value:"自由"},{key:"2",value:"审批"},{key:"3",value:"提交"},{key:"4",value:"关闭"},{key:"5",value:"作废"}],defaultValue:"",flowList:[{key:"",value:"全部"},{key:"0001AV100000000G8TM3",value:"酒祖费用发货流程"},{key:"0001AV100000000G8TM5",value:"绵柔M系列费用发货流程"},{key:"0001AV100000000G8TMB",value:"绵柔其他费用发货流程"},{key:"0001AV100000000G8TMP",value:"一斤半费用发货流程"},{key:"0001AV100000000IS6KV",value:"杜一费用发货流程"},{key:"0001AV100000000G8TLY",value:"现金发货流程"},{key:"0001AV100000000G8TMS",value:"其他费用发货流程"}],flowValue:"",mescroll:null,dataList:[],isShow:!1,Tday:""}},methods:{tj:function(){this.startDate&&this.endDate?!this.isShow&&this.mescroll?(this.isShow=!0,this.mescroll.resetUpScroll(),this.mescroll.hideTopBtn()):null==this.mescroll&&(this.isShow=!0,this.mescroll=new v.a("mescroll",{up:{callback:this.upCallback,toTop:{src:e("R1TL")},empty:{warpId:"mescroll",icon:null,tip:"暂无订单数据,请重新输入查询条件~",btntext:"",btnClick:null,supportTap:!1},noMoreSize:1,hardwareClass:"mescroll-hardware",htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',htmlNodata:'<p class="upwarp-nodata"> -- 加载完毕 -- </p>',auto:!0},down:{use:!1}})):this.$vux.alert.show({title:"注意",content:"查询条件不能为空"})},upCallback:function(t){var o=this;this.$axios.get(this.url+"/ncPreorderServiceController.do?datagrid",{params:{num:t.num,size:t.size,sessionid:localStorage.sessionid,dbilldate_begin:this.startDate,dbilldate_end:this.endDate,businame:this.flowValue,fstatus:this.defaultValue}}).then(function(e){var s=e.data.rows;1==t.num&&(o.dataList=[]),o.dataList=o.dataList.concat(s),o.$nextTick(function(){o.mescroll.endSuccess(s.length)})}).catch(function(t){o.mescroll.endErr()})},dj:function(t){var o=this;this.$vux.loading.show({}),this.$axios.get(this.url+"/ncPreorderServiceController.do?preorderdetaildatagrid",{params:{sessionid:localStorage.sessionid,id:t}}).then(function(t){o.$vux.loading.hide(),o.$store.commit("products",t.data.rows),o.$router.push({name:"orderDetail"})}).catch(function(t){o.$vux.loading.hide(),o.$vux.alert.show({title:"注意",content:"服务器异常,请稍后再试!"})})},change:function(t){var o=this;this.$vux.loading.show({}),this.$axios.get(this.url+"/ncPreorderServiceController.do?preorderheaddatagrid",{params:{sessionid:localStorage.sessionid,id:t}}).then(function(e){o.$store.commit("changeDetail",e.data.rows[0]),o.$axios.get(o.url+"/ncPreorderServiceController.do?preorderdetaildatagrid",{params:{sessionid:localStorage.sessionid,id:t}}).then(function(e){o.$vux.loading.hide(),o.$store.commit("rental",e.data.rows),o.$store.commit("whichId",t),o.$router.push({name:"changeOrder"})}).catch(function(t){o.$vux.loading.hide(),o.$vux.alert.show({title:"注意",content:"服务器异常,请稍后再试!"})})}).catch(function(t){o.$vux.alert.show({title:"注意",content:"服务器异常,请稍后再试!"})})}},watch:{flowValue:function(t,o){t!=o&&(this.isShow=!1)},defaultValue:function(t,o){t!=o&&(this.isShow=!1)},startDate:function(t,o){t!=o&&(this.isShow=!1)},endDate:function(t,o){t!=o&&(this.isShow=!1)}},created:function(){this.$store.commit("keepAlive","searc");var t=new Date,o=t.getFullYear(),e=t.getMonth();e+1<10?e="0"+(e+1):e+=1;var s=t.getDate();s<10&&(s="0"+s);var n=o+"-"+e+"-"+s;this.Tday=n,this.startDate=n,this.endDate=n},beforeRouteLeave:function(t,o,e){"/changeOrder"==t.path&&this.$store.commit("changekeepAlive","changeOrder"),e()}}),f={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"search"},[e("group",[e("selector",{attrs:{placeholder:"流程名称选择",options:t.flowList},model:{value:t.flowValue,callback:function(o){t.flowValue=o},expression:"flowValue"}})],1),t._v(" "),e("group",[e("selector",{attrs:{placeholder:"单据状态选择",options:t.list},model:{value:t.defaultValue,callback:function(o){t.defaultValue=o},expression:"defaultValue"}})],1),t._v(" "),e("div",{staticClass:"tit"},[e("group",{staticStyle:{width:"50%"}},[e("datetime",{attrs:{placeholder:"订单开始日期","end-date":t.Tday},model:{value:t.startDate,callback:function(o){t.startDate=o},expression:"startDate"}})],1),t._v(" "),e("group",{staticStyle:{width:"50%"}},[e("datetime",{attrs:{placeholder:"订单结束日期","end-date":t.Tday},model:{value:t.endDate,callback:function(o){t.endDate=o},expression:"endDate"}})],1)],1),t._v(" "),e("div",{staticClass:"btnS"},[e("x-button",{staticStyle:{width:"80%"},attrs:{type:"warn",mini:""},nativeOn:{click:function(o){return t.tj(o)}}},[t._v("查询")])],1),t._v(" "),e("divider",[t._v("查询结果")]),t._v(" "),t.dataList?e("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],key:"div",staticClass:"mescroll",attrs:{id:"mescroll","mescroll-touch-y":""}},[e("div",{key:"div1",staticClass:"table_grad scroll_tablex"},[e("x-table",{staticStyle:{"background-color":"#fff","margin-top":"5%"},attrs:{"cell-bordered":!1,responsive:""}},[e("thead",[e("tr",[e("th",[t._v("订单号")]),t._v(" "),e("th",[t._v("订单总额")]),t._v(" "),e("th",[t._v("订单状态")]),t._v(" "),e("th",[t._v("发运状态")]),t._v(" "),e("th",[t._v("订单修改")]),t._v(" "),e("th",[t._v("下单日期")])])]),t._v(" "),e("tbody",t._l(t.dataList,function(o,s){return e("tr",{key:s},[e("td",[e("a",{attrs:{href:"javascript:;"},on:{click:function(e){t.dj(o.id)}}},[t._v("\n                                "+t._s(o.vreceiptcode)+"\n                            ")])]),t._v(" "),e("td",[t._v(t._s(o.nmny)+"元")]),t._v(" "),e("td",[t._v(" "+t._s(o.fstatus))]),t._v(" "),"1"==o.djfstatus?e("td",[t._v("预订单")]):"2"==o.djfstatus?e("td",[t._v("已生成订单")]):e("td",[t._v("已出库")]),t._v(" "),"自由"==o.fstatus?e("td",{staticStyle:{color:"red"},on:{click:function(e){t.change(o.id)}}},[t._v("修改订单")]):e("td",[t._v("-")]),t._v(" "),e("td",[t._v(t._s(o.dbilldate))])])}))])],1)]):t._e()],1)},staticRenderFns:[]};var g=e("VU/8")(w,f,!1,function(t){e("TWgP")},"data-v-4ff90ff8",null);o.default=g.exports},ignk:function(t,o,e){"use strict";Boolean,Boolean,Boolean;var s={name:"x-table",props:{fullBordered:Boolean,cellBordered:{type:Boolean,default:!0},contentBordered:{type:Boolean,default:!0}}},n={render:function(){var t=this.$createElement;return(this._self._c||t)("table",{staticClass:"vux-table",class:{"vux-table-bordered":this.fullBordered,"vux-table-no-cell-bordered":!this.cellBordered,"vux-table-no-content-bordered":!this.contentBordered}},[this._t("default")],2)},staticRenderFns:[]};var i=e("VU/8")(s,n,!1,function(t){e("5pPq")},null,null);o.a=i.exports}});
//# sourceMappingURL=2.133030aa27ef6b1ef448.js.map