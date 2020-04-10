<template>
<div class="container is-widescreen">
<el-table

    ref="multipleTable"
    :data="cart"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55"
      header-align="center">
    </el-table-column>
<!--    <el-table-column-->
<!--      prop="productName"-->
<!--      label="商品名称"-->
<!--      width="120"-->
<!--      header-align="center">-->
<!--    </el-table-column>-->
    <el-table-column
      width="300px"
      label="商品"
      show-overflow-tooltip
      header-align="center">
      <template slot-scope="scope">
          <img :src="scope.row.productImgurl" style="width:80px;height:80px;float: left">
        <p>{{scope.row.productName}}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="商品数量"
      align="center"
      header-align="center"
      show-overflow-tooltip>
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.productNum" @change="updateNum(scope.row.productNum,scope.row.id)" :min="1" :max="100" label="商品数量"></el-input-number>
<!--            <el-input type="number" v-model="scope.row.productNum" @change="updateNum(scope.row.productNum,scope.row.id)" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"></el-input>-->
        </template>
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
      show-overflow-tooltip
    >
      <template slot-scope="scope">
        <p style="color: #f40;font-weight: bold;font-size: 15px">￥{{scope.row.productNum * scope.row.productPrice}}</p>
      </template>
    </el-table-column>
    <el-table-column
        label="操作">
        <template slot-scope="scope">
            <el-button type="primary" @click="deleteCart(scope.row.id)">删除</el-button>

        </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px;background-color: #e5e5e5;height: 50px">
    <el-button
      v-if="price === 0"
      type="primary" @click="addOrder(checked)"
      style="float: right;height: 50px;width: 120px;font-size: 20px;font-weight: bold; background-color: #B0B0B0;border: 0;margin-left: 10%"
      :disabled=true>
      结 算</el-button>
    <el-button
      v-if="price !== 0"
      type="primary" @click="addOrder(checked)"
      style="float: right;height: 50px;width: 120px;font-size: 20px;font-weight: bold; background-color: #f40;border: 0;margin-left: 10%"
    >
      结 算</el-button>
    <p style="line-height: 50px;display: inline-block;float: right">合计（不含运费）：<span style="font-size: 25px;font-weight: bold;color: #f40;"> ￥{{price}}</span></p>

  </div>
</div>
</template>

<script>
import {getRequest} from '@/utils/api.js'
import {postRequest} from '@/utils/api.js'
export default {
    inject: ['reload'],
    data:function(){
        return {
            cart:[],
            userId: this.$route.params.userId,
            price:0,
            checked:[],
        }
    },
    // beforeRouteEnter:function(to,from,next){
    //     next( vm ={

    //     })
            // let ticket = this.$cookies.get("TICKET");
            // console.log(ticket);
            // if(ticket === null){
            //     alert("还未登陆，点击确定转入登陆界面");
            //     next('/login')
            // }else{
            //     next();
            // }
            //     console.log(ticket);
            //     getRequest('/user/query/'+ticket).then( resp =>{
            //         if(resp.data.status === 201){
            //             alert(resp.data.message);
            //             next('/')
            //             // this.reload();
            //         }else{
            //             console.log(resp.data.data)
            //             // next();
            //         }
            //   })
            // }
    // },
    methods:{
        initUsername(val){
            // let ticket = this.$cookies.get("TICKET");
            // if(ticket === null){
            //     alert("还未登陆，点击确定转入登陆界面");
            //     this.$router.push('/login');
            // }else{
            //     getRequest('/user/query/'+ticket).then( resp =>{
            //         if(resp.data.status === 201){
            //             this.$cookies.remove("TICKET");
            //             alert(resp.data.message);
            //             this.$router.push('/')
            //             // this.reload();
            //         }else{
                        getRequest('/user/queryUsername?userId='+val).then(resp => {
                            console.log(resp.data);
                            let username = resp.data;
                            getRequest('/user/showCart?username='+username).then( resp=>{
                                this.cart = resp.data.data;
                            })
                        })
            //         }
            //     })
            // }
            // getRequest('/user/queryUsername?userId='+val).then(resp => {
            //     console.log(resp.data);
            //     let username = resp.data;
            //     getRequest('/user/showCart?username='+username).then( resp=>{
            //         this.cart = resp.data.data;
            //     })
            // })
        },
        handleSelectionChange(val){
            this.checked = val;
            let  p = 0
            for(var i = 0;i<this.checked.length;i++){
               p += this.checked[i].productNum*this.checked[i].productPrice*100;
            }
            this.price = p/100;
            p = 0;
            // console.log(val);
        },
        addOrder(val){
          if(val.length === 0 ){
            alert("请选择至少一个商品下单")
          }else {
            getRequest('/user/queryUnpaidNum?userId=' + this.userId).then(resp => {
                if (resp.data.status === 200){
                  this.$cookies.set("order",JSON.stringify(val));
                  this.$cookies.set("money",this.price);
                  // getRequest('/user/queryUserId?username='+)
                  this.$router.push('/order/'+this.userId);
                }else{
                  alert("存在未付款订单，无法再生成订单");
                }
            });
          }
            // console.log(val);
            //
            // this.$cookies.set("order",JSON.stringify(val));
            // this.$cookies.set("money",this.price);
            // // getRequest('/user/queryUserId?username='+)
            // this.$router.push('/order/'+this.userId);
            //

        },
        deleteCart(val){
            getRequest('/user/deleteCart?id='+val).then( resp =>{
                if(resp.data.status === 200){
                    alert("删除成功");
                    this.reload()
                }
            })
        },
        updateNum(a,b){
            getRequest('/user/updateNum?productNum='+a+'&id='+b).then(resp=>{
                if(resp.data.status ===200){
                    console.log(a,b);
                }
            })
        }
    },
    mounted:function(){
        this.initUsername(this.userId);
    },

}
</script>

<style scoped>

</style>
