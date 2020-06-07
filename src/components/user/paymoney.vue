<template>
<div>
  <el-tabs type="border-card">
  <el-tab-pane label="微信支付">暂不支持</el-tab-pane>
  <el-tab-pane label="支付宝"><el-button @click="aliPay(orderId)"> 前往付款</el-button></el-tab-pane>

</el-tabs>
<el-button type="primary" @click="pay(orderId)">我付完了！</el-button>
  <el-steps :active="2" align-center>
    <el-step title="拍下物品" description=""></el-step>
    <el-step title="付款到呆毛宝" description=""></el-step>
    <el-step title="卖家发货" description=""></el-step>
    <el-step title="确认收货" description=""></el-step>
    <el-step title="评价" description=""></el-step>
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
            htmls:"",
          pName:"test",
          order:{},
          htmlData:"",

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
                      // console.log("删除购物车内商品:"+this.item[i].productName)
                    })
                  })
                }
              })
            })
        });
            alert("付款成功");
            this.$router.push('/orderDetail/'+this.orderId)
        },
      aliPay(val){
        getRequest('/user/queryOrderDetail?orderId='+val).then( resp =>{
          this.order = resp.data;
          getRequest('/user/alipay?orderId='+this.order.orderId+'&pName='+this.pName+'&orderMoney='+this.order.orderMoney).then( resp=>{
            console.log(resp.data.data);
            let routerData = this.$router.resolve({path:'/payGateWay',query:{ htmlData: resp.data.date}});
            // 打开新页面
            this.htmlData = resp.data.data;
            // window.open(routerData.href, '_ blank');
            const div = document.createElement('div');
            div.innerHTML = this.htmlData;
            document.body.appendChild(div);
            document.forms[0].submit();

          })
        })
      }
    }
}
</script>

<style scoped>

</style>
