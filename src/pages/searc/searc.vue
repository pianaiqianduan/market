<template>
    <div class="search">
        <group>
            <selector  placeholder="流程名称选择" :options="flowList" v-model="flowValue"></selector>
        </group>
        <group>
            <selector  placeholder="单据状态选择" :options="list" v-model="defaultValue"></selector>
        </group>
        <div class="tit">
            <group style="width:50%">
                <datetime v-model="startDate" placeholder="订单开始日期" :end-date="Tday"></datetime> 
            </group>
            <group  style="width:50%">
                <datetime v-model="endDate" placeholder="订单结束日期" :end-date="Tday"></datetime>
            </group>
        </div>
        <div class="btnS">
            <x-button type="warn" mini @click.native="tj" style="width:80%">查询</x-button>
        </div>
        <divider>查询结果</divider> 
       
            <div id="mescroll" class="mescroll" mescroll-touch-y v-show="isShow" key="div" v-if="dataList" >
                <div key="div1" class="table_grad scroll_tablex">
                    <x-table :cell-bordered="false" style="background-color:#fff;margin-top:5%" responsive>
                    <thead>
                        <tr>
                            <th>订单号</th>
                            <th>订单总额</th>
                            <th>订单状态</th>
                            <th>发运状态</th>
                            <th>订单修改</th>
                            <th>下单日期</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        <tr v-for="(listV,index) in dataList" :key="index">
                            <td>
                                <a  href="javascript:;" @click="dj(listV.id)">
                                    {{listV.vreceiptcode}}
                                </a>
                            </td>
                            <td>{{listV.nmny}}元</td>
                            <td> {{listV.fstatus}}</td>
                            <td v-if = "listV.djfstatus == '1'">预订单</td>
                            <td v-else-if = "listV.djfstatus == '2'">已生成订单</td>
                            <td v-else>已出库</td>
                            <td v-if="listV.fstatus =='自由'" style="color:red" @click ="change(listV.id)">修改订单</td>
                            <td v-else>-</td>
                            <td>{{listV.dbilldate}}</td>
                        </tr>
                        
                    </tbody>
                    </x-table>
                </div>
            </div>
       
    </div>
</template>

<script>

