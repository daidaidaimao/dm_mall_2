<template>
  <div>
    <el-steps :active="statusIndex" align-center v-if="order.status !== -1">
      <el-step title="拍下物品" description="2020-4-9 16:48:30"></el-step>
      <el-step title="付款到呆毛宝" description="2020-4-9 16:48:34"></el-step>
      <el-step title="卖家发货" description="2020-4-9 16:48:54"></el-step>
      <el-step title="确认收货" description="2020-4-9 16:48:54"></el-step>
      <el-step title="评价" description="2020-4-9 16:48:54"></el-step>
    </el-steps>
<!--   orderID: {{orderId}}-->
    <el-container class="orderContainer">
      <el-aside width="300px" style="background-color: #fbfbfb;text-align: left">
        <div style="height: 29px;background-color: #F3F3F3;font-size: 12px;line-height: 29px;font-weight: bold;text-align: left;padding-left: 10%" class="orderContainer_2">订单信息</div>
        <p style="font-size: 12px;margin: 10% 0 2% 6%;">收货地址:{{order.address}}</p>
        <p style="font-size: 12px;margin: 2% 0 2% 6%;"> 买家留言: -</p>
        <p style="font-size: 12px;margin: 2% 0 2% 6%;">订单编号:{{order.orderId}}</p>
        <p style="font-size: 12px;margin: 2% 0 2% 6%;line-height: 33px;">商家:DaiMaoMall
        <img :src="ali" style="align-content: center;line-height: 33px;vertical-align: middle;" title="点击直接和卖家交流选好的宝贝（未实现）"/>
        </p>
      </el-aside>
      <el-main class="orderContainer_3" v-if="order.status===2">
        <p style="text-align: left;margin-left: 10%"><i class="el-icon-warning-outline" style="font-size: 40px;margin-right: 2%;color: blue"></i><span style="font-weight: bold">订单状态: 商家已发货，等待买家确认</span></p>
      <ul style="text-align: left;margin-left: 20%;margin-top: 3%">
        <li><p style="font-size: 12px">您还有6天8小时41分37秒;来确认收货,超时订单自动确认收货</p></li>
        <li><p style="font-size: 12px"> 物流：邮政快递包裹运单号:9898553888408</p></li>
        <li><p style="font-size: 12px"> 2020-04-09 18:35:22 您已在南京青年城绯云苑5栋店完成取件，感谢使用菜鸟驿站，期待再次为您服务。</p></li>
        <li style="margin-top: 5%;line-height: 27px"><p style="font-size: 12px"><span>您可以</span> <b-button size="is-small" @click="confirmReceipt(orderId)">确认收货</b-button></p></li>
      </ul>
      </el-main>
      <el-main class="orderContainer_3" v-if="order.status===-1">
        <p style="text-align: left;margin-left: 10%"><i class="el-icon-warning-outline" style="font-size: 40px;margin-right: 2%;color: blue"></i><span style="font-weight: bold">订单状态: 交易关闭</span></p>
        <ul style="text-align: left;margin-left: 20%;margin-top: 3%">
          <li><p style="font-size: 12px">关闭类型:退款成功</p></li>
          <li><p style="font-size: 12px"> </p></li>
          <li><p style="font-size: 12px">  </p></li>
          <li style="margin-top: 5%"><p style="font-size: 12px"><span>您可以</span> 备忘 申请开票</p></li>
        </ul>
      </el-main>
      <el-main class="orderContainer_3" v-if="order.status===1">
        <p style="text-align: left;margin-left: 10%"><i class="el-icon-warning-outline" style="font-size: 40px;margin-right: 2%;color: blue"></i><span style="font-weight: bold">订单状态: 买家已付款，等待商家发货</span></p>
        <ul style="text-align: left;margin-left: 20%;margin-top: 3%">
          <li><p style="font-size: 12px">商家还有6天8小时41分37秒;来发货货,超时订单自动取消</p></li>
          <li><p style="font-size: 12px"> 物流：等待商家发货</p></li>
          <li><p style="font-size: 12px"> </p></li>
          <li style="margin-top: 5%"><p style="font-size: 12px"><span>您可以</span> 催发货</p></li>
        </ul>
      </el-main>
      <el-main class="orderContainer_3" v-if="order.status===3">
        <p style="text-align: left;margin-left: 10%"><i class="el-icon-circle-check" style="font-size: 40px;margin-right: 2%;color: green"></i><span style="font-weight: bold">订单状态: 交易成功</span></p>
        <ul style="text-align: left;margin-left: 20%;margin-top: 3%">
