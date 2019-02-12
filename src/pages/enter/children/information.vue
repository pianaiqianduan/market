<template>
    <div class="information">
        <group>
            <selector :title="titS" :options="models" placeholder="请选择" v-model="carValue"></selector>
        </group>
        <group>
            <datetime
                v-model="dateValue"
                :title="titD"
                placeholder="请选择">
            </datetime>
        </group>
        <group>
            <x-textarea  v-model="textValue" placeholder="备注说明" autosize :height="50"></x-textarea>
        </group>
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
    </div>
</template>

<script>
import { Group, Selector, Datetime, XTextarea  } from 'vux'
import{  Flexbox, FlexboxItem ,XButton,Cell} from 'vux';
export default {
    name:'information',
    components:{
        Group,
        Selector,
        Datetime,
        XTextarea,
        Flexbox, 
        FlexboxItem, 
        XButton,
        Cell  
    },
    data(){
        return{
            dateValue:'',
            textValue:'',
            carValue:'',
            titS:"车型选择"+`<span style="color:red">*</span>`,
            titD:"送货日期选择"+`<span style="color:red">*</span>`
        }
    },
   computed:{
        
        models(){       //获取车型信息
            return this.$store.state.models;
        },
        addresT(){   //获取用户选中的是哪个地址、并判断地址中是否有值
            return this.$store.state.addresT;
        },
        tjDate(){    //提交总数据
            return this.$store.getters.tjDate;
        },
        hasStatus(){  //单据状态是否是true
            return this.$store.state.hasStatus;
        },
        vcar(){     //车型主键
            return this.$store.state.vcar
        },
        vdef8(){   //车型名称
            return this.$store.state.vdef8
        },
        kpdate(){   //最佳送货日期
            return this.$store.state.kpdate
        },
        vnote(){    //备注信息
            return this.$store.state.vnote
        },
        status(){   //单据状态
            return this.$store.state.status
        },
        ccustomerid(){  //用户编码字段
            return this.$store.state.ccustomerid
        },
        cdeptid(){     //用户编码字段
            return this.$store.state.cdeptid
        },
        cemployeeid(){
            return this.$store.state.cemployeeid
        },
        coperatorid(){
            return this.$store.state.coperatorid
        },
        creceiptareaid(){
            return this.$store.state.creceiptareaid
        },
        creceiptcorpid(){
            return this.$store.state.creceiptcorpid
        },
        creceiptcustomerid(){
            return this.$store.state.creceiptcustomerid
        },
        csalecorpid(){
            return this.$store.state.csalecorpid
        },
        dbilldate(){
            return this.$store.state.dbilldate
        },
        dmakedate(){
            return this.$store.state.dmakedate
        },
        nexchangeotobrate(){
            return this.$store.state.nexchangeotobrate
        },
        pk_calbody(){
            return this.$store.state.pk_calbody
        },
        pk_currtype1(){
            return this.$store.state.pk_currtype1
        },
        //判断是否是在修改状态下进行的操作
        isChangeT(){
            return this.$store.state.isChangeT
        },
        //点击的是哪个id
        whichId(){
            return this.$store.state.whichId
        }
    },
    watch:{
        carValue(val,oldValue){
            if(val){
                this.$store.commit('car',val)
            }
        },
        dateValue(val,oldValue){
            if(val){
                this.$store.commit('date',val)
            }
        },
        textValue(val,oldValue){
            this.$store.commit('text',val)
        }
    },
    methods:{
        tj(){
           
            if(localStorage.addresChecked && this.dateValue  && this.carValue){     //判断必填的选项是否填写
                this.$store.commit('changeStatus',3)        //单据状态
                if(this.hasStatus){
                    this.$vux.loading.show({})
                    this.$axios.get(this.url+'/ncPreorderServiceController.do?doAudit', {     //调用提交接口
                    params: {
                        sessionid:localStorage.sessionid,
                        detail:this.tjDate,  
                        vdef5: JSON.parse(localStorage.addresChecked).name,
                        vdef6:JSON.parse(localStorage.addresChecked).phone,
                        addrname:JSON.parse(localStorage.addresChecked).addres ,
                        vcar:this.vcar,
                        vdef8:this.vdef8,
                        kpdate:this.kpdate,
                        vnote:this.vnote ,
                        status:this.status,
                        ccustomerid:this.ccustomerid,
                        cdeptid:this.cdeptid,
                        cemployeeid:this.cemployeeid,
                        coperatorid:this.coperatorid,
                        creceiptareaid:this.creceiptareaid,
                        creceiptcorpid:this.creceiptcorpid,
                        creceiptcustomerid:this.creceiptcustomerid,
                        csalecorpid:this.csalecorpid,
                        dbilldate:this.dbilldate,
                        dmakedate:this.dmakedate,
                        nexchangeotobrate:this.nexchangeotobrate,
                        pk_calbody:this.pk_calbody,
                        proc:this.isChangeT?"update":"add",
                        pk_preorder:this.isChangeT?this.whichId:"",
                        vreceiptcode:"",
                        nexchangeotobrate:"1.00000000",
                        coperatorid:"0001AV100000000L1DHW",
                        ccurrencytypeid:this.pk_currtype1
                    }
                    }).then((response)=> {
                        this.$vux.loading.hide()
                        this.$router.push({path:"/successMsg"})
                    }).catch((e)=> {
                        this.$vux.loading.hide()
                        this.$vux.alert.show({
                            title: '注意',
                            content: '服务器异常,请稍后再试!',
                        })
                    })
                }
            }else{
                let flag = false
                if(!localStorage.addresChecked){
                    this.$vux.alert.show({
                        title: '注意',
                        content: '请选择收货地址后再提交',
                    })
                    flag = true
                }else if(!this.dateValue){
                    if(!flag){
                        this.$vux.alert.show({
                            title: '注意',
                            content: '请选择送货日期后再提交',
                        })
                        flag = true
                    }else{
                        return 
                    }
                    
                }else if(!this.carValue){
                    if(!flag){
                        this.$vux.alert.show({
                            title: '注意',
                            content: '请选择车型后再提交',
                        })
                        flag = true
                    }else{
                        return 
                    }
                }
            }
        },
        save(){
            if(localStorage.addresChecked && this.dateValue  && this.carValue){     //判断必填的选项是否填写
                this.$store.commit('changeStatus',1)        //单据状态
                if(this.hasStatus){
                    this.$vux.loading.show({})
                    this.$axios.get(this.url+'/ncPreorderServiceController.do?doAudit', {     //调用提交接口
                    params: {
                        sessionid:localStorage.sessionid,
                        detail:this.tjDate,  
                        vdef5: JSON.parse(localStorage.addresChecked).name,
                        vdef6:JSON.parse(localStorage.addresChecked).phone,
                        addrname:JSON.parse(localStorage.addresChecked).addres ,
                        vcar:this.vcar,
                        vdef8:this.vdef8,
                        kpdate:this.kpdate,
                        vnote:this.vnote ,
                        status:this.status,
                        ccustomerid:this.ccustomerid,
                        cdeptid:this.cdeptid,
                        cemployeeid:this.cemployeeid,
                        coperatorid:this.coperatorid,
                        creceiptareaid:this.creceiptareaid,
                        creceiptcorpid:this.creceiptcorpid,
                        creceiptcustomerid:this.creceiptcustomerid,
                        csalecorpid:this.csalecorpid,
                        dbilldate:this.dbilldate,
                        dmakedate:this.dmakedate,
                        nexchangeotobrate:this.nexchangeotobrate,
                        pk_calbody:this.pk_calbody,
                        proc:this.isChangeT?"update":"add",
                        pk_preorder:this.isChangeT?this.whichId:"",
                        vreceiptcode:"",
                        nexchangeotobrate:"1.00000000",
                        coperatorid:"0001AV100000000L1DHW",
                        ccurrencytypeid:this.pk_currtype1
                    }
                    }).then((res)=> {
                        this.$vux.loading.hide()
                        this.$router.push({path:"/successMsg"})
                    }).catch((e)=> {
                        this.$vux.loading.hide()
                        this.$vux.alert.show({
                            title: '注意',
                            content: '服务器异常,请稍后再试!',
                        })
                    })
                }
            }else{
                    let flag = false
                if(!localStorage.addresChecked){
                    this.$vux.alert.show({
                        title: '注意',
                        content: '请选择收货地址后再提交',
                    })
                    flag = true
                }else if(!this.dateValue){
                    if(!flag){
                        this.$vux.alert.show({
                            title: '注意',
                            content: '请选择送货日期后再提交',
                        })
                        flag = true
                    }else{
                        return 
                    }
                    
                }else if(!this.carValue){
                    if(!flag){
                        this.$vux.alert.show({
                            title: '注意',
                            content: '请选择车型后再提交',
                        })
                        flag = true
                    }else{
                        return 
                    }
                }
            }
        }

    },
    
}
</script>

<style scoped>
 .information{
     margin-bottom: 10%;
 }
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


