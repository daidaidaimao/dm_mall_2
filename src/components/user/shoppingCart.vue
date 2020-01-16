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
      label="商品数量"
      align="center"
      header-align="center"
      show-overflow-tooltip>
        <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.productNum" @change="updateNum(scope.row.productNum,scope.row.id)" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"></el-input>
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
      show-overflow-tooltip>
      <template slot-scope="scope">
        {{scope.row.productNum * scope.row.productPrice}}
      </template>
    </el-table-column>
    <el-table-column
        label="操作">
        <template slot-scope="scope">
            <el-button type="primary" @click="deleteCart(scope.row.id)">删除</el-button>
            
        </template>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    价格：{{price}}
    <el-button type="primary" @click="addOrder(this.checked)">提交订单</el-button>
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
    methods:{
        initUsername(val){
            let ticket = this.$cookies.get("TICKET");
            if(ticket === null){
                alert("还未登陆，点击确定转入登陆界面");
                this.$router.push('/login');
            }else{
                getRequest('/user/query/'+ticket).then( resp =>{
                    if(resp.data.status === 201){
                        this.$cookies.remove("TICKET");
                        alert(resp.data.message);
                        this.$router.push('/')
                        // this.reload();
                    }else{
                        getRequest('/user/queryUsername?userId='+val).then(resp => {
                            console.log(resp.data);
                            let username = resp.data;
                            getRequest('/user/showCart?username='+username).then( resp=>{
                                this.cart = resp.data.data;
                            })
                        })
                    }
                })
            }
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
               p += this.checked[i].productNum*this.checked[i].productPrice;
            }
            this.price = p;
            console.log(p);
        },
        addOrder(val){

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