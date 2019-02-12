<template>
        <div v-show="isaxios">
            <div class="enter" v-if="isNull">
                <group class="flowT">欢迎,{{name}}!</group>   
                <div v-if="isChangeT">
                    <div  style="margin-top:10%" >
                        <divider>{{flowList.businame}}</divider>
                        <group class="flow" :id="flowList.pk_busitype" ref="advance">
                            <span>信用额度剩余:{{flowList.mny}}元,</span>
                            <span>本次订单额度:{{flowList.advancePrice}}元</span>
                            
                        </group>
                        <pannel v-for="productItem in flowList.nouse" :key="productItem.sj" :index="productItem.sj" :parentId="flowList.pk_busitype" 
                        :invname="productItem.invname" :invspec="productItem.invspec" :nprice="productItem.nprice" :NNUMBER="productItem.NNUMBER"></pannel>
                        <div class="add" v-show="isAddShow">
                            <img src="./../../assets/image/add.png" alt="" style="width:6%" @click="add2(flowList.pk_busitype)" :id="flowList.pk_busitype" >
                        </div>
                    </div>
                </div>
                
                <div v-else>
                    <div v-for="flowItem in flowList" :key="flowItem.pk_busitype" style="margin-top:10%" >
                        <divider>{{flowItem.businame}}</divider>
                        <group class="flow" :id="flowItem.pk_busitype" ref="advance">
                            <span>信用额度剩余:{{flowItem.mny}}元,</span>
                            <span>本次订单额度:{{flowItem.advancePrice}}元</span>
                            
                        </group>
                        <pannel2 v-for="productItem in flowItem.nouse" :key="productItem.sj" :index="productItem.sj" :parentId="flowItem.pk_busitype"></pannel2>
                        <div class="add" v-show="isAddShow">
                            <img src="./../../assets/image/add.png" alt="" style="width:6%" @click="add(flowItem.pk_busitype)" :id="flowItem.pk_busitype" >
                        </div>
                        
                    </div>
                </div>
                
                <divider style="padding-top:15%">我是有底线的</divider>
                    <deles v-if="tjShow"></deles>
                    <tj v-else></tj>
            </div>
            <div class="enter" v-else>
                 <p style="text-align:center">抱歉:您的额度不够,暂无法下单!</p>
            </div>
        </div>
</template>

<script>
import pannel from './children/pannel'
import pannel2 from './children/pannel2'
import tj from './children/tj'
import deles from './children/deles'
import {  Divider,Group  } from 'vux'
import { isNull } from 'util';
export default {
    name:'enter',
    components:{
        pannel,
        Divider,
        tj,
        Group,
        deles,
        pannel2
    },
    data () {
        return{
            name:''
        }
    },
    computed:{

        // 判断是否显示删除按钮
        tjShow () {
            return this.$store.getters.radioShow
        },
        
        // 流程列表
        flowList () {
            return this.$store.state.flowList
        },

        // 添加按钮是否显示
        isAddShow () {
            return this.$store.state.isAddShow
        },

        // 预订单占用额度
        advancePrice(){
            return this.$store.state.advancePrice
        },

        // 之前的模板是否已经填写完
        beforeModal(){
            return this.$store.state.beforeModal
        },

        // 判断用户是否点击了修改
        isChangeT(){
            return this.$store.state.isChangeT
        },

        //获取到的产品流程是否为空(默认有额度)
        isNull(){
            return this.$store.state.isNull
        },

        //初始化接口是否请求成功--默认没有成功
        isaxios(){
            return this.$store.state.isaxios
        }
    },
    created(){
        this.$store.commit('keepAlive','enter')
        this.$store.commit('keepAlive','successMsg')
        // 调流程和产品接口
        if(!this.isChangeT){
            
            this.$vux.loading.show({})
            this.$axios({
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded ",
                },
                method: 'POST',
                dataType: 'json',
                url: this.url+'/ncPreorderServiceController.do?getNcProductList',   //请求的接口地址
                data: {
                    sessionid:localStorage.sessionid
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
            }).then((res)=>{
                this.$vux.loading.hide()
                this.isTrShow=true,
                this.$store.commit('isaxios',true)
                localStorage.busilist=JSON.stringify(res.data)
                if(res.data.busilist.length){   //判断是否有额度
                    this.$store.commit('flowList',res.data.busilist)
                }else{
                    this.$store.commit('changeIsNull',false)
                }
                
            }).catch((err)=>{
                //服务器报错
                this.$vux.loading.hide() //隐藏加载动画
                this.$vux.alert.show({
                    title: '注意',
                    content: '服务器异常,请稍后再试!',
                })
            })
        }else{
            this.$store.commit('flowList',JSON.parse(localStorage.changeFlowList))
        }

    },
    mounted(){

        // 调用客户信息接口
        this.$axios.get(this.url+'/ncPreorderServiceController.do?custinfodatagrid', {
        params: {
            sessionid:localStorage.sessionid,
        }
        }).then((response)=> {
            localStorage.cusName = response.data.rows[0].custname
            this.$store.commit('peopleCode',response.data.rows[0])
            this.name = response.data.rows[0].custname
            if(localStorage.addres){

            }else{
                this.$vux.alert.show({
                    title: '登录成功',
                    content: '欢迎,'+response.data.rows[0].custname+',请确保是您本人在进行操作'
                })
            }
        }).catch((e)=> {
            this.$vux.alert.show({
                title: '注意',
                content: '服务器异常,请稍后再试!',
            })
        })

        // 调用车型接口
        this.$axios.get(this.url+'/ncPreorderServiceController.do?caratagrid', {
        params: {
            sessionid:localStorage.sessionid,
        }
        }).then((response)=> {
            this.$store.commit('models',response.data.rows)
        }).catch((e)=> {
            this.$vux.alert.show({
                title: '注意',
                content: '服务器异常,请稍后再试!',
            })
        })
    },
    methods:{

        // 点击流程中的添加按钮
        add(msg){
            this.$store.commit('productList',msg)
            if(this.beforeModal){
                this.$vux.alert.show({
                    title: '注意',
                    content: '请将之前的订单模板填写完后,再增加新的订单模板!',
                })
            }
        },
        //修改模板中的点击
        add2(msg){
            this.$store.commit('productList2',msg)
            if(this.beforeModal){
                this.$vux.alert.show({
                    title: '注意',
                    content: '请将之前的订单模板填写完后,再增加新的订单模板!',
                })
            }
        },
    },
    beforeRouteLeave (to, from, next) {
        if(to.path == '/searc'){
            this.$store.commit('changekeepAlive','searc')
        }
        
        next()
    },
}
</script>

<style scoped>

    .enter{
        height: 100%;
        padding-top: 18%;
        padding-bottom: 40%;
        padding-left: 3%;
        padding-right: 3%;
        
    }
    .load{
        padding-top: 40%;
        text-align: center
    }
    .add{
        text-align: center;
        padding-top: 12%;
    }
    .flow{
        color: #fff;
        font-weight: bolder;
        text-align: center;
    }
    /* 流程背景 */
    .flow >>> .weui-cells{
        background-color: #F0F0F0;
        color:rgb(151,5,5);
        font-weight: normal
    }
    .flowT >>> .weui-cells{
        color:rgb(151,5,5);
        background-color: #F0F0F0;
        font-weight: bolder;
        text-align: center;
    }
</style>

