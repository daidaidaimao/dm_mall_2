<template>
  <div>
    <div class="headOrder">
    <b-input placeholder="输入商品标题或订单号进行搜索"
             type="search"
             size="is-small"
             class="searchOrder"
             v-model="orderId"
             >
    </b-input>
    <b-button @click="searchOrder" size="is-small" class="searchButton">订单搜索</b-button>
    <el-button type="text" class="moreDetail" @click="showLimit()"><span class="searchFont">{{ bName}}<i class="el-icon-arrow-down el-icon--right"></i></span></el-button>
    </div>
    <form v-show="moreLimit">
      <b-field label="交易状态"
               :label-position="labelPosition"
                class="orderStatus">
        <b-select placeholder="全   部" id="status">
          <option value="-2">全部</option>
          <option value="0">等待买家付款</option>
          <option value="1">买家已付款</option>
          <option value="2">卖家已发货</option>
          <option value="3">订单等待评价</option>
          <option value="4">交易成功</option>
          <option value="-1">交易关闭</option>
        </b-select>
      </b-field>
      <b-field label="成交时间" :label-position="labelPosition" class="orderTime">
        <b-datepicker
          placeholder="请选择时间范围起始和结束"
          v-model="dates"
          range>
          <button class="button is-danger"
                  @click="dates = null">
            <b-icon icon="close"></b-icon>
            <span>清除</span>
          </button>
        </b-datepicker>
      </b-field>

      <b-field label="卖家昵称"
               :label-position="labelPosition"
               class="saleName">
        <b-input v-model="saleName"></b-input>
      </b-field>
    </form>
   <el-table
    :data="order"
    style="width: 100%"
    class="tableOrderItem"
    :border=true
    >
    <el-table-column type="expand" width="20" >
      <template slot-scope="scope">
        <el-table
            :data="scope.row.item"
            class="tableOrderItem">
<!--            <el-table-column-->
<!--                label="商品名称"-->
<!--                prop="productName"-->
<!--            >-->
<!--            </el-table-column>-->
            <el-table-column
                label="宝贝"
                width="500px"
            >
                <template slot-scope="scope">
                  <div >
                    <img :src="scope.row.productImgurl" style="width:150px;height:107px;float:left">
                    <span class="pname">{{ scope.row.productName}}</span>
                  </div>
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
          <el-table-column
          label="">

          </el-table-column>
        </el-table>
      </template>
    </el-table-column>
<!--    <el-table-column-->
<!--      label="订单 ID"-->
<!--      prop="orderId">-->
<!--    </el-table-column>-->
<!--     <el-table-column-->
<!--      label="timeForSort"-->
<!--      prop="orderTime"-->
<!--     >-->

<!--     </el-table-column>-->
     <el-table-column
       width="450px"
       label="全部订单"
        :sortable="true"
        :sort-method="sortByTime"

        >
       <template slot-scope="scope">
         <p class="desc">时间:{{ getTime(scope.row.orderTime) }}订单号: {{scope.row.orderId}}</p>
       </template>
     </el-table-column>
    <el-table-column
      width="150px"
      label="实付款(人民币￥)"
      prop="orderMoney">
    </el-table-column>
<!--    <el-table-column-->
<!--      label="收货地址"-->
<!--      prop="address">-->
<!--    </el-table-column>-->
    <el-table-column
      label="交易状态"
      width="200px"
      :filters="[{ text:'待付款', value:0 },{text:'待发货',value:1}]"
      :filter-method="filterState">
      <template slot-scope="scope" >
        <p style="font-size: 12px">{{ getStatus(scope.row.status) }}</p>
        <router-link :to="'/orderDetail/'+scope.row.orderId" style="display: block;font-size: 12px">订单详情</router-link>
        {{ queryOrderTime(scope.row.orderId,scope.row.status) }}
        <p v-if="scope.row.status ===0 " >距离订单过期还有{{ time }}秒</p>
<!--        <count-down  :currentTime="0" :startTime="0" :endTime="54646" :tipText="'剩余付款时间'" :tipTextEnd="'剩余付款时间'" :endText="'订单已经取消，请重新下单'" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分钟'" :secondsTxt="'秒'" ></count-down>-->
<!--        {{ queryOrderTime(scope.row.orderId,scope.row.status) }}-->