<!--          <li><p style="font-size: 12px">您还有6天8小时41分37秒;来确认收货,超时订单自动确认收货</p></li>-->
          <li><p style="font-size: 12px"> 物流：邮政快递包裹运单号:9898553888408</p></li>
          <li><p style="font-size: 12px"> 2020-04-09 18:35:22 您已在南京青年城绯云苑5栋店完成取件，感谢使用菜鸟驿站，期待再次为您服务。</p></li>
          <li style="margin-top: 5%"><p style="font-size: 12px"><span>您可以</span> <router-link :to="'/comment/'+order.orderId">评价</router-link> 备忘</p></li>
        </ul>
      </el-main>
      <el-main class="orderContainer_3" v-if="order.status===4">
        <p style="text-align: left;margin-left: 10%"><i class="el-icon-circle-check" style="font-size: 40px;margin-right: 2%;color: green"></i><span style="font-weight: bold">订单状态: 已评价</span></p>
        <ul style="text-align: left;margin-left: 20%;margin-top: 3%">
          <!--          <li><p style="font-size: 12px">您还有6天8小时41分37秒;来确认收货,超时订单自动确认收货</p></li>-->
          <li><p style="font-size: 12px"> 物流：邮政快递包裹运单号:9898553888408</p></li>
          <li><p style="font-size: 12px"> 2020-04-09 18:35:22 您已在南京青年城绯云苑5栋店完成取件，感谢使用菜鸟驿站，期待再次为您服务。</p></li>
          <li style="margin-top: 5%"><p style="font-size: 12px"><span>您可以</span>  备忘</p></li>
        </ul>
      </el-main>
    </el-container>
    <el-table
      :data="orderItem"
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

  </div>
</template>

<script>
import {getRequest} from "../../utils/api";

export default {
  data:function () {
      return {
        orderId:this.$route.params.orderId,
        statusIndex:3,
        order:{},
        orderItem:[],
        ali:require('@/assets/plist/ali.png'),
      }
  },
  inject: ['reload'],
  methods:{
    initOrderItem(val){
      getRequest('/user/queryItem?orderId='+val).then( resp => {
        this.orderItem = resp.data;
        console.log(this.orderItem);
        getRequest('/user/queryOrderDetail?orderId='+val).then(  resp =>{
          this.order = resp.data;
          console.log(this.order);
          if(this.order.status === 1){
            this.statusIndex = 2;
          }else if(this.order.status === 2){
            this.statusIndex = 3;
          }else if(this.order.status === 3){
            this.statusIndex =4;
          }else if(this.order.status ===4){
            this.statusIndex = 5;
          }
        })
      })
    },
    confirmReceipt(val){
      getRequest('/user/confirmReceipt?orderId='+val).then(resp=>{
        alert(resp.data.message);
        this.reload();
      })
    },
  },
  mounted() {
    this.initOrderItem(this.orderId);
  },
}
</script>

<style scoped>
.orderContainer{
  border-style: solid;
  border-width: 1px;
  border-color: #DDD;
  margin-top: 3%;
}
.orderContainer_2{
  border-style: solid;
  border-width: 0px 0px 1px 0px;
  border-color: #DDD;
}
.orderContainer_3{
  border-style: solid;
  border-width: 0px 0px 0px 1px;
  border-color: #DDD;
}
  .tableOrderItem{
    border-style: solid;
    border-width: 1px;
    border-color: #DDD;
    margin-top: 5%;
  }
</style>
