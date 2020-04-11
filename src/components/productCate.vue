<template>
    <div id="productList">
        <!-- 商品展示 -->

      <el-breadcrumb separator="/" >

        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">商品分类</el-breadcrumb-item>
        <el-breadcrumb-item>{{categoryName}}</el-breadcrumb-item>
<!--        <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
      </el-breadcrumb>
 <div class="list" v-for="p in plist" v-bind:key="p.productId">
        <!-- <el-container> -->
        <img :src="p.productImgurl" class="picture" style="width:300px;height:400px"  @click="goDetail(p.productId)" alt="nima">
        <!-- <div class="demo-image__preview">
        <el-image
        style="width: 250px; height: 400px;margin-top :5%"
        :src="p.productImgurl"
        :fit="fit"
        class="pic"
        @click="goDetail(p.productId)"
        ></el-image>
        </div> -->
        <!-- <img class="card-img-top" alt = {{p.productName }}/> -->
            <!-- <el-row class="test">
            <el-col :span="16" align="middele">
                    <div> -->
        <div class="test">
            <span class="price">￥{{ p.productPrice.toFixed(2) }} </span><p class="baoyou">包邮</p>
            <p class="sale"> {{p.sale }}人付款</p>
        </div>
            <!-- <img :src= {{ p.productImgurl }} > -->
            <!-- <h5 class="name"><router-link :to="{name: 'productDetail',params:{productId:p.productId}}">{{ p.productName }} </router-link> </h5> -->
            <el-button type="text" @click="goDetail(p.productId)" class="name">{{ p.productName }}</el-button>
            <!-- <p class="card-text overflow-hidden" style="height:25px">{{ p.productDescription }}</p> -->
            <!-- <p class="card-text overflow-hidden" style="height:25px">在售：{{ p.productNum }}件</p> -->
            <!-- <h4 class="card-text">价格: {{ p.productPrice }}</h4> -->
            <!-- <a href="#" class="btn btn-primary">加入购物车</a> -->
            <!-- </el-container> -->
   <div class="guanggao">
     <el-row :gutter="20">
       <el-col :span="24"><div class="yihang">{{ p.productDescription}}</div></el-col>
       <!--            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>-->
     </el-row>
     <el-row :gutter="20">
       <el-col :span="4"><div class=""><img :src="tmall" style="margin-top: 15px;margin-left: 10px"/> </div></el-col>
       <el-col :span="16"><div class=""></div></el-col>
       <el-col :span="4"><div class=""><img :src="ali" style="margin-top: 15px;"/></div></el-col>
     </el-row>
     <el-row :gutter="20">
       <el-col :span="8"><div class="">
         <p class="shop">呆毛的小店</p>
       </div></el-col>
       <el-col :span="8"><div class=""></div></el-col>
       <el-col :span="4"><div class=""><p class="dizhi">江苏</p></div></el-col>
       <el-col :span="4"><div class=""><p class="dizhi">南京</p></div></el-col>
     </el-row>


   </div>
      </div>
    <div class="block">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </div>
    </div>

</template>

<script>
import {getRequest} from '@/utils/api'
export default {
    // name:'productList',
    data: function(){
        return {
            plist: [],
            total:0,
            currentPage:1,
            fit: 'cover',
            productCategory: this.$route.params.productCategory,
            // page: 1,
            // num: 5,
          tmall:require('@/assets/plist/tmall.png'),
          ali:require('@/assets/plist/ali.png'),
          categoryName:"",
        }
    },
    methods: {
        productList: function(page,num){
            if(this.productCategory!==0){
            getRequest("/product/cate?productCategory="+this.productCategory+"&page="+page+"&num="+num).then(resp =>{
                if(resp.data.total === 0 ){
                    this.$router.push('/error')
                }else {
                    this.plist = resp.data.rows;
                    this.total = resp.data.total;
                }
                // console.log(resp.data);
                // console.log(this.productCategory,page,num)
            })
            }else{
                getRequest("/product/page?page="+page+"&num="+num).then(resp =>{
                this.plist = resp.data.rows;
                this.total = resp.data.total;
                // console.log(resp.data);
            })
            }
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.productList(1,val);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.productList(val,5);
        },
        goDetail(val){
            this.$router.push({name: 'productDetail',params:{productId:val}})
        },
        initCategoryName(val){
          getRequest('/product/queryCategoryName?categoryId='+val).then( resp =>{
            this.categoryName = resp.data;
          })
        }

    },
    mounted:function(){
        this.productList(1,5);
        this.initCategoryName(this.productCategory)
    }
}
</script>

<style scoped>
  .el-col {
    border-radius: 4px;
    height: 38px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .guanggao{
    height: 110px;
    /*background-color: aqua;*/
  }
  .test{
    height: 40px;
    /* background-color: aqua; */
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/

  }
  .list{
    border-radius: 3px;
    display: inline-block;
    margin: 10px;
    width: 300px;
    height: 600px;
  }
  .picture{
    object-fit: cover;
  }
  .price{
    font-size: 30px;
    color: red;
    display: inline-block;
    /* float: left; */
  }
  .sale{
    font-size: 15px;
    color: grey;
    display: inline-block;
    /* text-align: right */
    /* float: right; */
    margin-left: 70px;
  }
  .name{
    width: 250px;
    color: black;
    /* line-height: 50px; */
    text-align: left;
    font-size: 15px;
    word-wrap: break-word !important;
    word-break: break-all !important;
    white-space: normal !important;

  }
.guanggao{
    height: 110px;
    /*background-color: aqua;*/
}
.test{
    height: 40px;
    /* background-color: aqua; */
                display: flex;
            align-items: center; /*定义body的元素垂直居中*/

}
.list{
    border-radius: 3px;
    display: inline-block;
    margin: 10px;
    width: 300px;
    height: 600px;
}
.picture{
    object-fit: cover;
}
.price{
    font-size: 30px;
    color: red;
    display: inline-block;
    /* float: left; */
}
.sale{
    font-size: 15px;
    color: grey;
    display: inline-block;
    /* text-align: right */
    /* float: right; */
    margin-left: 70px;
}
.name{
    width: 250px;
    color: black;
    /* line-height: 50px; */
    text-align: left;
    font-size: 15px;
    word-wrap: break-word !important;
    word-break: break-all !important;
    white-space: normal !important;

}
 .baoyou{
   background-color: red;
   font-size: 13px;
   display: inline-block;
   color: white;
   padding-left: 2px;
   padding-right: 2px;
   /* text-align: center; */
   /* margin: 0 auto; */
   /* line-height: 40px; */
   /* height: 30px; */
   /* text-align: center; */

 }
 .shop{
   font-size: 11px;
   line-height: 38px;
   text-decoration: underline;
   text-decoration-color: #8c939d;
   color: #8c939d;
 }
 .dizhi{
   font-size: 11px;
   line-height: 38px;
   color: #8c939d;
 }
 .yihang{
   display: -webkit-box;
   overflow: hidden;
   text-overflow: ellipsis;
   word-wrap: break-word;
   white-space: normal !important;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
   font-size: 13px;
   /*line-height: 38px;*/
   padding-left: 5px;
 }

</style>
