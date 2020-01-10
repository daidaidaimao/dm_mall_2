<template>
    <el-form :model="person">
        <el-form-item label="当前账号">
                <el-input v-model="person.username" disabled></el-input>
         </el-form-item>
         <el-form-item label="用户名">
                <el-input v-model="person.name" ></el-input>
         </el-form-item>

         <el-form-item label="性别">
                <el-input v-model="person.gender" ></el-input>
         </el-form-item>
         <el-form-item label="邮箱地址">
                <el-input v-model="person.email" ></el-input>
         </el-form-item>
         <el-form-item label="电话号码">
                <el-input v-model="person.phone" ></el-input>
         </el-form-item>

         <!-- <el-form-item label="当前用户">
                <el-input v-model="person.username" ></el-input>
         </el-form-item>
         <el-form-item label="当前用户">
                <el-input v-model="person.username" ></el-input>
         </el-form-item> -->
        <el-form-item>
            <el-button type="primary" @click="submitForm('person')">立即提交</el-button>
            <el-button @click="resetForm('person')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { getRequest } from '@/utils/api.js'
import { postRequest } from '@/utils/api.js'
export default {
    data: function(){
        return {
            person:{
                username:this.$route.params.username_detail,
                avatarUrl:"",
                gender:"",
                name:"",
                email:"",
                phone:""
            },
            labelPosition: 'on-border',
            data:[
                {id:1,name:"男"},
                {id:2,name:"女"}
            ]
        }
    },
    methods:{
        initData(val){
            getRequest('/user/detail?username='+val).then( resp =>{
                if(resp.data.status ===200){
                    this.person = resp.data.data;
                }else{
                    alert(resp.data.message);
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        submitForm(formName) {
                // alert('submit!');
                // console.log(this.product);
                postRequest("/user/addDetail",this.person).then( resp => {
                    alert(resp.data.message);
                })
        },
    },
    mounted:function(){
        this.initData(this.person.username);
    }
}
</script>

<style scoped>

</style>