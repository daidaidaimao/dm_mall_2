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
            <img :src="aurl" alt="暂无头像" class="avatarDai"/>
            <span class="el-dropdown-link">
            {{status}}<i class="el-icon-arrow-down el-icon--right"/>
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
      <el-col :span="8"><div class="grid-content bg-purple">
        <el-image
          style="width: 100%; height: 70%;margin-top :5%"
          :src="url"
          :fit="fit"
          class="pic"/></div></el-col>
      <el-col :span="15"><div class="grid-content bg-purple-light">
        <el-input v-model="input" placeholder="外套男春夏装" style="width:65%;margin-top: 10%"/><el-button type="primary" icon="el-icon-search" @click="dosearch(input)">搜索</el-button>
      </div></el-col>
      <el-col :span="1"><div class="grid-content bg-purple" style="display: inline-block">
        </div>
      </el-col>
    </el-row>
    <router-view :key="key"/>
    <router-view name="left"/>
      <router-view name="right" :key="key"/>
      <el-divider></el-divider>
      <div class="tb-footer-bd">
        <p>
          <span><a href="https://www.taobao.com/tbhome/page/about/home">关于淘宝</a></span><span><a href="https://www.taobao.com/tbhome/page/about/partner?spm=a21bo.9614792.102.5.ed410c5siU20Y">合作伙伴</a></span><span><a href="http://pro.taobao.com">营销中心</a></span><span><a href="http://jubao.alibaba.com/internet/readme.htm?site=taobao">廉正举报</a></span><span><a href="https://consumerservice.taobao.com/">联系客服</a></span><span><a href="http://open.taobao.com">开放平台</a></span><span><a href="http://www.taobao.com/about/join.php">诚征英才</a></span><span><a href="http://consumerservice.taobao.com/contact-us">联系我们</a></span><span><a href="https://www.taobao.com/tbhome/page/sitemap">网站地图</a></span><span><a href="https://terms.alicdn.com/legal-agreement/terms/suit_bu1_taobao/suit_bu1_taobao201703241622_61002.html">隐私权政策</a></span><span><a href="https://terms.alicdn.com/legal-agreement/terms/suit_bu1_taobao/suit_bu1_taobao201811121436_80276.html">法律声明</a></span><span><a href="http://ipp.alibabagroup.com/">知识产权</a></span>
          <b>|</b> <em>© 2003-现在 Taobao.com 版权所有</em>
        </p>
        <p><span><a href="http://www.beian.miit.gov.cn">增值电信业务经营许可证：浙B2-20080224</a></span><b>|</b><span><a href="http://www.beian.miit.gov.cn">增值电信业务经营许可证（跨地区）： B2-20150210</a></span><b>|</b><span><a href="http://sq.ccm.gov.cn/ccnt/sczr/service/business/emark/toDetail/2E7819FC84674D5980464916C24B7E3E">浙网文（2019）1033-086号</a></span><b>|</b><span>浙江省网络食品销售第三方平台提供者备案：浙网食A33010001</span>
        </p>
        <p class="disanhang"><span>互联网药品信息服务资格证书（浙）-经营性-2018-0010</span><b>|</b><span>短消息类服务接入代码使用证书：号【2016】00154-A01</span><b>|</b><span>信息网络传播视听许可证：1109364号</span><b>|</b><span>出版物网络交易平台服务经营备案号：新出发浙备字第002号</span>
        </p>
        <p><span>
            <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010002000078">
              <span class="tb-footer-mod" style="background-position:-861px 0px; width:20px; height: 20px; "></span>
              浙公网安备 33010002000078号
            </a></span><b>|</b><span>广播电视节目制作经营许可证（浙）字第01012号</span><b>|</b><span>市场名称登记证：工商网市字3301004120号</span><b>|</b><span>医疗器械网络交易服务第三方平台备案：（浙）网械平台备字[2018]第00004号</span></p>
      </div>
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
      ticket :this.$cookies.get("TICKET"),
      aurl:"",

    }
  },
  computed:{
    key(){
      return this.$route.name ? this.$route.name +  +new Date():this.$route+  + new Date()
    }
  },
  methods: {
    handleSelect : function(key,keyPath){
      let ticket = this.$cookies.get("TICKET");
      // console.log(key, keyPath);
      if(key === '1'){
        this.$router.push('/');
      }else if(key === '3'){
        this.$router.push('/login');
      }else if(key === '2') {
        this.$router.push('/daimao');
      }else if(key === '4'){

          if(ticket == null){
              alert("还未登陆，点击确定转入登陆界面");
              this.$router.push('/login');
              this.reload();
          }else{
            this.$router.push('/showCart/'+ticket);
          //     getRequest('/user/query/'+ticket).then( resp =>{
          //       if(resp.data.status === 201){
          //         alert(resp.data.message);
          //         getRequest("/user/out?ticket="+ticket).then( resp => {
          //           this.$cookies.remove("TICKET");
          //           this.reload();
          //     })
                // }else{
                  // let username = ticket.substr(42);
                  // getRequest('/user/queryUserId?username='+username).then(resp =>{
                  //   this.$router.push('/showCart/'+resp.data);
                  // })
          }
                // }
              // })
          // }
      }else if(key === '5'){

        if(ticket == null){
          alert("还未登陆，点击确定转入登陆界面");
          this.$router.push('/login');
          this.reload();
        }else {
          this.$router.push('/myorder/' + ticket);
        }
          //         })
          //       }
          //     })
          // }
      }
    },
    // getStatus: function(){
    //   let ticket = this.$cookies.get("TICKET");

    //   // if(ticket!==null){
    //     // this.show = true;
    //     // this.status = "欢迎您"+ticket.substr(42);
    //     // this.$forceUpdate();
    //   // console.log("ticket:"+ticket);
    // },
    handleCommand: function(command) {
      let ticket = this.$cookies.get("TICKET");
        if (command === "out"){
          let ticket = this.$cookies.get("TICKET");
            getRequest('/user/out?ticket='+ticket).then( resp => {
            this.$cookies.remove("TICKET");
            this.$router.push('/');
            this.reload();
          })
        }else if(command === "person"){
              this.$router.push('/detail/'+ticket);
        }
      },
      queryTicket(val){
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
          }else{
            this.show = true;
            getRequest('/user/queryUsername?userId='+ticket).then( resp =>{
              // console.log(resp.data)

              getRequest('/user/partDetail?userId='+val).then( resp =>{
                if(resp.data.status ===200){
                  this.aurl = resp.data.data.avatarUrl;
                  this.status = resp.data.data.name;
                }else{
                  alert(resp.data.message);
                }
              })
            })

            // this.$forceUpdate();
          }
        })
        }
      },
    initData(val){
    },
    dosearch(val){
      this.$router.push({name:'search',query:{query:val}})
    }
  },
  mounted:function(){
    // this.getStatus();
    this.queryTicket(this.ticket);
    //this.initData(this.ticket);
    // this.$root.reload()
    // this.refresh();
  }
}
</script>

<style scoped>
  .tb-footer-bd{
    font-size: 10px;
  }
  .tb-footer-bd span{
    padding: 1%;
  }
  .disanhang{
    padding: 0;
  }
  .avatarDai{
    height: 50px;
    width: 50px;
    border-radius: 25px;
  }
</style>
