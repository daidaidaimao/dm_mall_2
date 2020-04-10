<template>
<div>
  <el-tabs type="border-card">
  <el-tab-pane label="微信支付">微信支付</el-tab-pane>
  <el-tab-pane label="支付宝">配置管理</el-tab-pane>
  <el-tab-pane label="角色管理">角色管理</el-tab-pane>
  <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
</el-tabs>
<el-button type="primary" @click="pay(orderId)">我付完了！</el-button>
  <el-steps :active="2" align-center>
    <el-step title="拍下物品" description="2020-4-9 16:48:30"></el-step>
    <el-step title="付款到呆毛宝" description="2020-4-9 16:48:34"></el-step>
    <el-step title="卖家发货" description="2020-4-9 16:48:54"></el-step>
    <el-step title="确认收货" description="2020-4-9 16:48:54"></el-step>
    <el-step title="评价" description="2020-4-9 16:48:54"></el-step>
  </el-steps>
</div>
</template>

<script>
import {getRequest} from '@/utils/api.js'
export default {
    data: function(){
        return {
            orderId: this.$route.params.orderId,
            item :[],

        }
    },
    methods:{
        pay(val){
            let ticket = this.$cookies.get("TICKET");
        getRequest('/user/queryUsername?userId='+ticket).then(resp => {
            let username = resp.data;
            getRequest('/user/pay?orderId='+val).then( resp =>{
              getRequest('/user/queryItem?orderId='+val).then( resp =>{
                this.item = resp.data;
                for(var i = 0;i<this.item.length;i++){
                  getRequest('/user/queryCartId?productId='+this.item[i].productId+"&username="+username).then( resp =>{
                    getRequest('/user/deleteCart?id='+resp.data).then( resp=>{
                      console.log("删除购物车内商品:"+this.item[i].productName)
                    })
                  })
                }
              })
            })
        });
            alert("付款成功");
            this.$router.push('/orderDetail/'+this.orderId)
        }
    }
}
</script>

<style scoped>

</style>
