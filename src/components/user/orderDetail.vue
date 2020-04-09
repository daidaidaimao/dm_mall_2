<template>
  <div>
    <el-steps :active="statusIndex" align-center>
      <el-step title="拍下物品" description="2020-4-9 16:48:30"></el-step>
      <el-step title="付款到呆毛宝" description="2020-4-9 16:48:34"></el-step>
      <el-step title="卖家发货" description="2020-4-9 16:48:54"></el-step>
      <el-step title="确认收货" description="2020-4-9 16:48:54"></el-step>
      <el-step title="评价" description="2020-4-9 16:48:54"></el-step>
    </el-steps>
   orderID: {{orderId}}
    <el-container>
      <el-aside width="300px" style="background-color: #fbfbfb">
        <div style="height: 29px;background-color: #F3F3F3;font-size: 12px;line-height: 29px;font-weight: bold">订单信息</div>
        <p style="font-size: 12px;margin: 2%;">收货地址:{{}}</p>
        <p style="font-size: 12px;margin: 2%;"> 买家留言:{{}}</p>
        <p style="font-size: 12px;margin: 2%;">订单编号:{{}}</p>
        <p style="font-size: 12px;margin: 2%;">商家:{{}}</p>
      </el-aside>
      <el-main>
        <p><i class="el-icon-warning-outline" style="font-size: 40px"></i><span style="font-weight: bold">订单状态: 商家已发货，等待买家确认</span></p>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data:function () {
      return {
        orderId:this.$route.params.orderId,
        statusIndex:3,
      }
  }
}
</script>

<style scoped>

</style>
