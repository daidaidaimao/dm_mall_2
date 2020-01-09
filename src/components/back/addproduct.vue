<template>
    <el-form :model="product" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="productName">
            <el-input v-model="product.productName"></el-input>
        </el-form-item>

        <el-form-item label="商品分类" prop="productCategory">
            <!-- <el-select v-model="product.productCategory" placeholder="请选择商品分类">
                <el-option  v-for="c in category" :key="c.id" :label="c.name" :value="c.id"></el-option>
            </el-select> -->
            <SelectTree 
            :props="props"
            :options="optionData"
            :value="valueId"
            :clearable="isClearable"
            :accordion="isAccordion"
            @getValue="getValue($event)"/>
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
            <input type="file"  name="imgOne" @change="onUpload($event)" >
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('product')">立即创建</el-button>
            <el-button @click="resetForm('product')">重置</el-button>
        </el-form-item>
</el-form>
</template>

<script>
import {getRequest} from '@/utils/api.js'
import { postRequest } from '@/utils/api.js' 
import {uploadFileRequest} from '@/utils/api.js'
import SelectTree from "@/components/utils/test";
export default {
    name:'addproduct',
    components:{
        SelectTree
    },
    data: function(){
        return {
            optionData:[],
            isClearable:true,      // 可清空（可选）
            isAccordion:true,      // 可收起（可选）
            valueId:0,            // 初始ID（可选）
            props:{                // 配置项（必选）
                value: 'id',
                label: 'name',
                children: 'childList',
            },
            product:{
                productId:"",
                productName:"",
                productCategory:"",
                productNum:"",
                productPrice:"",
                productDescription:"",
                productImgurl:"",
                // categoryName:"",
                sale:"",
            },
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
                
            }
        }
    },
    methods:{
        getValue(value){
            this.valueId = value
            console.log(this.valueId);
            this.product.productCategory = value;
        },
        submitForm(formName) {
            
                // alert('submit!');
                console.log(this.product);
                postRequest("/product/add",this.product).then( resp => {
                    if(resp.data.status == 200){
                        alert("添加成功");
                        this.$router.go(0);
                    }else{
                        alert("添加失败");  
                    }
                })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        onUpload: function(e){
            let formData = new FormData();
            formData.append("pic",e.target.files[0]);
            uploadFileRequest("/product/picupload",formData).then(resp=>{
                console.log(resp.data)
                this.product.productImgurl = resp.data;
            })
        },
        getCategory(){
            getRequest("/product/tree").then(resp => {
                this.optionData = resp.data;
                
            })
            },
    },
    mounted:function(){
        this.getCategory();
    },

}

</script>

<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }
  .el-select-dropdown__item.selected{
    font-weight: normal;
  }
  ul li >>>.el-tree .el-tree-node__content{
    height:auto;
    padding: 0 20px;
  }
  .el-tree-node__label{
    font-weight: normal;
  }
  .el-tree >>>.is-current .el-tree-node__label{
    color: #409EFF;
    font-weight: 700;
  }
  .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
    color:#606266;
    font-weight: normal;
  }
</style>