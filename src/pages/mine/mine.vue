<template>
    <div class="mine">
        <div class="head">
            <img src="./../../assets/image/person.png" alt="" style="width:12%">
            <span>{{cusName}}</span>
        </div>
        <!-- <card :header="{title:name}">
            <div slot="content" class="card-demo-flex card-demo-content01">
                <div class="vux-1px-r">
                    <img src="./../../assets/image/enter.png" alt="" style="width:25%">
                    <br/>
                   订单录入
                </div>
                <div class="vux-1px-r">
                    <img src="./../../assets/image/search.png" alt="" style="width:25%">
                    <br/>
                    订单查询
                </div>
                <div class="vux-1px-r">
                    <img src="./../../assets/image/save.png" alt="" style="width:25%">
                    <br/>
                    已保存的订单
                </div>
                <div>
                    <img src="./../../assets/image/details.png" alt="" style="width:25%">
                    <br/>
                    订单详情
                </div>
            </div>
        </card> -->
        <group>
            <cell title="收货地址编辑" @click.native="address">
                <img src="./../../assets/image/right.png" alt="" style="width:15%">
            </cell>
        </group>
        <group>
            <cell title="如遇缺货" @click.native= "no">
                <img src="./../../assets/image/right.png" alt="" style="width:15%">
            </cell>
        </group>
        <x-button type="primary" @click.native="out" style="margin-top:40%;width:90%;margin-left:5%" mini>退出</x-button>
    </div>
</template>

<script>
import { Card, Group, Cell, XButton} from 'vux'
export default {
    name:'mine',
    components:{
        Card,
        Group,
        Cell,
        XButton
    },
    data(){
        return{
            name:'我的订单',
            cusName:localStorage.cusName?localStorage.cusName:''
        }
    },
    methods:{
        address(){
            this.$router.push({path:'/profile'})
        },
        out(){
            sessionStorage.clear()
            localStorage.clear()
            this.$router.push({name:"login"})
            this.$store.commit('changeLogined')
            this.$store.commit('changeHeader', '登录')
            this.$store.commit('changeHeaderRight', false)
            this.$store.commit('headerLeftShow', false)
            this.$store.commit('changeLogined')
            this.$store.commit('changekeepAlive','login')
        },
        no(){
            this.$vux.alert.show({
                    title: '注意',
                    content: '该功能暂未开通!'
                })
        }
    }
}
</script>

<style scoped lang="less">
    @import '~vux/src/styles/1px.less';
    .mine{
        position:relative;
        top:0;
        left: 0;
        padding-top: 40px;
    }
    .head{
        width: 100%;
        height: 100px;
        background: rgb(151,5,5);
        /* text-align:center; */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
    }
    .card-demo-flex {
        display: flex;
    }
    .card-demo-content01 {
        padding: 10px 0;
    }
    .card-padding {
        padding: 15px;
    }
    .card-demo-flex > div {
        flex: 1;
        text-align: center;
        font-size: 12px;
    }
    .card-demo-flex span {
        color: #f74c31;
    }
    
</style>


