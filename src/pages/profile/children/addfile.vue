<template>
    <div>
        <group title="选择地址" v-for="(item,index) in address" :key="index">
            <div class="row" >
                <label class="demo--label" >
                    <div>
                        
                            <input class="demo--radio" type="radio" name="demo-radio" :checked="item.checked"  ref="rad" :id="index" @click="xz">
                            <span class="demo--radioInput"></span>
                        
                    </div>
                    
                    <div style="width:280px;margin-left:4%" class="content">
                        <p >{{item.namePhone}}</p>
                        <p  style="color: #999999;">{{item.addres}}</p>
                    </div>
                    
                </label>
                <div style="width:55px;">
                    <img src="./../../../assets/image/addres.png" alt="" style="width:50%" :id="index" @click="modif(index)" ref="xg">
                </div>
            </div>
        </group>
    </div>
</template>

<script>
import {Group, Checker, CheckerItem } from 'vux'
export default {
    name:'addfile',
    components:{
        Group, 
        Checker, 
        CheckerItem
    },
    data(){
        return{
           
            address:localStorage.addres?JSON.parse(localStorage.addres):"",
        }
    },
    methods:{
        xz(){      //选中哪个地址
            for(let i in this.$refs.rad){
                if(this.$refs.rad[i].checked ==true){
                    let arr =JSON.parse(localStorage.addres)
                    for(let k in arr){
                        if(k == i){
                            arr[k].checked = true
                            localStorage.addresChecked =JSON.stringify(arr[k]) 
                        }else{
                            arr[k].checked = false
                        }
                    }
                    localStorage.addres = JSON.stringify(arr) 
                }
            }
            if(sessionStorage.addresFrom == 'orderFrom' && localStorage.addresChecked){
                this.$router.push({path:'/orderFrom'})
            }
        },
        modif(index){     //修改地址
            let arr =JSON.parse(localStorage.addres)
            for(let j in arr){
                if(j == index){
                    localStorage.addrChange=JSON.stringify(arr[j]);
                    this.$router.push({name:"addrChange",params:{name:arr[j].name,phone:arr[j].phone,addres:arr[j].addr,partAddres:arr[j].partAddres}})
                }
            }
            
        }
    },
}
</script>

<style scoped>
    .demo--label{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left:4%;
    }
    /* .demo--label{
        margin:20px 20px 10px 0;
        display:inline-block
    } */
    .demo--radio{
        display:none
    }
    .demo--radioInput{
        background-color:#fff;border:1px solid #cd9a51;
        border-radius:100%;
        display:inline-block;
        height:16px;
        width:16px;
        line-height:1
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
    .content{
        display: flex;
        flex-wrap: wrap;
    }
    .row{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>

