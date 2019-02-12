<template>
    <div class="tj">
        <flexbox>
            <flexbox-item style="padding-left:2%;min-width:35%">
                订单总额:<span style="font-size:18px;color:rgb(151,5,5);font-weight:bolder">{{grossMoney}}</span>元
            </flexbox-item>
            <flexbox-item >
                <x-button type="primary" style="margin-left:21%;width:200px" @click.native="tj">去结算</x-button>
            </flexbox-item>
      </flexbox>
    </div>
</template>

<script>
import{  Flexbox, FlexboxItem ,XButton,Cell} from 'vux';
export default {
    name:'tj',
    components: {
        Flexbox, 
        FlexboxItem, 
        XButton,
        Cell
    },
    data(){
        return{
            tit:''
        }
    },
    methods:{

        // 点击提交按钮
        tj(){
            const _this = this          
            // if(this.isNullModal){
            //     // 此时订单总额不为0,并且没有空的模板
            //     this.$vux.confirm.show({
            //         content: '确认要提交订单吗？',
            //         // 点击确定
            //         onConfirm () {
            //             _this.$router.push({path:'/orderFrom'});
            //             _this.$store.commit('changeA')
            //         }
            //     })
            // }else if (this.grossMoney == false){
            //     // 此时订单总额为0,提示用户不能提交
            //     this.$vux.alert.show({
            //         title: '注意',
            //         content: '请选择添加下单模板,修改后再提交',
            //     })
            // }else if (this.isNullModal == false){
            //     // 此时订单额度为0,但是有空模板
            //     this.$vux.alert.show({
            //         title: '注意',
            //         content: '您流程中有空的订单模板,请点击右上角的删除按钮,删除后再提交。',
            //     })
            // }
            if(this.grossMoney){   //总额度不为零,用户可以提交订单
                this.$vux.confirm.show({
                    content: '确认要提交订单吗？',
                    // 点击确定
                    onConfirm () {
                        _this.$router.push({path:'/orderFrom'});
                        _this.$store.commit('changeA')
                    }
                })
            }else{    //总额度为0
                this.$vux.alert.show({
                    title: '注意',
                    content: '您暂未下单,无法提交订单',
                })
            }
        },
    },
    computed:{
        // 所有流程订单总额
        grossMoney(){
            return this.$store.getters.grossMoney
        },
        // 提交的时候判断流程中的模板是否有未填写的
        isNullModal(){
            return this.$store.getters.isNullModal
        }
    }
}
</script>

<style  scoped>
    .tj{
        border: 1px solid #ccc;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 50px;
    /* height: .6; */
    /* line-height: 50px; */
    /* margin-left: 3%; */
    height: 6.1%;
    background: #CDC8B1;
    }
    .tj >>> .weui-btn{
        border-radius: 0;
    }
</style>


