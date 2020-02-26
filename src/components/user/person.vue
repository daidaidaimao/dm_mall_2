<template>
<div class="container">
          <b-field label="userId"
            :label-position="labelPosition"
            type="is-success"
            message="欢迎~"
            >
            <b-input :value="u.userId" maxlength="30" disabled ></b-input>
        </b-field>
        <section>
        <b-tabs v-model="activeTab">
            <b-tab-item label="基本信息">
                <!-- <a-avatar :size="64" icon="user" /> -->
                <!-- <br/> -->
                <!-- <router-link :to="{path: '/completeInfo/'+u.username }">您的信息尚未完善 点击去完善信息</router-link> -->
                用户名: {{ u.name }}
                <el-divider></el-divider>
                注册时间:{{ getTime(u.createTime) }}
                <el-divider></el-divider>
                性别：{{u.gender}}
                <el-divider></el-divider>
                邮箱:{{ u.email}}
                <el-divider></el-divider>
                手机号：{{u.phone}}
                <el-divider></el-divider>
                <router-link :to="{path: '/completeInfo/'+u.userId }">更改</router-link>
            </b-tab-item>

            <b-tab-item label="详细信息">
                1 <br>
                2 <br>
                3 <br>
                4 <br>
                还没做好.
            </b-tab-item>
            <b-tab-item label="我的消息">
                <!-- <shoppingCart params/> -->
                还没做好
            </b-tab-item>

            <b-tab-item label="我的标签">
                还没做好
            </b-tab-item>
        </b-tabs>
    </section>
</div>
</template>

<script>
import { getRequest } from '@/utils/api.js'
import { timestampToTime } from '@/utils/api.js'

export default {

    data: function(){
        return {
            activeTab:0,
            labelPosition: 'on-border',
            u:{},
            userId: this.$route.params.userId,
        }
    },
    methods: {
        getTime(timestamp) {
            return timestampToTime(timestamp)
        },
        initDetail(val){
            // let username = this.initUserId(val)
            getRequest('/user/detail?userId='+val).then( resp => {
                if(resp.data.status === 200){
                    this.u = resp.data.data;
                    console.log(this.u)
                }else{
                    alert(resp.data.message);
                    this.$router.push('/user/login');
                }
            })
        },
        initUserId(val){
            getRequest('/user/queryUserId?username='+val).then(resp=>{
                return resp.data;
            })
        },
        // queryTicket(){
        // let ticket = this.$cookies.get("TICKET");
        //   if(ticket === null){
        //       alert("还未登陆，点击确定转入登陆界面");
        //       this.$router.push('/login');
        //   }
        // }
    },
    mounted:function(){
        this.initDetail(this.userId);
        // this.queryTicket();
    }
}
</script>

<style scoped>
.b-input{
    text-align: center
}
</style>
