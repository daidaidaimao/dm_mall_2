
<template>
  <div>

    <i class="el-icon-circle-check" style="font-size: 80px;color: green"></i>
    <span>订单 {{test2.out_trade_no}} 支付成功</span>
    <el-button type="text" @click="toDetail(test2.out_trade_no)">查看订单详情</el-button>
  </div>
</template>

<script>
  import {getRequest} from '@/utils/api.js'
  export default {
    name: 'aliPay',
    data(){
      return {
        test:window.location.href,
        test2 :this.$route.query
      }
    } ,
    methods:{
      initDate(){
        getRequest('/user/alipay_callback?orderId='+this.test2.out_trade_no).then(resp =>{
          if(resp.data.status === 200){
            let ticket = this.$cookies.get("TICKET");
            getRequest('/user/queryUsername?userId='+ticket).then(resp => {
              let username = resp.data;
              getRequest('/user/queryItem?orderId=' + this.test2.out_trade_no).then(resp => {
                this.item = resp.data;
                for (var i = 0; i < this.item.length; i++) {
                  getRequest('/user/queryCartId?productId=' + this.item[i].productId + "&username=" + username).then(resp => {
                    getRequest('/user/deleteCart?id=' + resp.data).then(resp => {
                      //console.log("删除购物车内商品:"+this.item[i].productName)
                    })
                  })
                }
              })
            })
          }
        })
      },
      toDetail(val){
        this.$router.push('/orderDetail/'+val);
      }
    },
    mounted () {
      this.initDate();
    },
  }
</script>
