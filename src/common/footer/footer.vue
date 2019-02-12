<template>
    <div class="foot">
        <tabbar style="position:fixed;z-index:200;" v-model="selected">
            <tabbar-item>
                <img slot="icon" src="./../../assets/image/enter.png" ref="enter">
                 <img slot="icon-active" src="./../../assets/image/enter_active.png">
                <span slot="label">订单录入</span>
            </tabbar-item>
            <tabbar-item>
                <img slot="icon" src="./../../assets/image/search.png" ref="search">
                <img slot="icon-active" src="./../../assets/image/search_active.png">
                <span slot="label">订单查询</span>
            </tabbar-item>
            <tabbar-item>
                <img slot="icon" src="./../../assets/image/mine.png" ref="mine">
                <img slot="icon-active" src="./../../assets/image/mine_active.png">
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
import orderFromVue from '../../pages/enter/children/orderFrom.vue';

export default {
    name:'foot',
    components:{
        Tabbar,
        TabbarItem,
    },
    data(){
        return{
            selected:0
        }
    },
    mounted(){
       let _this = this
        _this.bus.$on('routerChange',function(msg){
      if(msg=="/"){
        _this.$router.push({path:'/'})
        _this.selected=0
       
      }else if(msg =="/orderFrom"){
        _this.$router.push({path:'/orderFrom'})
        _this.selected=0
      }else if(msg=="/changeOrder"){
        _this.$router.push({path:'/changeOrder'})
        _this.selected=1
      }else if(msg == "/orderDetail"){
        _this.$router.push({path:'/orderDetail'})
        _this.selected=1
      }else if(msg == "/searc"){
           _this.$router.push({path:'/orderDetail'})
           _this.selected=1
      }
    })
    },
    watch:{
        
        selected(val,oldVal){
            if(val==1){
                this.$router.push({path:'/searc'})
 
            }else if(val == 0){
                this.$router.push({path:'/'})
                
            }else if(val == 2){
                this.$router.push({path:'/mine'})
            }
        }
        
    
    },
}
</script>


<style lang="less" scoped>
    .foot{
        width: 100%;
    }
</style>
