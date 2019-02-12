<template>
    <div class="tj">
        <flexbox>
            <flexbox-item>
                <x-button type="warn"  @click.native="save">保存</x-button>
            </flexbox-item>
            <flexbox-item >
                <x-button type="primary"  @click.native="tj">提交</x-button>
            </flexbox-item>
      </flexbox>
    </div>
</template>

<script>
import{  Flexbox, FlexboxItem ,XButton,Cell} from 'vux';
export default {
    name:'totalSubmit',
    components: {
        Flexbox, 
        FlexboxItem, 
        XButton,
        Cell
    },
    data(){
        return{
            
        }
    },
    methods:{

        // 点击提交按钮
        tj(){
           
        },

        // 点击保存按钮
        save(){
            
        },
    },
    computed:{
        
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
        height: 6.1%;
        background: #CDC8B1;
    }
    .tj >>> .weui-btn{
        border-radius: 0;
    }
    .tj >>> .vux-flexbox-item{
        margin-left: auto !important
    }
</style>


