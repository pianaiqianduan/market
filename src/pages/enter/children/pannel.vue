<template>
<div>
    
     <div class="pannel" >
        <label class="demo--label" v-show="show">
                <input class="demo--radio" type="checkbox" :parentid="parentId"  :id="index"  :checked="itemChecked" @click="dj" ref="checkItem">
                <span class="demo--radioInput" ></span>
        </label>
        <group class="content"  ref="mol"  :parentid="parentId"  :id="index" :item="item" >
            <div class="search">
                <span class="left">产品名称:</span>
                <search :id="parentId" @on-change="getResult" @on-result-click="resultClick" v-model="value" 
                :results="results" @on-focus="onFocus" @on-cancel="onCancel" ref="search"  auto-scroll-to-top top="46px">
                </search>
            </div>
            <div class="size">
                    <span class="left">产品规格:</span>
                    <span class="msg">{{spec}}</span> 
            </div>
                <div class="price">
                    <span class="left">产品售价:</span>
                    <span class="msg">{{priceItem}}元</span> 
            </div>
            <div class="num">
                <span class="left">数量:</span>
                <x-number :min="0" v-model="numValue" @on-change="numChange" fillable @on-focus="inpu"></x-number>                         
            </div>   
        </group>
    </div>
</div>
    
</template>

<script>
import { Group, Search, XNumber} from 'vux';
export default {
    name:'pannel',
    components:{
        Group,
        Search ,
        XNumber,
    },
    props:['index' , 'parentId','invname','invspec','nprice','NNUMBER'],
    
    data(){
        return{
            results:[],
            value: this.invname?this.invname:'',
            spec:this.invspec?this.invspec:'',
            itemcode:'',
            numValue:this.NNUMBER?Number(this.NNUMBER):0,
            priceItem:this.nprice?this.nprice:'',
            item:''
        }
    },
    watch:{
        //监听itemCheckd的变化,模拟点击事件
        itemChecked(val){
            if(val == true){
                let obj ={};
                obj.key =this.parentId
                obj.value = this.index
                obj.checked = this.ischecked
                this.$store.commit('checkedItem',obj)
            }else if(val == false){
                let obj = {};
                obj.key =this.parentId
                obj.value = this.index
                obj.checked = this.ischecked
                this.$store.commit('cancelItem',obj)
            }
        },
    },
    methods:{
        inpu(){
            alert(1)
        },

        // 按钮的点击事件
        dj(){
            if(this.$refs.checkItem.checked == true){
                let obj ={};
                obj.key =this.parentId
                obj.value = this.index
                obj.checked = true
                this.$store.commit('checkedItem',obj)
            }else if(this.$refs.checkItem.checked == false){
                let obj = {};
                obj.key =this.parentId
                obj.value = this.index
                obj.checked = false
                this.$store.commit('cancelItem',obj)
            }
        },
        onButtonClick (type) {
            // alert('on button click ' + type)
        },
        handleEvents (type) {

        },
        // 输入文字时触发
        getResult(val,id){
            this.results = val ? getResult(this.value,this.parentId) : []
        },
        // 点击结果条目时触发
        resultClick (item) {
            this.$vux.loading.show({})
            this.value=item.title
            this.spec =item.spec
            this.itemcode = item.key
            // 获取产品组接口
            this.$axios({
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                method: 'POST',
                dataType: 'json',
                url: this.url+'/ncPreorderServiceController.do?custinfodatagrid',   //请求的接口地址
                data: {
                    sessionid:localStorage.sessionid,
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
            }).then((res)=>{
                this.$store.commit('pricegroupcorp',res.data.rows[0].pk_pricegroupcorp)
                this.$axios({
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                method: 'POST',
                dataType: 'json',
                url: this.url+'/ncPreorderServiceController.do?pricedatagrid',   //获取产品单价
                data: {
                    sessionid:localStorage.sessionid,
                    pk_pricegroupcorp:this.pricegroupcorp,
                    itemcode:this.itemcode
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                }],
                }).then((res)=>{
                    
                    this.$vux.loading.hide()           
                    this.priceItem = res.data.rows[0].nprice0
                    item.nprice = res.data.rows[0].nprice0
                    item.cpricetariffid = res.data.rows[0].cpricetariffid;
                    item.cpricetypeid = res.data.rows[0].cpricetypeid;
                    item.newdisnum = res.data.rows[0].newdisnum;
                    item.pricepolicyid = res.data.rows[0].pricepolicyid;
                    this.item = item
                })
            })
            
        },
        // 输入框获取焦点时触发
        onFocus () {
        },
        // 点击取消按钮时触发
        onCancel () {
           this.spec='';
           this.priceItem='';
           this.numValue = 0;
        },
        // 点击计数器执行
        numChange(){
            if(this.value){
                // 之前的模板是都填写
                this.$store.commit('changeModal',false)
                // 搜索框内有值
                let obj = {};
                // 流程id
                obj.modalId = this.$refs.mol.$attrs.parentid;
                // 单个模板总价
                obj.allPrice = this.allPrice;
                // 单个模板id
                obj.itemId = this.$refs.mol.$attrs.id;
                // 产品名称
                obj.name = this.value;
                // 产品数量
                obj.num = this.numValue;
                // 产品售价
                obj.priceItem = this.priceItem;
                // 总提交需要用到的数据
                obj.staunitid = this.item.staunitid;
                obj.elseunitid = this.item.elseunitid;
                obj.prtyid4 = this.item.prtyid4;
                obj.id = this.item.id;
                obj.cpricetariffid = this.item.cpricetariffid;
                obj.cpricetypeid = this.item.cpricetypeid;
                obj.newdisnum = this.item.newdisnum;
                obj.pricepolicyid = this.item.pricepolicyid;
                obj.sington_conversion = this.item.sington_conversion
                this.$store.commit('advancePrice',obj);
                // 信用额度剩余是否够下单
                if(this.isGreater){
                    this.numValue = 0;
                    this.$vux.alert.show({
                        title: '注意',
                        content: '您该流程的信用额度不足,暂不能下单',
                    })
                }
            }else{
                // 搜索框内无值
                this.$vux.alert.show({
                    title: '注意',
                    content: '您还未选择产品,请选择产品后再修改数量',
                })
                this.numValue = 0;
            }
            
        },

    },
    computed:{
        show(){
            return this.$store.getters.radioShow
        },
        // 模板是否选中
        itemChecked(){
            return this.$store.state.itemChecked
        },
        // 产品组
        pricegroupcorp(){
            return this.$store.state.pricegroupcorp
        },
        // 单个模板的总价
        allPrice(){
            return this.numValue*this.priceItem
        },
        // 判断之前的模板是否填写完
        beforeModal(){
            return this.$store.state.beforeModal
        },
        isGreater(){
            return this.$store.getters.isGreater
        },
        //判断用户是否点击了修改
        isChangeT(){
            return this.$store.state.isChangeT
        },
        flowList(){
            return this.$store.state.flowList
        }
    },
    created(){
            let obj ={};
            obj.key = this.parentId
            obj.value = this.index
            obj.allPrice = 0
            this.$store.commit('changeNouse2',obj)
        
        
    }
}
function getResult (val,id) {
    let arrList =JSON.parse(localStorage.busilist).busilist
    var re=[]
    for (let i in arrList) {
        if(id == arrList[i].pk_busitype){
            arrList[i].matnrList.map(function(item){
                if(item.itemdesc.search(val) != -1){
                    re.push({
                        title: item.itemdesc ,
                        key:item.itemcode,
                        spec:item.itemspec,
                        staunitid:item.staunitid,
                        elseunitid:item.elseunitid,
                        prtyid4:item.prtyid4,
                        id:item.id,
                        sington_conversion:item.sington_conversion
                    })
                }
                
            })
            
        }
           
    }
    return re
}
</script>

