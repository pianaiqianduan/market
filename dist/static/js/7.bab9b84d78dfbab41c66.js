webpackJsonp([7],{"8/EI":function(e,t){},RqS9:function(e,t){},aTeQ:function(e,t,a){"use strict";var n=a("kbG3"),i=a("wmxo"),r=(n.a,String,Boolean,Boolean,String,Number,String,Boolean,Number,Boolean,Array,{name:"x-switch",components:{InlineDesc:n.a},computed:{labelStyle:function(){var e=/<\/?[^>]*>/.test(this.title),t=Math.min(e?5:this.title.length+1,14)+"em";return Object(i.a)({display:"block",width:this.$parent.labelWidth||t,textAlign:this.$parent.labelAlign})},labelClass:function(){return{"vux-cell-justify":this.$parent&&"justify"===this.$parent.labelAlign}}},methods:{onClick:function(){this.$emit("on-click",!this.currentValue,this.currentValue)},toBoolean:function(e){return this.valueMap?1===this.valueMap.indexOf(e):e},toRaw:function(e){return this.valueMap?this.valueMap[e?1:0]:e}},props:{title:{type:String,required:!0},disabled:Boolean,value:{type:[Boolean,String,Number],default:!1},inlineDesc:[String,Boolean,Number],preventDefault:Boolean,valueMap:{type:Array,default:function(){return[!1,!0]}}},data:function(){return{currentValue:this.toBoolean(this.value)}},watch:{currentValue:function(e){var t=this.toRaw(e);this.$emit("input",t),this.$emit("on-change",t)},value:function(e){this.currentValue=this.toBoolean(e)}}}),l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vux-x-switch weui-cell weui-cell_switch"},[a("div",{staticClass:"weui-cell__bd"},[a("label",{staticClass:"weui-label",class:e.labelClass,style:e.labelStyle,domProps:{innerHTML:e._s(e.title)}}),e._v(" "),e.inlineDesc?a("inline-desc",[e._v(e._s(e.inlineDesc))]):e._e()],1),e._v(" "),a("div",{staticClass:"weui-cell__ft"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"weui-switch",attrs:{type:"checkbox",disabled:e.disabled},domProps:{checked:Array.isArray(e.currentValue)?e._i(e.currentValue,null)>-1:e.currentValue},on:{change:function(t){var a=e.currentValue,n=t.target,i=!!n.checked;if(Array.isArray(a)){var r=e._i(a,null);n.checked?r<0&&(e.currentValue=a.concat([null])):r>-1&&(e.currentValue=a.slice(0,r).concat(a.slice(r+1)))}else e.currentValue=i}}}),e._v(" "),e.preventDefault?a("div",{staticClass:"vux-x-switch-overlay",on:{click:e.onClick}}):e._e()])])},staticRenderFns:[]};var s=a("VU/8")(r,l,!1,function(e){a("8/EI")},null,null);t.a=s.exports},kM3m:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("1DHf"),i=a("rHil"),r=a("pDNl"),l=a("aTeQ"),s=a("wwIJ"),o=a("2sLL"),c=(n.a,i.a,r.a,l.a,s.a,o.a,{name:"addres",components:{Cell:n.a,Group:i.a,XInput:r.a,XSwitch:l.a,Selector:s.a,XButton:o.a},data:function(){return{name:"",phone:"",addres:"",partAddres:"",btnMsg:"保存"}},methods:{save:function(){if(this.name&&this.phone&&this.addres&&this.partAddres){var e={};e.namePhone=this.name+","+this.phone,e.addres=this.addres+this.partAddres,e.checked=!1,e.name=this.name,e.phone=this.phone,e.addr=this.addres,e.partAddres=this.partAddres,this.$store.commit("saveAddres",e);var t=this;t.$vux.alert.show({content:"保存成功",onHide:function(){t.$router.push({name:"profile"}),t.$store.commit("isSaveAddres",!0),t.name="",t.phone="",t.addres="",t.partAddres=""}})}else this.$vux.alert.show({title:"注意",content:"请将地址信息填写完整后再保存！"})}},created:function(){this.$store.commit("keepAlive","addres")},beforeRouteLeave:function(e,t,a){"/profile"==e.path&&this.$store.commit("changekeepAlive","profile"),a()}}),u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"addres"},[a("group",[a("x-input",{attrs:{title:"收货人",placeholder:"名字"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),e._v(" "),a("x-input",{attrs:{title:"联系电话",placeholder:"手机或固定电话"},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}}),e._v(" "),a("x-input",{attrs:{title:"收件地址",placeholder:"请选择"},model:{value:e.addres,callback:function(t){e.addres=t},expression:"addres"}}),e._v(" "),a("x-input",{attrs:{title:"详细地址",placeholder:"如街道、楼层、门牌号等"},model:{value:e.partAddres,callback:function(t){e.partAddres=t},expression:"partAddres"}})],1),e._v(" "),a("div",{staticStyle:{"margin-top":"8%","padding-bottom":"25%"}},[a("x-button",{attrs:{type:"primary"},nativeOn:{click:function(t){return e.save(t)}}},[e._v(e._s(e.btnMsg))])],1)],1)},staticRenderFns:[]};var d=a("VU/8")(c,u,!1,function(e){a("RqS9")},"data-v-4a52537c",null);t.default=d.exports}});
//# sourceMappingURL=7.bab9b84d78dfbab41c66.js.map