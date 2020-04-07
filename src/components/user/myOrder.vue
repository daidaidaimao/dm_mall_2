<template>
  <div>
    <div class="headOrder">
    <b-input placeholder="输入商品标题或订单号进行搜索"
             type="search"
             size="is-small"
             class="searchOrder"
             >
    </b-input>
    <b-button @click="searchOrder" size="is-small" class="searchButton">订单搜索</b-button>
    <el-button type="text" class="moreDetail" @click="showLimit()"><span class="searchFont">{{ bName}}<i class="el-icon-arrow-down el-icon--right"></i></span></el-button>
    </div>
    <form v-show="moreLimit">
      <b-field label="交易状态"
               :label-position="labelPosition"
                class="orderStatus">
        <b-select placeholder="全   部">
          <option value="0">全部</option>
          <option value="1">等待买家付款</option>
          <option value="2">买家已付款</option>
          <option value="3">卖家已发货</option>
          <option value="6">交易成功</option>
          <option value="7">交易关闭</option>
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

    >
    <el-table-column type="expand" width="20" >
      <template slot-scope="scope">
        <el-table
            :data="scope.row.item">
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
       width="750px"
       label="全部订单"
        :sortable="true"
        :sort-method="sortByTime"

        >
       <template slot-scope="scope">
         <p class="desc">时间:{{ getTime(scope.row.orderTime) }}订单号: {{scope.row.orderId}}</p>
       </template>
     </el-table-column>
    <el-table-column
      width="77px"
      label="实付款"
      prop="orderMoney">
    </el-table-column>
<!--    <el-table-column-->
<!--      label="收货地址"-->
<!--      prop="address">-->
<!--    </el-table-column>-->
    <el-table-column
      label="交易状态"
      :filters="[{ text:'待付款', value:0 },{text:'待发货',value:1}]"
      :filter-method="filterState">
      <template slot-scope="scope">
          {{ getStatus(scope.row.status) }}
        <el-button type="primary" size="small" @click="pay(scope.row.orderId)" v-show="nicai(scope.row.status)">付款 </el-button>
        <el-button type="primary" size="small" :disabled="nizaicai(scope.row.status)" @click="cancelOrder(scope.row.orderId)">取消订单</el-button>
        <el-button type="primary" size="small" @click="confirmReceipt(scope.row.orderId)" v-show="caicaikan(scope.row.status)">确认收货</el-button>
        <el-button type="primary" size="small" @click="toComment(scope.row.orderId)" v-show="nixinma(scope.row.status)">评价订单</el-button>

        {{ queryOrderTime(scope.row.orderId,scope.row.status) }}

        <p v-show="nicai(scope.row.status)" >距离订单过期还有{{ time }}秒</p>

<!--        <count-down  :currentTime="0" :startTime="0" :endTime="54646" :tipText="'剩余付款时间'" :tipTextEnd="'剩余付款时间'" :endText="'订单已经取消，请重新下单'" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分钟'" :secondsTxt="'秒'" ></count-down>-->
<!--        {{ queryOrderTime(scope.row.orderId,scope.row.status) }}-->

<!--        <p>{{ getTimeDao(time,scope.row.status) }}</p>-->

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
      nizaicai(val){
          return val !== 0;
      },
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
      caicaikan(val){
          return val === 2;
      },
      nixinma(val){
          return val === 3;
      },
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
          alert("nothing");
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
      }




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

</style>
