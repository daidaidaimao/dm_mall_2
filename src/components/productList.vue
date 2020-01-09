<template>
    <div id="productList">
        <!-- 商品展示 -->
            <div class=" border border-primary " style="width:900px;display:inline-block" >
      <div class="card" style="width: 18rem;display:inline-block" v-for="p in plist" v-bind:key="p.productId">
      <img :src="p.productImgurl" class="picture" alt= "" style="width:250px;height:400px"  @click="goDetail(p.productId)">
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
        <div class="card-body">
          <!-- <img :src= {{ p.productImgurl }} > -->
          <h5 class="card-title overflow-hidden" style="height:25px"><router-link :to="{name: 'productDetail',params:{productId:p.productId}}">{{ p.productName }} </router-link> </h5>
          <!-- <p class="card-text overflow-hidden" style="height:25px">{{ p.productDescription }}</p> -->
          <p class="card-text overflow-hidden" style="height:25px">在售：{{ p.productNum }}件</p><h4 class="card-text">价格: {{ p.productPrice }}</h4>
          <a href="#" class="btn btn-primary">加入购物车</a>
        </div>
      </div>
      <!-- 分页 -->
        <!-- <div class="block">
            <el-pagination
                layout="prev, pager, next"
                :total="50">
            </el-pagination>
        </div> -->
    <div class="block">
        <!-- <span class="demonstration">完整功能</span> -->
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
    inject:['reload'],
    data: function(){
        return {
            plist: [],
            total:0,
            currentPage:1,
            fit: 'cover'
        }
    },
    methods: {
        productList: function(page,num){
            // let _plist = this.$cookies.get("plist");
            // let _pNum  = this.$cookies.get("pNum");
            // if( _pNum === null||_plist===null){
                getRequest("/product/page?page="+page+"&num="+num).then(resp =>{
                this.plist = resp.data.rows;
                this.total = resp.data.total;
                })
                
            //     this.$cookies.set("plist",JSON.stringify(resp.data.rows));
            //     this.$cookies.set("pNum",resp.data.total);
            //     })
            // }else{
            //         this.plist = _plist;
            //         this.total = parseInt(_pNum);
                    // this.$cookies.remove("plist");
                // }   
                // console.log(resp.data);
                // this.reload();
                
                    // this.plist = resp.data.rows;
                    // this.total = resp.data.total;
                    
                
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
        }
    },
    mounted:function(){
        this.productList(1,5);
        // this.reload();
    }
}
</script>
<style scoped>
.picture{
    object-fit: cover;
}
</style>