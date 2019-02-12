<template>
    <div class="orderDetail">
        <divider>订单详情</divider>
        <form-preview v-for="(item,index) in products" :key="index" header-label="产品总额" :header-value="item[4].value" :body-items="item"  style="margin-top:3%"></form-preview>
    </div>
</template>

<script>
import { FormPreview,Divider } from 'vux'
export default {
    name:'orderDetail',
    components:{
        FormPreview,
        Divider
    },
    data(){
        return{
       
        }
    },
    computed:{
        products(){        //订单号中的产品组
            return this.$store.state.products
        }
    },
}
</script>

<style scoped>
    .orderDetail{
        padding-top: 18%;
        font-size: 18px;
        padding-bottom: 18%;
    }
    .orderDetail >>> .weui-form-preview__btn_primary{
        color:rgb(151,5,5);
        text-decoration:none;
        font-weight: bolder;
    }
    .orderDetail >>> .weui-form-preview__hd .weui-form-preview__value{
        font-size: 1em;
    }
</style>

