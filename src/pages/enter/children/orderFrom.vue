<template>
    <div class="orderFrom">
        <div class="address" v-if="addresC">
            <group >
                <cell  @click.native="address" is-link>
                    <p style="color:black;">{{addresC.namePhone}}</p>
                    <span  style="color: #999999;">{{addresC.addres}}</span>
                    
                </cell>
                
            </group>
            
        </div>
        <div class="addr" v-else>
            <group >
                
                <cell is-link @click.native="address" >
                     <span slot="title">选择收货地址 <span style="color:red">*</span></span>
                    <img src="./../../../assets/image/add.png" alt="" width="20" style="display:block;margin-right:5px;" slot="icon" >
                </cell>
                
            </group>
        </div>
        <div class="content" v-if="!isChangeT">
            <div v-for="(flowItem,index) in flowList" :key="index">
                <divider v-show="flowItem.nouse.length">{{flowItem.businame}}</divider>
                <form-preview  v-for="(productItem,index) in flowItem.nouse" :key="index" header-label="小计" :header-value="productItem.allPrice+'元'" 
                :body-items="productItem.arr" style="margin-top:5%"></form-preview>
                <group v-show="flowItem.nouse.length">
                    <cell title="总计" :value="flowItem.advancePrice+'元'"></cell>
                </group>
            </div>
        </div>
        <div class="content" v-else>
            <div>
                <divider >{{flowList.businame}}</divider>
                <form-preview  v-for="(productItem,index) in flowList.nouse" :key="index" header-label="小计" :header-value="productItem.allPrice+'元'" 
                :body-items="productItem.arr" style="margin-top:5%"></form-preview>
                <group >
                    <cell title="总计" :value="flowList.advancePrice+'元'"></cell>
                </group>
            </div>
        </div>
        <divider style="margin-top:5%">我是有底线的</divider>
        <infor></infor>
        <!-- <totalsubmit></totalsubmit> -->
    </div>
</template>

<script>
import { FormPreview,Divider } from 'vux'
import { Cell, Group, Selector} from 'vux'
import totalSubmit from './totalSubmit'
import information from './information'
export default {
    name:'orderFrom',
    components:{
        FormPreview,
        Divider,
        Cell,
        Group,
        totalsubmit:totalSubmit,
        infor:information,
        Selector
    },
    data(){
        return{
            addresC:localStorage.addresChecked?JSON.parse(localStorage.addresChecked):"",
        }
    },
    methods:{
        address(){
            this.$router.push({path:'/profile'})
        },
        
    },
    watch:{
        addresT(val,oldValue){
            if(val!=oldValue){
                this.addresC= JSON.parse(localStorage.addresChecked)
            }
        }
    },
    created(){
         this.$store.commit('keepAlive','orderFrom')
    },
    computed:{
        flowList(){     //获取流程及产品
        
            return this.$store.state.flowList
        },
        addresT(){  //用户最终选中的是哪个地址
            return this.$store.state.addresT
        },
        isChangeT(){  //用户修改时用的模板
            return this.$store.state.isChangeT
        }
    },
    beforeRouteLeave (to, from, next) {
        if(to.path == '/successMsg'){
            this.$store.commit('changekeepAlive','successMsg')
        }
        next()
    }
}
</script>

<style scoped>
    .orderFrom{
        padding-top: 12%;
        padding-bottom: 25%;
    }
    .content>div{
        padding-top:5%;
    }

    /* 修改面板中的头部字体大小 */
    .content >>> .weui-form-preview__value{
        font-size: 0.9em;
    }
    .content >>> .weui-form-preview__hd{
        padding: 2px 14px;
        color: rgb(151,5,5)
    }
    /* 修改分割线的字体颜色 */
    .content >>> .vux-divider{
        color: rgb(151,5,5)
    }
    /* 修改总计的字体颜色和大小 */
    .content >>>.vux-label{
        font-size: 20px;
        color:rgb(151,5,5)
    }
    .content >>> .weui-cell__ft{
        font-size: 20px;
        color:rgb(151,5,5)
    }

    .address >>>.weui-cell__ft{
        text-align: left;
        width: 100%;
    }
</style>