<style scoped>
    /* 布局 */
    .pannel{
        display: flex;
        justify-content: space-around
    }
    /* 设置面板的宽度 */
    .pannel .content{
        width: 100%;
        margin-left: 2%;
        margin-right: 3%;
    }
    /* 搜索框 */
    .content .search{
        display: flex;
        padding-top: 2%
    }
    .search .left{
        padding-left: 6%;
        width: 40%;
    }

    /* 去掉搜索框的padding */
    .search >>> .weui-search-bar{
        padding: 4px 6px;
    }

    /* 产品规格样式 */
    .content .size{
        display: flex;
        padding-top: 2%
    }
    .size .left{
        width: 26%;
        padding-left: 6%;
        
    }
    /* 点击搜索框后的样式 */
    .content >>>.weui-search-bar_focusing{
        padding: 4px 10px;
        background-color: #EFEFF4;
    }

    .content >>> .weui-search-bar__label{
        z-index: 0
    }

    /* 产品售价 */
    .content .price{
        display: flex;
        padding-top: 2%
    }
    .price .left{
        width: 26%;
        padding-left: 6%;
    }

    /* 数量样式 */
    .content .num{
        display: flex;
    }
    .num >>> .weui-cell:before{
        border: 0;
        padding-top: 1%;
    }
    .num .left{
        width: 22%;
        padding-left: 6%;
        padding-top:3%
    }

    /* 美化单选图标 */
    .demo--label{
        height: 18px;
        margin-top: 20%;
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
    .search >>> .weui-cells.vux-search_show{
        height: 100%;
    }
   
</style>


