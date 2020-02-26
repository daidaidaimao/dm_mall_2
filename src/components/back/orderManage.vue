<template>
  <div>
     <el-table
    :data="order"
    style="width: 100%"
    >
    <el-table-column type="expand" width="200" >
      <template slot-scope="scope">
        <el-table
            :data="scope.row.item">
            <el-table-column
                label="商品名称"
                prop="productName"
            >
            </el-table-column>
            <el-table-column
                label="商品图片"
            >
                <template slot-scope="scope">
<!--                    {{ debug(item.row.productName)}}-->
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
<!--    <el-table-column-->
<!--      label="订单 ID"-->
<!--      prop="orderId">-->
<!--    </el-table-column>-->
       <el-table-column
         label="订单创建时间"
         :sortable="true"
         :sort-method="sortByTime">
         <template slot-scope="scope">
           {{ getTime(scope.row.orderTime) }}
         </template>
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
      label="订单状态"
      :filters="[{ text:'待付款', value: 0 },{text:'待发货',value:1}]"
      :filter-method="filterState">
      <template slot-scope="scope">
          {{ getStatus(scope.row.status) }}
        <el-button type="primary" size="small" @click="fahuo(scope.row.orderId,scope.row.status)" :v-show="dd">发货 </el-button>
      </template>
    </el-table-column>
  </el-table>
    <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getRequest} from '@/utils/api.js'
import {timestampToTime} from '@/utils/api.js'
export default {
    data:function(){
        return{
            order:[],
            dd:false,
            total:0,
            currentPage:1,
            // item:[],

        }
    },
    inject: ['reload'],
    methods:{
        initOrder(page,num){
            getRequest('/user/queryAllOrder?page='+page+"&num="+num).then( resp =>{
                this.order = resp.data.rows;
                this.total = resp.data.total;
                // console.log(this.order)
                // for(var i = 0;i<this.order.length;i++){
                //     this.item.push(this.order[i].item)
                // }
                // console.log(this.item[2])
                // console.log(this.order)

            })
        },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.initOrder(1,val);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.initOrder(val,10);
      },
        getStatus(val){
            if(val ===0){
                // this.dd = true;
                return "待付款"
            }else if(val ===1){
                // this.dd = false;
                return "待发货"
            }else if(val === -1){
                return "订单成功结束"
            }else if(val === 2){
                // this.dd = true;
                return "待买家收货"
            }
        },
      sortByTime(a,b){
        return a.orderTime-b.orderTime
      },
      filterState(value,row){
          // console.log(row.status)
        return row.status === value
      },
      getTime(val){
        return timestampToTime(val)
      },
        fahuo(val,status){
          if( status === 1 ){
            getRequest('/user/fahuo?orderId='+val).then( resp =>{
            alert(resp.data.message);
            this.reload();
          })
          }else {
            alert("订单已经发货，请勿")
          }
            // this.$router.push('/fahuo/'+val);
        },

        // getTest(val){
        //     console.log(val)
        //     return val;
        // }
        // getItem(val){
        //     getRequest('/user/queryItem?orderId='+val).then( resp =>{
        //         return resp.data;
        //     })
        // }
    },
    mounted:function(){
        this.initOrder(1,10);
    }
}
</script>

<style scoped>
</style>
