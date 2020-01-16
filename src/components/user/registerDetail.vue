<template>
    <el-form :model="person">
        <el-form-item label="当前账号">
                <el-input v-model="person.username" disabled></el-input>
         </el-form-item>
         <el-form-item label="用户名">
                <el-input v-model="person.name" ></el-input>
         </el-form-item>

         <el-form-item label="性别">
                <!-- <el-input v-model="person.gender" ></el-input> -->
                <b-select placeholder="选择你的性别" v-model="person.gender">
                    <option
                        v-for="option in data"
                        :value="option.name"
                        :key="option.id">
                        {{ option.name }}
                    </option>
                </b-select>
         </el-form-item>
         <el-form-item label="邮箱地址">
                <el-input v-model="person.email" type="email"></el-input>
         </el-form-item>
         <el-form-item label="电话号码">
                <el-input v-model="person.phone" maxlength="11" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
         </el-form-item>

         <!-- <el-form-item label="当前用户">
                <el-input v-model="person.username" ></el-input>
         </el-form-item>
         <el-form-item label="当前用户">
                <el-input v-model="person.username" ></el-input>
         </el-form-item> -->
        <el-form-item>
            <el-button type="primary" @click="submitForm('person')">立即提交</el-button>
            <el-button @click="goDetail(this.$route.params.username)">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { getRequest } from '@/utils/api.js'
import { postRequest } from '@/utils/api.js'
export default {
    inject: ['reload'],
    data: function(){
        return {
            person:{
                username:this.$route.params.username_detail,
                avatarUrl:"",
                gender:"",
                name:"",
                email:"",
                phone:"",
                // createTime:null,
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
            let ticket = this.$cookies.get("TICKET");
            if(ticket === null){
                alert("还未登陆，点击确定转入登陆界面");
                this.$router.push('/login');
            }else{
                getRequest('/user/query/'+ticket).then( resp =>{
                    if(resp.data.status === 201){
                        this.$cookies.remove("TICKET");
                        alert(resp.data.message);
                        this.$router.push('/')
                        // this.reload();
                    }else{
                        getRequest('/user/partDetail?username='+val).then( resp =>{
                            if(resp.data.status ===200){
                                this.person = resp.data.data;
                            }else{
                                alert(resp.data.message);
                            }
                        })
                    }
                })
            }
        },
        goDetail(val){
            this.$router.push('/detail/'+val);
            this.reload();
        },
        submitForm(formName) {
                // alert('submit!');
                console.log(this.person);
                let p = this.person
                postRequest("/user/addDetail?username="+this.person.username+"&avatarUrl&gender="+this.person.gender+"&name="+this.person.name+"&email="+this.person.email+"&phone="+
                this.person.phone).then( resp => {
                    alert(resp.data.message);
                    this.reload();
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