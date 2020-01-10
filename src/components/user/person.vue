<template>
<div class="container">
          <b-field label="Username"
            :label-position="labelPosition"
            type="is-success"
            message="欢迎~"
            >
            <b-input :value="u.username" maxlength="30" disabled ></b-input>
        </b-field>
        <section>
        <b-tabs v-model="activeTab">
            <b-tab-item label="基本信息">
                <!-- <a-avatar :size="64" icon="user" /> -->
                <!-- <br/> -->
                <router-link :to="{path: '/completeInfo/'+u.username }">您的信息尚未完善 点击去完善信息</router-link>
                用户名: {{ u.name }}
                <el-divider></el-divider>
                注册时间: {{ }}
            </b-tab-item>

            <b-tab-item label="详细信息">
                Lorem <br>
                ipsum <br>
                dolor <br>
                sit <br>
                amet.
            </b-tab-item>
            <b-tab-item label="购物车">
                What light is light, if Silvia be not seen? <br>
                What joy is joy, if Silvia be not by— <br>
                Unless it be to think that she is by <br>
                And feed upon the shadow of perfection? <br>
                Except I be by Silvia in the night, <br>
                There is no music in the nightingale.
            </b-tab-item>

            <b-tab-item label="订单">
                Nunc nec velit nec libero vestibulum eleifend.
                Curabitur pulvinar congue luctus.
                Nullam hendrerit iaculis augue vitae ornare.
                Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
            </b-tab-item>
        </b-tabs>
    </section>
</div>
</template>

<script>
import { getRequest } from '@/utils/api.js' 
export default {
    data: function(){
        return {
            activeTab:0,
            labelPosition: 'on-border',
            u:{},
            username: this.$route.params.username,
        }
    },
    methods: {
        initDetail(val){
            getRequest('/user/detail?username='+val).then( resp => {
                if(resp.data.status === 200){
                this.u = resp.data.data;
                console.log(this.u)
                }else{
                    alert(resp.data.message);
                    this.$router.push('/user/login');
                }
            })
        }
    },
    mounted:function(){
        this.initDetail(this.username);
    }
}
</script>

<style scoped>
.b-input{
    text-align: center
}
</style>