import foot from './../../common/footer/footer';
import heade from './../../common/header/header';
import {Group, Datetime, Selector, Search, Divider, XButton, Flexbox, FlexboxItem, XTable } from 'vux'
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
export default {
    name:'searc',
    components:{
        heade,
        foot,
        Group,
        Datetime,
        Selector,
        Search,
        Divider,
        XButton,
        Flexbox, 
        FlexboxItem,
        XTable
    },
    data(){
        return{
            startDate:'',
            endDate:'',
            list:[
                {key:'',value:'全部'},
                {key:'1',value:'自由'},
                {key:'2',value:'审批'},
                {key:'3',value:'提交'},
                {key:'4',value:'关闭'},
                {key:'5',value:'作废'}
            ],
            defaultValue:'',
            flowList:[
                {key:'',value:'全部'},
                {key:'0001AV100000000G8TM3',value:'酒祖费用发货流程'},
                {key:'0001AV100000000G8TM5',value:'绵柔M系列费用发货流程'},
                {key:'0001AV100000000G8TMB',value:'绵柔其他费用发货流程'},
                {key:'0001AV100000000G8TMP',value:'一斤半费用发货流程'},
                {key:'0001AV100000000IS6KV',value:'杜一费用发货流程'},
                {key:'0001AV100000000G8TLY',value:'现金发货流程'},
                {key:'0001AV100000000G8TMS',value:'其他费用发货流程'}
            ],
            flowValue:'',
            mescroll: null, //mescroll实例对象
            dataList:[], //列表数据
            isShow:false,
            Tday:''
        }
    },
    methods:{
        
        tj(){               //查询方法
            if(this.startDate && this.endDate){      //查询条件不能为空
                if(!this.isShow && this.mescroll){   //当查询条件变化时
                    this.isShow = true
                    //重置列表数据
					this.mescroll.resetUpScroll();
					//隐藏回到顶部按钮
                    this.mescroll.hideTopBtn();
                }else if(this.mescroll == null){
                    this.isShow = true
                    this.mescroll = new MeScroll("mescroll", { //在vue的mounted生命周期初始化mescroll,确保此处配置的id能够被找到
                    up: {   
                            
                            callback: this.upCallback,
                            toTop: { //配置回到顶部按钮
                                src: require('@/assets/image/mescroll-totop.png') //此处动态引入assets的文件需用require
                            },
                            // 数据第一页无数据时
                            empty:{ 
                                warpId : 'mescroll' , 
                                icon : null , 
                                tip : "暂无订单数据,请重新输入查询条件~" , 
                                btntext : "" , 
                                btnClick : null,
                                supportTap : false 
                            },
                            // 列表的数据要大于1条才能显示end
                            noMoreSize:1,

                            // 硬件加速样式,使动画更流畅
                            hardwareClass:"mescroll-hardware",

                            // 上拉加载中的样式修改
                            htmlLoading:'<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',

                            // 加载完毕时的样式修改
                            htmlNodata:'<p class="upwarp-nodata"> -- 加载完毕 -- </p>',
                                
                            // 是否在初始化完毕之后自动执行一次上拉回调
                            auto:true,
                        },
                        down: {
                            use:false
                        }
                        
                    });
                }
            }else{
                this.$vux.alert.show({
                    title: '注意',
                    content: '查询条件不能为空',
                })
            }

        },
        upCallback(page) {
            //联网请求
            this.$axios.get(this.url+'/ncPreorderServiceController.do?datagrid', {
            params: {
                num: page.num, //页码
                size: page.size, //每页长度
                sessionid:localStorage.sessionid,
                dbilldate_begin:this.startDate,  //订单开始日期
                dbilldate_end:this.endDate,    //订单结束日期
                businame:this.flowValue, // 流程名称
                fstatus:this.defaultValue  //订单状态
            }
            }).then((response)=> {
            //请求的列表数据
            let arr = response.data.rows;
            //如果是第一页需手动制空列表
            if (page.num == 1) this.dataList = [];
            //把请求到的数据添加到列表
            this.dataList = this.dataList.concat(arr);
            //数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
                this.mescroll.endSuccess(arr.length);
            })
           
            }).catch((e)=> {
            //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
            this.mescroll.endErr();
            })
            
        },
        
        dj(id){     // 点击订单号跳转到订单详情
            this.$vux.loading.show({})
            this.$axios.get(this.url+'/ncPreorderServiceController.do?preorderdetaildatagrid', {     //调用提交接口
            params: {
                sessionid:localStorage.sessionid,
                id:id
            }
            }).then((res)=> {
                this.$vux.loading.hide()
                this.$store.commit('products',res.data.rows)
                this.$router.push({name:'orderDetail'})
            }).catch((e)=> {
                this.$vux.loading.hide()
                this.$vux.alert.show({
                    title: '注意',
                    content: '服务器异常,请稍后再试!',
                })
            })
        },
        change(id){
            this.$vux.loading.show({})
            this.$axios.get(this.url+'/ncPreorderServiceController.do?preorderheaddatagrid', {     //调用经销商提交接口
            params: {
                sessionid:localStorage.sessionid,
                id:id
            }
            }).then((res)=> {
                this.$store.commit('changeDetail',res.data.rows[0]);
                this.$axios.get(this.url+'/ncPreorderServiceController.do?preorderdetaildatagrid', {     //调用提交接口
                params: {
                    sessionid:localStorage.sessionid,
                    id:id
                }
                }).then((res)=> {
                    this.$vux.loading.hide()
                    this.$store.commit('rental',res.data.rows);
                    this.$store.commit('whichId',id)
                    this.$router.push({name:'changeOrder'});
                }).catch((e)=> {
                    this.$vux.loading.hide()
                    this.$vux.alert.show({
                        title: '注意',
                        content: '服务器异常,请稍后再试!',
                    })
                })
            }).catch((e)=> {
                this.$vux.alert.show({
                    title: '注意',
                    content: '服务器异常,请稍后再试!',
                })
            })
        }

    },
    watch:{              //监听查询条件的变化
        flowValue(val,oldValue){
            if(val != oldValue){
               this.isShow = false;
            }
        },
        defaultValue(val,oldValue){
            if(val != oldValue){
                this.isShow = false;
            }
        },
        startDate(val,oldValue){
            if(val != oldValue){
                this.isShow = false;
            }
        },
        endDate(val,oldValue){
            if(val != oldValue){
                this.isShow = false;
            }
        }
    },
    created(){
        this.$store.commit('keepAlive','searc')
        let dayN = new Date()  //创建日期对象
        let year = dayN.getFullYear()
        let mon = dayN.getMonth()
        if(mon+1 < 10){
            mon = '0' + (mon+1)
        }else{
            mon = (mon+1)
        }
        let day = dayN.getDate()
        if(day < 10){
            day = '0' + day
        }
        let Tday = year + '-' + mon + '-' + day
        this.Tday = Tday
        this.startDate = Tday
        this.endDate = Tday
    },
    beforeRouteLeave (to, from, next) {
        if(to.path == '/changeOrder'){
            this.$store.commit('changekeepAlive','changeOrder')
        }
        next()
    },
}

</script>

<style scoped>
    .search{
        padding-top: 13%;
        position: relative;
        top:0;
        left: 0;
    }
    .search >>> .vux-flexbox-item{
        padding-left: 20%;
    }
    .btnS{
        padding-top: 3%;
        text-align: center
    }
    /* 修改日期选择a标签的默认样式 */
    .search >>> .vux-datetime{
        text-decoration: none;
    }
    .search >>> .weui-cells{
        margin-top:0;
        line-height: 1.22
    }
    .search >>> .weui-select{
        height: 38px;
        line-height: 38px;
    }
    .tit{
        display: flex;
    }
    .tit >>> .weui-cell__ft{
        text-align: left
    }
    /*通过fixed固定mescroll的高度*/
    .mescroll {
        position: fixed;
        top: 40%;
        bottom: 0;
        height: auto;
    }
    .mescroll >>> .mescroll-upwarp{
        padding-bottom: 21%;
    }

    .mescroll-totop{
        bottom: 30%;
    }
    .fade-enter,.fade-leave-to{
    opacity: 0;
  }
  .fade-enter-active,.fade-leave-active{
    transition: opacity 1s;
  }

  .scroll_tablex{width: 100%;overflow-y:scroll; }
.scroll_tablex table{width:auto;min-width: 100%; border:1px solid #e4e4e4; border-collapse:collapse;border-spacing:inherit;white-space: nowrap;}
.scroll_tablex table tr td{border: 1px solid #e4e4e4;padding: 5px;text-align: center;font-size: 12px;position: relative;height: 32px;border-bottom:0;border-top: 0;min-width: 60px;}

</style>
