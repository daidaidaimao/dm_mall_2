<template>
   <el-table
    :data="order"
    style="width: 100%"
    >
    <el-table-column type="expand" > 
      <template>
        <el-table
            :data="list">
            <el-table-column
                label="商品名称"
                prop="productName"
            >
            </el-table-column>
            <el-table-column
                label="商品图片"
            >
                <template slot-scope="scope">
                    <img :src="scope.row.productImgurl" style="width:150px;height:100px">
                </template>
            </el-table-column>
            <el-table-column
                label="商品数量"
                prop="productNum"
            >
            </el-table-column>
            <el-table-column
                label="商品单价"
                prop="productPrice"
            >
            </el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column
      label="订单 ID"
      prop="orderId">
    </el-table-column>
    <el-table-column
      label="订单金额"
      prop="orderMoney">
    </el-table-column>
    <el-table-column
      label="收货地址"
      prop="address">
    </el-table-column>
    <el-table-column
      label="订单状态">
      <template slot-scope="scope">
          {{ getStatus(scope.row.status) }}<el-button type="primary" size="small">付款 </el-button> <el-button type="primary" size="small">取消订单</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {getRequest} from '@/utils/api.js'
export default {
    data:function(){
        return{
            userId:this.$route.params.userId,
            order:[],
            list:[],
        }
    },
    inject: ['reload'],
    methods:{
        initOrder(val){
            let ticket = this.$cookies.get("TICKET");
            if(ticket === null){
                alert("还未登陆，点击确定转入登陆界面");
                this.$router.push('/login');
            }else{
                getRequest('/user/query/'+ticket).then( resp =>{
                    if(resp.data.status === 201){
                        this.$cookies.remove("TICKET");
                        alert(resp.data.message);
                        this.reload();
                        this.$router.push('/')
                    }else{
            getRequest('/user/queryOrder?userId='+val).then( resp => {
                this.order = resp.data.data;
                for(var i =0;i<this.order.length;i++){
                    let list = this.order[i].item
                    this.list = list;
                }
                
                // this.order.item = JSON.parse(this.order.clist);
                // console.log(this.order);
                // console.log(this.order.item)
                // console.log(this.list)
            })
                    }
                })
            }
        },
        getStatus(val){
            if(val ==0){
                return "待付款"
            }else if(val ==0){
                return "待发货"
            }else if(val == -1){
                return "订单成功结束"
            }
        }
            
            
                
    },
    mounted:function(){
        this.initOrder(this.userId);
    }
}
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>