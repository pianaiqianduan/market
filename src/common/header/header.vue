<template>
    <div class="header" style="position:fixed;left:0;right:0;top:0">
        <x-header :left-options="headerLeftShow" @on-click-back="back">
            {{name}}
            <a slot="right" @click="rightClick" v-show="headerRightShow" ref="rightView" >{{headerRightMsg}}</a>
        </x-header>
    </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
    name:'heade',
    components:{
        XHeader
    },
    data(){
        return{
       
        }
    },
    methods:{
        // 点击导航栏右侧,判断用户是否添加模板
        rightClick(){
            if(this.$refs.rightView.text=='删除'){
                this.$store.commit('changeHeaderMsg','完成')
                if(this.isAddModle){
                    this.$vux.alert.hide()
                }else{
                    this.$vux.alert.show({
                        title: '注意',
                        content: '您还未添加订单模板,请添加模板后再操作',
                    })

                }
          
            }else if(this.$refs.rightView.text=='完成'){
                this.$store.commit('changeHeaderMsg','删除')
          
            }
        
            
        },
        back(){
            alert(1)
        }
    },
    computed:{
        name(){
            return this.$store.state.headerMsg
        },
        headerRightShow(){
            return this.$store.state.headerRightShow
        },
        headerRightMsg(){
            return this.$store.state.headerRightMsg
        },
        
        // 监听用户是否加载模板
        isAddModle(){
            return this.$store.state.isAddModle
        },

        //是否显示左侧返回按钮
        headerLeftShow(){
            return this.$store.state.headerLeftShow
        },
        //地址信息是否保存完整
        isSaveAddres(){
            return this.$store.state.isSaveAddres
        }
    },
    watch:{
        '$route.path': function(val, oldVal) {
            if(val=="/"){
                this.bus.$emit('routerChange',val)
            }else if(val =="/orderFrom"){
                this.bus.$emit('routerChange',val)
            }else if(val=="/changeOrder"){  
                this.bus.$emit('routerChange',val)
            }else if(val == "/orderDetail"){
                this.bus.$emit('routerChange',val)
            }else if(val == "/changeOrder"){
                this.$store.commit('changekeepAlive','changeOrder')
            }else if(val == "/addres" && this.isSaveAddres){
                this.$router.push({path:'/mine'})
            }
        }
    }
}
</script>

<style scoped>
    .header{
        z-index: 999;
    }
</style>

