<template>
     <div class="addrChange">
            <group>
                <x-input title="收货人" placeholder="名字" v-model="name"></x-input>
                <x-input title="联系电话" placeholder="手机或固定电话" v-model="phone"></x-input>
                <x-input title="收件地址" placeholder="请选择" v-model="addres"></x-input>
                <x-input title="详细地址" placeholder="如街道、楼层、门牌号等" v-model="partAddres"></x-input>
            </group>
            <div style="margin-top:8%;padding-bottom:25%;">
                <x-button type="primary" @click.native="change">确认修改</x-button>
            </div>
        
         </div>
</template>

<script>
import { Cell,Group,XInput,XSwitch,Selector,XButton } from 'vux'
export default {
    name:"addrChange",
    components:{
        Cell,
        Group,
        XInput,
        XSwitch,
        Selector,
        XButton   
    },
    data(){
        return{
            name:this.$route.params.name,
            phone:this.$route.params.phone,
            addres:this.$route.params.addres,
            partAddres:this.$route.params.partAddres
        }
    },
    methods:{
        change(){
           if(this.name!=this.$route.params.name){
                let arr = JSON.parse(localStorage.addrChange);
                arr.name = this.name;
                arr.checked = false
                arr.namePhone = this.name+','+arr.phone;
                localStorage.addrChange = JSON.stringify(arr)
                this.$store.commit('saveAddres',arr)
                let _this = this  //改变this指向
                _this.$vux.alert.show({
                    content: '地址修改成功',
                    onHide () {
                        _this.$router.push({name:'profile'});    //跳转到地址选择页面
                        _this.name = "";
                        _this.phone = "";
                        _this.addres = "";0
                        _this.partAddres = "";
                    }
                })
           }else if(this.phone!=this.$route.params.phone){
                let arr = JSON.parse(localStorage.addrChange);
                arr.phone = this.phone;
                arr.checked = false
                arr.namePhone = arr.name+','+this.phone;
                localStorage.addrChange = JSON.stringify(arr)
                this.$store.commit('saveAddres',arr)
                let _this = this  //改变this指向
                _this.$vux.alert.show({
                    content: '地址修改成功',
                    onHide () {
                        _this.$router.push({name:'profile'});    //跳转到地址选择页面
                        _this.name = "";
                        _this.phone = "";
                        _this.addres = "";
                        _this.partAddres = "";
                    }
                })
           }else if(this.addres!=this.$route.params.addres){
                let arr = JSON.parse(localStorage.addrChange);
                arr.addr = this.addres;
                arr.checked = false
                arr.addres = this.addres+','+arr.partAddres;
                localStorage.addrChange = JSON.stringify(arr)
                this.$store.commit('saveAddres',arr)
                let _this = this  
                _this.$vux.alert.show({
                    content: '地址修改成功',
                    onHide () {
                        _this.$router.push({name:'profile'});    //跳转到地址选择页面
                        _this.name = "";
                        _this.phone = "";
                        _this.addres = "";
                        _this.partAddres = "";
                    }
                })
           }else if(this.partAddres!=this.$route.params.partAddres){
                let arr = JSON.parse(localStorage.addrChange);
                arr.partAddres = this.partAddres;
                arr.addres = arr.addr+','+this.partAddres;
                localStorage.addrChange = JSON.stringify(arr)
                this.$store.commit('saveAddres',arr)
                let _this = this  
                _this.$vux.alert.show({
                    content: '地址修改成功',
                    onHide () {
                        _this.$router.push({name:'profile'});    //跳转到地址选择页面
                        _this.name = "";
                        _this.phone = "";
                        _this.addres = "";
                        _this.partAddres = "";
                    }
                })
           }else{
               this.$vux.alert.show({
                    title: '注意',
                    content: '您并未进行任何修改',
                })
           }
        }
    },
    created(){
         this.$store.commit('keepAlive','addres')
    },
    beforeRouteLeave (to, from, next) {
        if(to.path == '/profile'){
            this.$store.commit('changekeepAlive','profile')
        }
        next()
    }
}
</script>

<style scoped>
    .addrChange{
        padding-top: 15%;
    }
</style>


