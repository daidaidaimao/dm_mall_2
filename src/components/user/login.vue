<template>
    <div class="box">
        <el-form :model="user" :rules="rules" ref="user" label-width="100px" class="demo-ruleForm" >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="user.username" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即登陆</el-button>
                <el-button @click="gozhuce">注册</el-button>
            </el-form-item>
        </el-form>
            <el-image
      style="width: 55%; height: 70%;margin-top :5%"
      :src="url"
      :fit="fit"
      class="pic"></el-image>
    </div>
</template>

<script>    
import {postRequest} from '@/utils/api.js'
export default {
    name:'login',
    data:function(){
        return{
            user:{
                username:"",
                password:""
            },
            rules:{
                username:[
                    {required:true,message:'请输入用户名',trigger :'blur'}
                    ],
                password:[
                    {required:true ,message :'请输入密码',trigger:'blur'}
                ]
            },
            url: require('@/assets/login.png'),
            fit: 'cover',
        }
    },
    inject: ['reload'],
    methods:{
        submitForm: function(formName){
            let user = this.user; 
                postRequest('/user/login',user).then( resp => {
                    if(resp.data.status === 200){
                    // alert("");
                        alert(resp.data.message)
                        this.$router.push('/');
                        // this.$router.go(0);
                        this.reload();
                    }
                    else{
                        alert(resp.data.message);
                        // this.resetForm(formName);
                        this.user.password = "";
                        }
                    }) 
        },
        gozhuce: function(){
            this.$router.push('/register')
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style scoped>
.demo-ruleForm{
    align-content: center;
    width: 40%;
    float: right;
    margin-top: 10%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    padding-top: 40px;
    padding-right: 50px;
    /* background-image:  */
    /* border-radius: 4px */
    background-color: bisque;
}
.box{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    height: 500px;
    /* background-image:'url(' + url + ')'; */
    margin-top: 10%;
}

</style>