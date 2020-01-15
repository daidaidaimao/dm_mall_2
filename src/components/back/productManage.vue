<template>
  <div>
    <h1 style="float:left;display:inline"> 商品管理</h1><el-button @click="addproduct">添加商品</el-button>
    <el-table
    :data="product"
    border
    style="width: 100%">
    <el-table-column
      prop="productName"
      label="商品名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="categoryName"
      label="所属分类"
      width="200">
    </el-table-column>
    <el-table-column
      prop="productImgurl"
      label="图片地址"
      width="600">
    </el-table-column>
    <el-table-column
      prop="productNum"
      label="库存数量"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sale"
      label="总销量"
      width="120">
    </el-table-column>
    <el-table-column
      prop="productPrice"
      label="价格"
      width="120">
    </el-table-column>
    <el-table-column
      label="状态"
      width="120">
      <template slot-scope="scope">
          <i class='el-icon-info' v-show="see_dm(scope.row)">下架中</i>
          <i class="el-icon-view" v-show="!see_dm(scope.row)">上架中</i>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click ="changStatus(scope.row)" type = "primary" size="small">{{ show_dm(scope.row) }}</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看/编辑</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
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
</template>

<script>
import {postRequest} from '@/utils/api.js'
import {getRequest} from '@/utils/api.js'
import addproduct from '@/components/back/addproduct'
export default {
    // name: 'productManage',
    data: function(){
        return {
            product:[],
            total:0,
            // total:0,
            currentPage:1,
            see:true,
            show:'上架',
            
        }
    },
    inject: ['reload'],
    methods:{
      see_dm(row){
        if(row.productStatus ===0){
          return true;
        }else{
          return false;
        }
      },
      show_dm(row){
        if(row.productStatus === 0)
          return "上架";
        else
          return "下架"; 
      },
      handleClick(row) {
          console.log(row.productCategory);
          // let data = JSON.stringify(row);
          this.$router.push('/daimao/productEdit/'+row.productId);

      },
      changStatus(row){
        console.log(row);
        postRequest('/product/editStatus',row).then( resp => {
          if(resp.data.status == 200){
            alert(resp.data.message);
            // this.$router.go(0)
            this.reload();
          }
        })
      },
      initData(page,num){
        getRequest("/product/page?page="+page+"&num="+num).then(resp=>{
            this.product = resp.data.rows;
            this.total = resp.data.total;
            // for(var i = 0;i<this.product.length;i++){
            //   console.log(this.product)
            //   if(this.product[i].productStatus !==0){
            //     this.see = false;
            //     this.show = "下架"
            // }
            // console.log(this.status);
            // }

            // if(this.product[i].productStatus ===0){
            //   this.status = "下架中";
            // }else{
            //   this.status = "上架中";
            // }
            
            
        })
      },
      handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.initData(1,val);
        },
      handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.initData(val,5);
      },
      addproduct(){
            // this.$layer.iframe({
            //     content: {
            //         content: addproduct, 
            //         parent: this,
            //         data:{}
            //     },
            //     area:'auto',
            //     title: '添加',
            //     cancel:()=>{
            //         this.$router.push('/daimao/productManage');
            //         // this.backtoback();
            //         // alert('关闭iframe');
                    
            //     }
            //     });
            this.$router.push('/daimao/addproduct');
        }

    },
    mounted:function(){
        this.initData(1,5);
    }
}
</script>

<style scoped>

</style>