<template>
    <div style="padding-top:10%">
        <msg :title="msgS" :description="explain" :buttons="buttons" :icon="icon"></msg>
    </div>
</template>

<script>
import { Msg, XButton} from 'vux'
export default {
    name:"successMsg",
    components:{
        Msg,
        XButton
    },
    data(){
        return{
            msgS:"",
            explain:"",
            icon:'',
            buttons: [{
                type: 'primary',
                text: '返回首页',
                link:'/'
            }, {
                type: 'default',
                text: '订单查询',
                link: '/searc'
            }]

        }
    },
    computed:{
        status(){
            return this.$store.state.status
        }
    },
    mounted(){
        
        if(this.status == 3){
            this.msgS = "订单提交成功";
            this.explain = "本次订单提交成功!您可返回订单录入页面继续下单,或者跳转到查询页面进行订单查询。";
        }else{
            this.msgS = "订单保存成功";
                this.explain = "本次订单保存成功!您可返回订单录入页面继续下单,或者跳转到查询页面进行订单查询。";
        }
    },
    created(){
        // this.$store.commit('changIsChangeT',false)
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
                localStorage.busilist=JSON.stringify(res.data)
                 this.$store.commit('changIsChangeT',false)
                this.$store.commit('flowList',res.data.busilist)
               
            }).catch((err)=>{
                //服务器报错
                this.$vux.loading.hide() //隐藏加载动画
                this.$vux.alert.show({
                    title: '注意',
                    content: '服务器异常,请稍后再试!',
                })
            })
    },
    beforeRouteLeave (to, from, next) {
        if(to.path == '/'){
            this.$store.commit('changekeepAlive','enter')
        }else if(to.path == '/searc'){
            this.$store.commit('changekeepAlive','enter')
            this.$store.commit('changekeepAlive','searc')
        }
        next()
    }
}
</script>

<style scoped>

</style>


