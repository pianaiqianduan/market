webpackJsonp([9],{Pxvd:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("mvHQ"),n=s.n(i),o=s("0FxO"),a={name:"msg",props:["icon","title","description","buttons"],methods:{onClick:function(t,e){"function"==typeof t&&t(),e&&Object(o.a)(e,this.$router)}}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"weui-msg"},[s("div",{staticClass:"weui-msg__icon-area"},[s("i",{staticClass:"weui-icon_msg",class:"weui-icon-"+(t.icon||"success")})]),t._v(" "),s("div",{staticClass:"weui-msg__text-area"},[s("h2",{staticClass:"weui-msg__title",domProps:{innerHTML:t._s(t.title)}}),t._v(" "),s("p",{staticClass:"weui-msg__desc"},[t._t("description")],2),t._v(" "),t.description?s("p",{staticClass:"weui-msg__desc",domProps:{innerHTML:t._s(t.description)}}):t._e()]),t._v(" "),s("div",{staticClass:"weui-msg__opr-area"},[s("p",{staticClass:"weui-btn-area"},[t._t("buttons",t._l(t.buttons,function(e){return s("a",{staticClass:"weui-btn",class:"weui-btn_"+e.type,attrs:{href:"javascript:;"},on:{click:function(s){t.onClick(e.onClick,e.link)}}},[t._v(t._s(e.text))])}))],2)])])},staticRenderFns:[]};var r=s("VU/8")(a,c,!1,function(t){s("qMKY")},null,null).exports,u=s("2sLL"),l=(u.a,{name:"successMsg",components:{Msg:r,XButton:u.a},data:function(){return{msgS:"",explain:"",icon:"",buttons:[{type:"primary",text:"返回首页",link:"/"},{type:"default",text:"订单查询",link:"/searc"}]}},computed:{status:function(){return this.$store.state.status}},mounted:function(){3==this.status?(this.msgS="订单提交成功",this.explain="本次订单提交成功!您可返回订单录入页面继续下单,或者跳转到查询页面进行订单查询。"):(this.msgS="订单保存成功",this.explain="本次订单保存成功!您可返回订单录入页面继续下单,或者跳转到查询页面进行订单查询。")},created:function(){var t=this;this.$axios({headers:{"Content-Type":"application/x-www-form-urlencoded "},method:"POST",dataType:"json",url:this.url+"/ncPreorderServiceController.do?getNcProductList",data:{sessionid:localStorage.sessionid},transformRequest:[function(t){var e="";for(var s in t)e+=encodeURIComponent(s)+"="+encodeURIComponent(t[s])+"&";return e}]}).then(function(e){t.$vux.loading.hide(),t.isTrShow=!0,localStorage.busilist=n()(e.data),t.$store.commit("changIsChangeT",!1),t.$store.commit("flowList",e.data.busilist)}).catch(function(e){t.$vux.loading.hide(),t.$vux.alert.show({title:"注意",content:"服务器异常,请稍后再试!"})})},beforeRouteLeave:function(t,e,s){"/"==t.path?this.$store.commit("changekeepAlive","enter"):"/searc"==t.path&&(this.$store.commit("changekeepAlive","enter"),this.$store.commit("changekeepAlive","searc")),s()}}),d={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{"padding-top":"10%"}},[e("msg",{attrs:{title:this.msgS,description:this.explain,buttons:this.buttons,icon:this.icon}})],1)},staticRenderFns:[]};var p=s("VU/8")(l,d,!1,function(t){s("TgSu")},"data-v-160e8ff0",null);e.default=p.exports},TgSu:function(t,e){},qMKY:function(t,e){}});
//# sourceMappingURL=9.0787844108c14a5caca7.js.map