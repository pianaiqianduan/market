<template>
    <div class="changeOrder" v-if="changeDetail">
        <divider>订单修改</divider>
        <form-preview   header-label="订单总额" :header-value="rental" :body-items="changeDetail" :footer-buttons="buttons" style="margin-top:3%"></form-preview>
    </div>
    <div v-else>
        <p style="text-align:center;margin-top:25%;font-size:25px;">订单已删除!!</p>
    </div>
</template>

<script>
import { FormPreview,Divider } from 'vux'
export default {
    name:'changeOrder',
    components:{
        FormPreview,
        Divider
    },
    data(){
        return{
            changeDetail: localStorage.changeDetail?JSON.parse(localStorage.changeDetail):"",
            buttons: [
                {
                    style: 'primary',
                    text: '删除订单',
                    onButtonClick: () => {
                        this.$vux.loading.show({})
                        this.$axios.get(this.url+'/ncPreorderServiceController.do?doDel', {     //订单删除接口
                        params: {
                            sessionid:localStorage.sessionid,
                            id:this.whichId
                        }
                        }).then((res)=> {
                            this.$vux.loading.hide()
                            if(res.data.success == true){
                                sessionStorage.deleted = 'true'
                                this.$router.push({path:"/searc"})
                            }
                        }).catch((err)=> {
                            this.$vux.loading.hide()
                            this.$vux.alert.show({
                                title: '注意',
                                content: '服务器异常,请稍后再试!',
                            })
                        })
                    }
                },
                {
                    style: 'primary',
                    text: '修改订单',
                    onButtonClick: () => {
                        this.$vux.loading.show({})
                        this.$axios.get(this.url+'/ncPreorderServiceController.do?preorderheaddatagrid', {     //调用提交接口
                        params: {
                            sessionid:localStorage.sessionid,
                            id:this.whichId
                        }
                        }).then((res)=> {
                            this.$store.commit('changeFlowList',res.data.rows[0])
                            
                        }).catch((err)=> {
                            this.$vux.alert.show({
                                title: '注意',
                                content: '服务器异常,请稍后再试!',
                            })
                        })
                    }
                }
            ]
        }
    },
    computed:{
        rental(){              //订单总额
            return this.$store.state.rental
        },
        whichId(){            //用户点击的是哪个订单号
            return this.$store.state.whichId
        },
        isChange(){         //用来判断修改按钮中的第一个接口是否调用
            return this.$store.state.isChange
        }
    },
    created(){
        sessionStorage.deleted = ''
        this.$store.commit('keepAlive','changeOrder')
    },
    beforeRouteLeave (to, from, next) {
        if(to.path == '/searc' && sessionStorage.deleted == 'true'){
            this.$store.commit('changekeepAlive','searc')
            localStorage.removeItem("changeDetail")
        }else if(to.path == '/'){
            this.$store.commit('changekeepAlive','enter')
        }
        next()
    },
    watch:{
        isChange(val){
          if(val){
              this.$axios.get(this.url+'/ncPreorderServiceController.do?preorderdetaildatagrid', {     //调用提交接口
                params: {
                    sessionid:localStorage.sessionid,
                    id:this.whichId
                }
                }).then((res)=> {
                    this.$vux.loading.hide()
                    this.$store.commit('Nouse',res.data.rows)
                    this.$router.push({name:"enter"})
                }).catch((err)=> {
                    this.$vux.loading.hide()
                    this.$vux.alert.show({
                        title: '注意',
                        content: '服务器异常,请稍后再试!',
                    })
                })
          }
        }
    }
}
</script>

<style scoped>
    .changeOrder{
        padding-top: 18%;
        font-size: 18px;
    }
    .changeOrder >>> .weui-form-preview__btn_primary{
        color:rgb(151,5,5);
        text-decoration:none;
        font-weight: bolder;
    }
    .changeOrder >>> .weui-form-preview__hd .weui-form-preview__value{
        font-size: 1.3em;
    }
</style>

