<template>
    <div class="deles">
        <flexbox>
            <flexbox-item>
                <single class="all">
                    <template slot="all">
                        全选
                    </template>
                </single>
            </flexbox-item>
            <flexbox-item >
                <x-button type="primary"  @click.native="del">删除</x-button>
            </flexbox-item>
      </flexbox>
    </div>
</template>

<script>
import{  Flexbox, FlexboxItem ,XButton,Cell} from 'vux';
import single from './single'
export default {
    name:'deles',
    components: {
        Flexbox, 
        FlexboxItem, 
        XButton,
        Cell,
        single
    },
    data(){
        return{

        }
    },
    methods:{
        // 点击删除按钮执行
        del(){
            this.$store.commit('deleteItem')
        },
    },
    
}
</script>

<style  scoped>
    .all{
        position: absolute;
        top: -269px;
        left: 2%;
        display: flex;
        align-items: baseline;
        width: 70px;
        justify-content: space-around;
    }
    .deles{
        border: 1px solid #ccc;
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 50px;
        height: 6.1%;
        background: #CDC8B1;
    }
    .deles >>> .weui-btn{
        border-radius: 0;
    }
</style>