<!--        <p>{{ getTimeDao(time,scope.row.status) }}</p>-->

      </template>
    </el-table-column>
     <el-table-column
       label="操作">
       <template slot-scope="scope" >
         <b-button   @click="pay(scope.row.orderId)" v-if="scope.row.status === 0" style="margin: 1%">点我付款 </b-button>
         <b-button  v-if="scope.row.status ===0 " @click="cancelOrder(scope.row.orderId)" style="margin: 0">取消订单</b-button>
         <b-button  @click="confirmReceipt(scope.row.orderId)" v-if="scope.row.status === 2">确认收货</b-button>
         <b-button  @click="toComment(scope.row.orderId)" v-if="scope.row.status === 3">评价订单</b-button>
         <el-button  icon="el-icon-delete" circle style="display: inline-block;float: right" title="删除该订单" v-if="scope.row.status ===3||scope.row.status ===4|| scope.row.status === -1 "
                     @click="open(scope.row.orderId)"
         ></el-button>
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
// import CountDown from 'vue2-countdown'
export default {
  components: {
    // CountDown
  },
    data:function(){
        return{
            userId:this.$route.params.userId,
            order:[],
            // list:[],
            dd:true,
            total:0,
            currentPage:1,
            status:"",
            time: 0,
            timexs:0,
            labelPosition: 'on-border',
            dates:[],
            saleName:"",
            moreLimit:false,
            isAdvanced:false,
            bName:"更多筛选条件",
            orderId:"",
        }
    },

    inject: ['reload'],
    methods:{
      // countDownS_cb: function (x) {
      //   console.log(x)
      // },
      // countDownE_cb: function (x) {
      //   console.log(x)
      // },
        initOrder(page,num,userId){
            // let ticket = this.$cookies.get("TICKET");
            // if(ticket === null){
            //     alert("还未登陆，点击确定转入登陆界面");
            //     this.$router.push('/login');
            // }else{
            //     getRequest('/user/query/'+ticket).then( resp =>{
            //         if(resp.data.status === 201){
            //             this.$cookies.remove("TICKET");
            //             alert(resp.data.message);
            //             this.reload();
            //             this.$router.push('/')
            //         }else{
            getRequest('/user/pageOrder?page='+page+"&num="+num+"&userId="+userId).then( resp => {
                this.order = resp.data.rows;
                this.total = resp.data.total;
                // console.log(this.order)
                // for(var i =0;i<this.order.length;i++){
                //     let list = this.order[i].item
                //     this.list = list;
                // }

                // this.order.item = JSON.parse(this.order.clist);
                // console.log(this.order);
                // console.log(this.order.item)
                // console.log(this.list)
            })
          // console.log(( new Date() ).getTime()+this.time*1000)
            //         }
            //     })
            // }
        },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.initOrder(1,val,this.userId);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.initOrder(val,10,this.userId);
        },
        getStatus(val){
            if(val === 0){
                return "等待买家付款"
            }else if(val ===1){
                // this.dd = false;
                return "买家已付款"
            }else if(val === -1){
                return "交易关闭"
            }else if(val === 2){
                // this.dd = false;
                return "卖家已发货"
            }else if(val === 3){
              return "订单等待评价"
            }else if(val === 4){
              return "交易成功"
            }
        },
        getTime(val){
          return timestampToTime(val)
        },
        pay(val){
            this.$router.push('/pay/'+val);
        },
        sortByTime(a,b){
            return a.orderTime-b.orderTime
        },
        filterState(value,row){
          return row.status === value
        },
        nicai(val){
          return val === 0;
        },
      queryOrderTime(orderId,status){
          if (status === 0){
          getRequest('/user/queryOrderTime?orderId='+orderId).then( resp => {
            // console.log(resp.data.message+"test")
            // this.time = Number(resp.data.message);
            // console.log(this.time)
            this.$cookies.set("time",Number(resp.data.message))
          })
          }
          },
      // nizaicai(val){
      //     return val !== 0;
      // },
      countDown() {
        let clock = window.setInterval(() => {
          this.time = this.$cookies.get("time");
          // console.log(this.time)
          this.time--
        },1000)
      },
      // jishiqi(a,b){
          // let clock = this.queryOrderTime(a,b);
          // setInterval(this.queryOrderTime(a,b),1000);
          // this.reload()

      // }
      // getTimeDao(val,status){
      //     if(status === 0){
      //     let _this = this;
      //
      //     if (val === 0)
      //       return "订单已经取消"
      //     else{
      //       this.timexs="订单还有"
      //       val --;
      //       setTimeout(function () {
      //           _this.getTime(val);
      //       },1000);
      //     }
      //     }else
      //       return "";
      //
      // },
    confirmReceipt(val){
          getRequest('/user/confirmReceipt?orderId='+val).then(resp=>{
            alert(resp.data.message);
            this.reload();
          })
    },
      // caicaikan(val){
      //     return val === 2;
      // },
      // nixinma(val){
      //     return val === 3;
      // },
      toComment(orderId){
          this.$router.push('/comment/'+orderId);
      },
      // whetherComment(userId,orderId,status){
      //     if (status === 3){
      //     getRequest("/user/whetherComment?userId="+userId+"&orderId="+orderId).then(resp => {
      //       console.log(resp.data);
      //     });
      //     }
      // }
      cancelOrder(val){
        getRequest("/user/cancelOrder?orderId="+val).then(resp=>{
          console.log(resp.data.status);
          this.reload();
        })
      },
      searchOrder(val){
          var status = document.getElementById("status").value;
          // console.log(status,this.dates,this.orderId);
        var startDtm="";
        var endDtm="";
        if(this.dates.length===2) {
          let d = this.dates[0];
          let month = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
          let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
          startDtm = d.getFullYear() + '-' + month + '-' + day;
          let e = this.dates[1];
          let month2 = e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1;
          let day2 = e.getDate() < 10 ? "0" + e.getDate() : e.getDate();
          endDtm = e.getFullYear() + '-' + month2 + '-' + day2;
        }
        // console.log(startDtm,endDtm);
        // console.log(this.dates[0].getDate())
          getRequest('/user/orderSearch?orderId='+this.orderId+'&startDtm='+startDtm+'&endDtm='+endDtm+'&status='+status+'&userId='+this.userId).then(resp=>{
            console.log(resp.data.data);
            this.order = resp.data.data;
          })
      },
      showLimit(val){
          this.isAdvanced = !this.isAdvanced;
          if(this.isAdvanced){
            this.moreLimit = true;

            this.bName = "收起";
          }else{
            this.moreLimit = false;
            this.bName = "更多筛选条件";
          }
      },
      open(val){
          // console.log(2333);
        this.$confirm('此操作将永久删除该订单,不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
            onConfirm:getRequest('/user/deleteOrderByOrderId?userId='+this.userId+'&orderId='+val).then( resp =>{
              this.reload();
            }),
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },




    },
    mounted:function(){
        this.initOrder(1,10,this.userId);
        this.countDown()
    }
}
</script>

<style scoped>
  /* .demo-table-expand {
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
  } */
  .desc{
    font-size: 10px;
  }
  .pname{
    font-size: 10px;
    padding-left: 1%;
  }
  .headOrder{
    height: 27px;
    margin-bottom: 2%;
  }
  .searchOrder{
    width: 30%;
    display: inline-block;
    float: left;
  }
  .searchButton{
    float: left;
    display: inline-block;
  }
  .searchFont{
    float: left;
    font-size: 12px;
    height: 27px;
    line-height: 27px;
    padding-left: 1%;
  }
  .moreDetail{
    display: inline-block;
    float:left;
    padding: 0 0 0 1%;
    color: black;
  }
  .orderStatus{
    display: inline-block;
    float: left;
    margin-right: 10%;
  }
  .orderTime{
    width: 30%;
    display: inline-block;
    float: left;
  }
  .saleName{
    display: inline-block;
    width: 30%;
  }
  .tableOrderItem{
    border-style: solid;
    border-width: 1px;
    border-color: #DDD;
    margin-top: 1%;
  }

</style>
