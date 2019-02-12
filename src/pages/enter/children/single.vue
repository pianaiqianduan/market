<template>
    <div class="single">
        <label class="demo--label">
            <div>
                <input class="demo--radio" type="checkbox" name="demo-radio" @click="allChecked" ref="all" :checked="isChecked">
                <span class="demo--radioInput" ></span>
            </div>
        </label>
        <div style="position:fixed;top:86.8%;left:10%">
            <slot name="all" ></slot>
        </div>
        
    </div>
</template>

<script>
export default {
    name:'single',
    data(){
        return{
          
        }
    },
    computed:{
        isChecked(){
            return this.$store.state.isChecked
        }
    },
    methods:{
        // 主动点击全选执行的事件
        allChecked(){
            if(this.$refs.all.checked == true){
                let msg = this.$refs.all.checked
                this.$store.commit('changeDisabled',msg )
            }else if(this.$refs.all.checked == false){
                let msg = this.$refs.all.checked
                this.$store.commit('changeFalse',msg)
            }
        }
    }
}
</script>

<style scoped>
    /* 单选样式并美化 */
     .demo--label{
        position: fixed;
        top:86.8%;
        left: 3%;
    }
    .demo--radio{
        display:none
    }
    .demo--radioInput{
        background-color:#fff;
        border:1px solid #cd9a51;
        border-radius:100%;
        display:inline-block;
        height:16px;
        width:16px;
        line-height:1;
        vertical-align:bottom
    }
    .demo--radio:checked + .demo--radioInput:after{
        background-color:#cd9a51;
        border-radius:100%;content:"";
        display:inline-block;
        height:12px;
        margin:2px;
        width:12px
    }
    .demo--checkbox.demo--radioInput,.demo--radio:checked + .demo--checkbox.demo--radioInput:after{
        border-radius:0
    }
</style>

