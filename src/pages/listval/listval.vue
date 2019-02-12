<template>
    <div class="listval">

        <divider style="padding-top:5%;">订单查询结果</divider>
        <x-table :cell-bordered="false" style="background-color:#fff;margin-top:8%">
            <thead>
            <tr>
                <th>订单号</th>
                <th>订单总额</th>
                <th>订单状态</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="listV in lists" :key="listV.num">
                <td>{{listV.num}}</td>
                <td>{{listV.mony}}</td>
                <td> {{listV.zt}}</td>
            </tr>
            </tbody>
        </x-table>
        <divider style="margin-top:8%">暂无数据</divider>
    </div>
</template>

<script>
import {XTable, Divider} from 'vux'

export default {
    name:'listval',
    components:{
        XTable,
        Divider,
    },
    data(){
        return{
            lists:[
                {num:'0001',mony:'10001',zt:'已发货'},
                {num:'0002',mony:'10002',zt:'已提交'},
                {num:'0003',mony:'10003',zt:'已保存'},
                {num:'0004',mony:'10004',zt:'已发货'},
                {num:'0005',mony:'10005',zt:'已提交'},
                {num:'0006',mony:'10006',zt:'已报存'},
                {num:'0007',mony:'10007',zt:'已发货'},
                {num:'0008',mony:'10008',zt:'已提交'},
                {num:'0009',mony:'10009',zt:'已保存'},
                {num:'00010',mony:'10000',zt:'已发货'},
                {num:'00011',mony:'100010',zt:'已发货'},
                {num:'00022',mony:'100021',zt:'已提交'},
                {num:'00033',mony:'100032',zt:'已保存'},
                {num:'00044',mony:'100043',zt:'已发货'},
                {num:'00055',mony:'100054',zt:'已提交'},
                {num:'00066',mony:'100065',zt:'已报存'},
                {num:'00077',mony:'100076',zt:'已发货'},
                {num:'00088',mony:'100087',zt:'已提交'},
                {num:'00099',mony:'100098',zt:'已保存'},
                {num:'000100',mony:'100009',zt:'已发货'}
            ]
        }
    }
}
</script>

<style scoped>
    .listval{
        padding-top: 20%;
        padding-bottom: 25%;
    }
    .listval >>> a{
        text-decoration: none;
    }
</style>


