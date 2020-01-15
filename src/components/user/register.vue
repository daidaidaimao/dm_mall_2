<template>
<div>
    <el-form :model="u" :rules="rules" ref="u" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入内容" v-model="u.username" maxlength="10" clearable></el-input>
        </el-form-item>
        
        <el-form-item label="请输入密码" prop="password">
            <el-input placeholder="请输入密码" v-model="u.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkpass">
            <el-input placeholder="确认密码" v-model="u.checkpass" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('u')">立即注册</el-button>
            <el-button @click="resetForm('u')">重置</el-button>
            <el-button @click="gologin('u')">已有账号?点我去登陆</el-button>
        </el-form-item>
    </el-form>
    <el-image
      style="width: 45%; height: 70%;margin-top :5%"
      :src="url"
      :fit="fit"
      class="pic"></el-image>
</div>
</template>
<script>
import {postRequest} from '@/utils/api.js'
export default {
    name: "register",
    data: function(){
        var validatePass = (rule ,value,callback) => {
            if(value ===''){
                callback(new Error('请输入密码'));
            }else{
                if(this.u.checkpass !==''){
                    this.$refs.u.validateField('checkpass'); 
                }
                callback();
            }
        };
        var validatePass2 = (rule ,value ,callback) =>{
            if(value ===''){
                callback(new Error("请确认密码"));
            }else if(value !==this.u.password){
                callback(new Error("两次密码不一致！"));
            }else {
                callback();
            }
        };
        return {
            u:{
                username:"",
                password:"",
                checkpass:"",

            },
            rules:{
                username:[
                    { required:true,message:'请输入用户名',trigger: 'blur'},
                    { min : 6,max:10,message:'长度6~10',trigger: 'blur'},
                ],
                password:[
                    {validator: validatePass,trigger:'blur'},
                    { min: 6,max:20,message:'长度6~20',trigger:'blur'},
                ],
                checkpass:[
                    {validator: validatePass2,trigger:'blur'}
                ]
            },
            password:"",
            url: require('@/assets/register.png'),
            fit: 'cover',
        }
    },
    methods:{
        submitForm: function(formName){
            let user = this.u;
            this.$refs[formName].validate((valid) => {
                if(valid){
                    // alert(formName);
                    
                    postRequest('/user/register',user).then( resp => {
                        if(resp.data.status === 200){
                            alert("注册成功 点击确定转入登陆界面");
                            this.$router.push('/');
                        }
                        else{
                            alert(resp.data.message);
                            this.resetForm(formName);
                        }
                    })
                }else{
                    console.log('register error');
                    return false;
                }
            })
        },
        resetForm: function(formName){
            this.$refs[formName].resetFields();
        },
        gologin: function(){
            this.$router.push('/login')
        }
        
        
    },

}
</script>

<style scoped>
.demo-ruleForm{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    align-content: center;
    width: 40%;
    float: right;
    margin-top: 10%;
    padding-top: 40px;
    padding-right: 50px;
    background-color: blanchedalmond
}
</style>