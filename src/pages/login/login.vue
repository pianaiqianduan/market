<template>
    <div class="login">
        <div class="header">
             <x-img :src="logSrc" alt="" style="width:50%"></x-img>
        </div>
        <div class="content">
            <group>
                <x-input placeholder="请输入账号" v-model="account"></x-input>
                <x-input placeholder="请输入密码" v-model="pawd" type="password" ></x-input>
            </group>
        </div>
        <div class="footer">
            <x-button type="primary" @click.native="tj">登录</x-button>
        </div>
        
    </div>
</template>

<script>
import { Group, XInput, XButton,  XImg} from 'vux'      //引入所需的组件
import { setTimeout } from 'timers';

export default {
    name:'login',
    components:{                         //注册组件
        Group,
        XInput,
        XButton,
        XImg,
    },
    data(){
        return{
            account:'',
            pawd:'',
            logSrc: require('./../../assets/image/logo1.png'),
        }
    },
    created(){
        this.$store.commit('keepAlive','login')
    },
    methods:{
        tj(){
            // this.$router.push({path:'/enter'})
            
            if(this.account!='' && this.pawd!=''){
                this.$vux.loading.show({}) //显示加载动画
                this.$axios({
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded ",
                        },
                        method: 'POST',
                        dataType: 'json',
                        url: this.url+'/userServiceController.do?applogin',   //请求的接口地址
                        data: {
                            userName :this.account,
                            passWord :this.pawd
                        },
                        transformRequest: [function (data) {
                            let ret = ''
                            for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                        }],
                    }).then((res)=>{
                    this.$vux.loading.hide() //隐藏加载动画
                    if(res.data.msgCode=='0001'){
                        localStorage.sessionid=res.data.sessionid
                        sessionStorage.logined =true
                        this.$store.commit('logined',true)
                        this.$router.push({path:'/'})
                    }else{
                        this.$vux.toast.show({
                            time:'2000',
                            type:'cancel',
                            text: '用户名或密码错误'
                        })
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
                this.$vux.toast.show({
                    time:'2000',
                    type:'warn',
                    text: '用户名和密码不能为空'
                })
            }
           
        }
    },
    beforeRouteLeave (to, from, next) {
        if(to.path == '/'){
            this.$store.commit('changekeepAlive','enter')
        }
        next()
    },
}
</script>


<style scoped>
    .login{
        padding-top: 32%;
    }
    .header{
       text-align: center
    }
    .footer{
        padding-top: 15%;
    }
</style>

