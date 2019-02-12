<template>
    <div class="profile">
        <addfile></addfile>
        <group style="margin-top:8%;">
            <cell title="新增地址" is-link @click.native="add">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="./../../assets/image/add.png">
            </cell>
        </group>
    </div>
</template>

<script>
import addfile from './children/addfile'
import { Cell,Group } from 'vux'
export default {
    name:'profile',
    components:{
        addfile,
        Cell,
        Group
    },
    data(){
        return{
            
        }
    },
    methods:{
        add(){
            this.$store.commit('isSaveAddres',false)
            this.$router.push({path:'/addres'})
        }
    },
    computed:{
        addresFrom(){
            return this.$store.state.addresFrom
        }
    },
   created(){
        this.$store.commit('keepAlive','profile')
   },
    beforeRouteLeave (to, from, next) {
        if(to.path == '/orderFrom'){
            this.$store.commit('changekeepAlive','orderFrom')
        }
        next()
    },
    beforeRouteEnter (to, from, next) {
        if(from.path == '/orderFrom'){
            sessionStorage.addresFrom = 'orderFrom'
        }else if(from.path == '/mine'){
            sessionStorage.addresFrom = 'mine'
        }
        next()
    },
}
</script>

<style scoped>
    .profile{
        padding-top: 15%;
        padding-bottom: 20%;
    }
    /* .profile >>> .weui-cell__hd{
            margin-left: -4%;
    } */
</style>


