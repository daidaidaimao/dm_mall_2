<template>
<el-form :model="product" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="productName">
            <el-input v-model="product.productName"></el-input>
        </el-form-item>

        <el-form-item label="商品分类" prop="productCategory">
            <el-select v-model="product.productCategory" placeholder="请选择商品分类">
                <el-option  v-for="c in category" :key="c.id" :label="c.name" :value="c.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商品数量" prop="productNum">
            <el-input v-model="product.productNum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="productPrice">
            <el-input v-model="product.productPrice" type="number"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="productDescription">
            <el-input v-model="product.productDescription" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-input v-model="product.productImgurl"></el-input>
          <img :src="product.productImgurl" class="picture">
          <input type="file"  name="imgOne" @change="onUpload($event)" >
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('product')">修改</el-button>
            <el-button @click="resetForm('product')">返回</el-button>
        </el-form-item>
</el-form>

</template>

<script>
import {getRequest} from '@/utils/api.js'
import { postRequest } from '@/utils/api.js' 
import {uploadFileRequest} from '@/utils/api.js'
export default {
  data: function(){
    return {
      product:{},
      category:[],
      rules:{
        productName:[
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
        ],
        productCategory:[
          { required: true, message: '请选择商品类型', trigger: 'change' }
        ],
        productNum:[
          { required: true, message: '请输入商品数量', trigger: 'blur' },
        ],
        productPrice:[
          { required: true, message: '请输入商品数量', trigger: 'blur' },
        ],
                
      },
      fit:"cover",
    }
  },
  methods:{
    initData: function(val){
      // console.log(this.product.productImgurl);
      getRequest('/product/queryOne?productId='+val).then( resp => {
        this.product = resp.data;
      });
      getRequest("/product/init").then(resp => {
        this.category = resp.data.data;
      })
    },
    submitForm(formName) {
      console.log(this.product);
      postRequest("/product/update",this.product).then( resp => {
        if(resp.data.status == 200){
          alert("修改成功");
          this.$router.go(0);
        }else{
          alert(resp.data.message);  
        }
      })
    },
    resetForm(formName) {
      this.$router.push('/daimao/productManage');
    },
    onUpload: function(e){
      let formData = new FormData();
      formData.append("pic",e.target.files[0]);
      uploadFileRequest("/product/picupload",formData).then(resp=>{
                console.log(resp.data)
                this.product.productImgurl = resp.data;
            })
        },
  },
  mounted:function(){
    this.initData(this.$route.params.productId);
    // this.initCategory(); 
  }
}
</script>

<style scoped>

</style>