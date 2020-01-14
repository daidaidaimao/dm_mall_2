<template>
<div>
    <el-container>
    <el-aside>
        <img :src="product.productImgurl" class="picture">
          <!-- <el-image 
            class="picture"
            fit="cover"
            :src="product.productImgurl" 
            :preview-src-list="url">
        </el-image> -->
    </el-aside>
    <el-container>
        <el-header>
            <span class="title">{{product.productName}}</span> 
             <el-divider></el-divider>
        </el-header>
        <el-main>
            <span class="price">价格：￥{{product.productPrice}}</span>
             <el-divider></el-divider>
            <span class="desc"> {{product.productDescription}}</span>
             <el-divider></el-divider>
            <div class="num_1">
                <span class="num_2">数量</span>
                <input type="number" v-model="p_num" placeholder="1" class="num_3">
                <span class="kucun">(库存：{{product.productNum}}件)</span>
            </div>
            <span class="feihua" >承诺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-warning"></i>7天无理由</span>
            <span class="mmh">支付&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信用卡 微信 支付宝</span>
            <el-button type="primary" class="add"><i class="el-icon-goods"></i>加入购物车   </el-button>
        </el-main>
    </el-container>
    </el-container>
    
    <p v-html="product.quill"></p>

</div>


    <!-- <div class="productDetail" >
        <div class="pic">
            <img :src="product.productImgurl" class="picture">
        </div>
        <div class="content">
            <span class="title">{{product.productName}}</span> 
            <span class="price">价格：￥{{product.productPrice}}</span>
            <span class="desc"> {{product.productDescription}}</span>
            <div class="num_1">
                <span class="num_2">数量</span>
                <i class="el-icon-minus"></i>
                <input type="number" v-model="p_num" placeholder="1" class="num_3">
                <span class="kucun">(库存：{{product.productNum}}件)</span>
            </div>
            <span class="feihua" >承诺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-warning"></i>7天无理由</span>
            <span class="mmh">支付&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信用卡 微信 支付宝</span>
            <el-button type="primary" class="add"><i class="el-icon-goods"></i>加入购物车   </el-button>
        </div>
    </div>     -->
</template>

<script>
import {getRequest} from '@/utils/api'
export default {
    name: 'productDetail',
    data: function(){
        return {
            product: {},
            p_num : 1,
            url:[]
        }
    },
    methods:{
        getProduct : function(val){
            getRequest("/product/queryOne?productId="+val).then(resp =>{
                this.product = resp.data;
                this.url.push(resp.data.productImgurl);
            })
        },
        chengnuo : function(){
            
        }
    },
    mounted:function(){
        this.getProduct(this.$route.params.productId)
    }
}
</script>

<style scoped>
.add{
    float: right;
}
.picture{
    width: 98%;
    height: 98%;
    padding: 1px;
    object-fit: cover;
}
.el-container{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: left;
}
.title{
    font-size: 35px;
    font-style: inherit;
    display: block;
    margin-top: 20px;
}
.price{
    margin-top: 20px;
    font-size: 45px;
    color: red;
    display: block;
    /* background-color: blue; */
    
}
.num_3{
    text-align: center;
    font-size: 30px;
    width: 10%;
}
.feihua{
    font-size: 13px;
    color: grey;
    margin-top: 10%;
    display: block;
}
.mmh{
    font-size: 13px;
    color: grey;
}
</style>
