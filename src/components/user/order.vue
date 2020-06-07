<template>
  <div class="container is-widescreen">
<el-table
    ref="multipleTable"
    :data="cart"
    tooltip-effect="dark"
    style="width: 100%"
    >
    <el-table-column
      prop="productName"
      label="商品名称"
      width="120"
      header-align="center">
    </el-table-column>
    <el-table-column
      label="商品图片"
      show-overflow-tooltip
      header-align="center">
      <template slot-scope="scope">
          <img :src="scope.row.productImgurl" style="width:300px;height:200px">
      </template>
    </el-table-column>
    <el-table-column
      prop = "productNum"
      label="商品数量"
      align="center"
      header-align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="productPrice"
      label="商品单价"
      align="center"
      header-align="center"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="总价"
      align="center"
      header-align="center"
      show-overflow-tooltip>
      <template slot-scope="scope">
        {{scope.row.productNum * scope.row.productPrice}}
      </template>
    </el-table-column>
    <!-- <el-table-column
        label="操作">
        <template slot-scope="scope">
            <el-button type="primary" @click="deleteCart(scope.row.id)">删除</el-button>

        </template>
    </el-table-column> -->
  </el-table>
  <div style="margin-top: 20px">
        <el-form ref="form" :model="order" label-width="80px">
            <el-form-item label="收货地址">
                <el-input v-model="order.address"></el-input>
            </el-form-item>
            <el-form-item label="总金额">
                <p class="money">{{ order.orderMoney}}</p>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
<!--                <el-button>取消</el-button>-->
            </el-form-item>
        </el-form>
  </div>
  <el-steps :active="1" align-center>
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
import {postRequest} from '@/utils/api.js'
import {testRequest} from '@/utils/api.js'

export default {
    data:function(){
        return {
            cart:[],
            address:"",
            order:{
                orderMoney:0,
                address:"",
                userId:this.$route.params.userId,
                clist:"",

            },
          time:new Date(),

        }
    },
    methods:{
        initData(val){
            // let ticket = this.$cookies.get("TICKET");
            //  if(ticket === null){
            //     alert("还未登陆，点击确定转入登陆界面");
            //     this.$router.push('/login');
            // }else{
            //     getRequest('/user/query/'+ticket).then( resp =>{
            //         if(resp.data.status === 201){
            //             this.$cookies.remove("TICKET");
            //             alert(resp.data.message);
            //             this.$router.push('/')
            //             // this.reload();
            // }else{
            let list = this.$cookies.get(val);
            if(list === null){
                alert("当前订单已过期 请重新下单");
                this.$router.push('/');
            }else{
                this.cart = JSON.parse(this.$cookies.get(val));
                this.order.orderMoney = this.$cookies.get("money");

                this.$cookies.set("time",this.time);
                // this.item = JSON.parse(this.$cookies.get(val));
                // console.log(this.cart);
                    }

                // }
            // })


        },
        onSubmit(){
            // console.log(this.order);
            // console.log(JSON.stringify(this.order))
            // console.log(JSON.stringify(this.order.item))
            if(this.order.address === ""){
              alert("请填写收货地址");
            }else{
            this.order.clist = JSON.stringify(this.cart);
            console.log(this.order);
            testRequest('/user/addOrder',this.order).then( resp =>{
                alert(resp.data.message);
                this.$cookies.remove("money");
                this.$cookies.remove("order");
              // getRequest('/user/queryItem?orderId='+val).then( resp =>{
              //   this.item = resp.data;
              //   for(var i = 0;i<this.item.length;i++){
              //     getRequest('/user/queryCartId?productId='+this.item[i].productId+"&username="+username).then( resp =>{
              //       getRequest('/user/deleteCart?id='+resp.data).then( resp=>{
              //         console.log("删除购物车内商品:"+this.item[i].productName)
              //       })
              //     })
              //   }
              // })
                this.$router.push('/pay/'+resp.data.data.orderId);

            })
        }
        }
    },
    mounted:function(){
        this.initData("order");
    }
}
</script>

<style scoped>
.money{
    font-size: 30px;
    color: red;
}
</style>
