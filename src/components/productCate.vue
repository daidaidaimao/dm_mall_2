<template>
    <div id="productList">
        <!-- 商品展示 -->
    <div class=" border border-primary " style="width:900px;display:inline-block" >
    <div class="card" style="width: 18rem;display:inline-block" v-for="p in plist" v-bind:key="p.productId">
    <el-image
    style="width: 250px; height: 400px;margin-top :5%"
    :src="p.productImgurl"
    :fit="fit"
    class="pic"></el-image>
    <!-- <img class="card-img-top" alt = {{p.productName }}/> -->
        <div class="card-body">
          <!-- <img :src= {{ p.productImgurl }} > -->
          <h5 class="card-title overflow-hidden" style="height:25px"><router-link :to="{name: 'productDetail',params:{productId:p.productId}}">{{ p.productName }} </router-link> </h5>
          <!-- <p class="card-text overflow-hidden" style="height:25px">{{ p.productDescription }}</p> -->
          <p class="card-text overflow-hidden" style="height:25px">在售：{{ p.productNum }}件</p><h4 class="card-text">价格: {{ p.productPrice }}</h4>
          <a href="#" class="btn btn-primary">加入购物车</a>
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
        }
    },
    mounted:function(){
        this.productList(1,5);
    }
}
</script>

<style>

</style>