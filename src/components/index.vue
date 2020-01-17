<template>
  <div class="cnm">
    <el-menu 
    :default-active="activeIndex" 
    class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1" style="margin-left:20%">首页</el-menu-item>
      <el-menu-item index="2">后台</el-menu-item>
      <el-menu-item index="3" v-show="!show"> 登陆|注册</el-menu-item>
      <el-menu-item index="4" >购物车</el-menu-item>
      <el-menu-item index="5" >我的订单</el-menu-item>
      <el-menu-item index="6" v-show="show" style="margin-right:20%">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
            {{status}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus" command = "person">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus" command = "out">退出</el-dropdown-item>
            <!-- <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
            <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item> -->
          </el-dropdown-menu>
        </el-dropdown>


      </el-menu-item>

    </el-menu>
    <div style="padding-left:20%;padding-right:20%;margin-top:10px">
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple">    <el-image
      style="width: 100%; height: 70%;margin-top :5%"
      :src="url"
      :fit="fit"
      class="pic"></el-image></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light"></div>秒杀</el-col>
      <el-col :span="8"><div class="grid-content bg-purple" style="display: inline-block"><el-input v-model="input" placeholder="请输入内容" style="width:65%"></el-input><el-button type="primary" icon="el-icon-search">搜索</el-button></div></el-col>
    </el-row>
    <router-view />
    <router-view name="left"/>
    <router-view name="right" :key="key"></router-view>

    </div>
  </div>
</template>

<script>
import {getRequest} from '@/utils/api'
import {postRequest} from '@/utils/api'
import productList from '@/components/productList'
export default {
  name: 'index',
  inject:['reload'],
  data: function(){
    return {
      input:"",
      activeIndex:"1",
      status:"",
      show :false,
      url: require('@/assets/logodm.png'),
      fit: 'cover',
      
    }
  },
  computed:{
    key(){
      return this.$route.name ? this.$route.name +  +new Date():this.$route+  + new Date() 
    }
  },
  methods: {
    handleSelect : function(key,keyPath){
      // console.log(key, keyPath);
      if(key == 1){
        this.$router.push('/');
      }else if(key == 3){
        this.$router.push('/login');
      }else if(key ==2) {
        this.$router.push('/daimao');
      }else if(key ==4){
          let ticket = this.$cookies.get("TICKET");
          if(ticket === null){
              alert("还未登陆，点击确定转入登陆界面");
              this.$router.push('/login');
              this.reload();
          }else{
              getRequest('/user/query/'+ticket).then( resp =>{
                if(resp.data.status === 201){
                  alert(resp.data.message);
                  getRequest("/user/out?ticket="+ticket).then( resp => {
                    this.$cookies.remove("TICKET");
                    this.reload();
              }) 
                }else{
                  let username = ticket.substr(42);
                  getRequest('/user/queryUserId?username='+username).then(resp =>{
                  this.$router.push('/showCart/'+resp.data);
                  })
                }
              })
          }
      }else if(key ==5){
          let ticket = this.$cookies.get("TICKET");
          let username  = ticket.substr(42);
          if(ticket === null){
              alert("还未登陆，点击确定转入登陆界面");
              this.$router.push('/login');
              this.reload();
          }else{
              getRequest('/user/query/'+ticket).then( resp =>{
                if(resp.data.status === 201){
                  alert(resp.data.message);
                  getRequest("/user/out?ticket="+ticket).then( resp => {
                    this.$cookies.remove("TICKET");
                    this.reload();
              }) 
                }else{
                  getRequest('/user/queryUserId?username='+username).then( resp =>{
                      this.$router.push('/myorder/'+resp.data);
                  })
                  

                }
              })
          }
      }
    },
    getStatus: function(){
      let ticket = this.$cookies.get("TICKET");
      if(ticket!==null){
        this.show = true;
        this.status = "欢迎您"+ticket.substr(42);
        // this.$forceUpdate();
      }

      console.log("ticket:"+ticket);
    },
    handleCommand: function(command) {
        if (command === "out"){
          let ticket = this.$cookies.get("TICKET");
          getRequest('/user/out?ticket='+ticket).then( resp => {
            this.$cookies.remove("TICKET");
            this.reload()
          })
        }else if(command === "person"){
          let ticket = this.$cookies.get("TICKET");
          getRequest('/user/query/'+ticket).then( resp => {
            if (resp.data.status === 201){
              alert(resp.data.message);
              getRequest("/user/out?ticket="+ticket).then( resp => {
                this.$cookies.remove("TICKET");
                this.reload();
              }) 
            }else{
              // alert("进入个人中心");
              this.$router.push('/detail/'+ticket.substr(42));
            }
          })
          // if(ticket!==null){
          //   this.$router.push('/');
          // }else{
          //   this.$router.push('/login');
          // }
        }
      },
      queryTicket(){
        let ticket = this.$cookies.get("TICKET");
        if(ticket !== null){
        getRequest('/user/query/'+ticket).then( resp => {
          if(resp.data.status === 201){
            this.$cookies.remove("TICKET");
            alert(resp.data.message);
            // this.$router.push('/')
            this.reload();
          //   getRequest('/user/out').then( resp => {
          //   // alert(resp.data.message);
          //   // this.$router.go(0);
          //   this.reload()
          // })
            // this.reload();
          }
        })
        }
      },
    // refresh () {
    //   this.$router.replace({
    //   path: '/refresh',
    //   query: {
    //     t: Date.now()
    //     }
    //   })
    // }
  },
  mounted:function(){
    this.getStatus();
    // this.queryTicket();
    // this.$root.reload()
    // this.refresh();
  }
}
</script>

<style scoped>
</style>
