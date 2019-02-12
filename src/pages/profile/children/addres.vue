<template>
       
        <div class="addres">
            <group>
                <x-input title="收货人" placeholder="名字" v-model="name"></x-input>
                <x-input title="联系电话" placeholder="手机或固定电话" v-model="phone"></x-input>
                <x-input title="收件地址" placeholder="请选择" v-model="addres"></x-input>
                <x-input title="详细地址" placeholder="如街道、楼层、门牌号等" v-model="partAddres"></x-input>
            </group>
            <div style="margin-top:8%;padding-bottom:25%;">
                <x-button type="primary" @click.native="save">{{btnMsg}}</x-button>
            </div>
        
         </div>
</template>

<script>
import { Cell,Group,XInput,XSwitch,Selector,XButton } from 'vux'
export default {
    name:'addres',
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
            name:'',
            phone:'',
            addres:'',
            partAddres:'',
            btnMsg:'保存'    
        }
    },
    methods:{
        save(){     //保存用户地址
            if(this.name && this.phone && this.addres && this.partAddres){    //判断必填项是否填写
                let changeAddres={};
                changeAddres.namePhone = this.name+','+this.phone;     //拼接姓名和电话字段
                changeAddres.addres = this.addres + this.partAddres;   //拼接地址和详细地址字段
                changeAddres.checked = false;      //判断是否选中
                changeAddres.name = this.name;
                changeAddres.phone = this.phone;
                changeAddres.addr = this.addres;
                changeAddres.partAddres = this.partAddres;
                this.$store.commit('saveAddres',changeAddres);
                let _this = this  //改变this指向
                _this.$vux.alert.show({
                    content: '保存成功',
                    onHide () {
                        _this.$router.push({name:'profile'});    //跳转到地址选择页面
                        _this.$store.commit('isSaveAddres',true)  //地址是否填写完整
                        _this.name = "";
                        _this.phone = "";
                        _this.addres = "";
                        _this.partAddres = "";
                    }
                })
            }else{
                this.$vux.alert.show({
                    title: '注意',
                    content: '请将地址信息填写完整后再保存！',
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
    .addres{
        padding-top: 15%;
    }
</style>


