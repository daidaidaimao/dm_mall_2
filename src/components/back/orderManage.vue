<template>
     <el-table
    :data="order"
    style="width: 100%"
    >
    <el-table-column type="expand" width="200" > 
      <template slot-scope="scope">
        <el-table
        :data="scope.row.item"
            >
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
          {{ getStatus(scope.row.status) }}<el-button type="primary" size="small" @click="fahuo(scope.row.orderId)" :disabled="dd">发货 </el-button> 
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {getRequest} from '@/utils/api.js'
export default {
    data:function(){
        return{
            order:[],
            dd:false,
            item:[],
            
        }
    },
    inject: ['reload'],
    methods:{
        initOrder(val){
            getRequest('/user/orderManage').then( resp =>{
                this.order = resp.data;
                for(var i = 0;i<this.order.length;i++){
                    this.item.push(this.order[i].item)
                }
                
            })
        },
        getStatus(val){
            if(val ==0){
                return "待付款"
            }else if(val ==1){
                this.dd = false;
                return "待发货"
            }else if(val == -1){
                return "订单成功结束"
            }else if(val == 2){
                this.dd = true;
                return "待收货"
            }
        },
        fahuo(val){
            getRequest('/user/fahuo?orderId='+val).then( resp =>{
                alert(resp.data.message);
                this.reload();
            })
        },
        // getItem(val){
        //     getRequest('/user/queryItem?orderId='+val).then( resp =>{
        //         return resp.data;
        //     })
        // }
    },
    mounted:function(){
        this.initOrder();
    }
}
</script>

<style scoped>

</style>