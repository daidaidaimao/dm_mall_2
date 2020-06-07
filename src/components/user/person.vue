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
              <img :src="u.avatarUrl" alt="暂无头像" class="avatarDai"/>

              <el-divider></el-divider>
<!--                <AvatarTest></AvatarTest>-->
                <!-- <a-avatar :size="64" icon="user" /> -->
                <!-- <br/> -->
                <!-- <router-link :to="{path: '/completeInfo/'+u.username }">您的信息尚未完善 点击去完善信息</router-link> -->
<!--              不写头像裁剪了<router-link :to="'/detail/'+u.userId+'/changeAvatar'" >更改头像</router-link>-->
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

<!--            <b-tab-item label="详细信息">-->
<!--                1 <br>-->
<!--                2 <br>-->
<!--                3 <br>-->
<!--                4 <br>-->
<!--                还没做好.-->
<!--            </b-tab-item>-->
<!--            <b-tab-item label="不知道干嘛">-->
<!--                &lt;!&ndash; <shoppingCart params/> &ndash;&gt;-->

<!--            </b-tab-item>-->

<!--            <b-tab-item label="我的标签">-->
<!--                还没做好-->
<!--            </b-tab-item>-->
        </b-tabs>
    </section>
    <div style="height: 50px;background-color: #a0cdeb;color: white;font-size: 25px;line-height: 50px">你可能感兴趣</div>
    <div>    <div class="list" v-for="p in plist" v-bind:key="p.productId">
      <!-- <el-container> -->
      <img :src="p.productImgurl" class="picture" style="width:300px;height:400px"  @click="goDetail(p.productId)">
      <!-- <div class="demo-image__preview">
      <el-image
      style="width: 250px; height: 400px;margin-top :5%"
      :src="p.productImgurl"
      :fit="fit"
      class="pic"
      @click="goDetail(p.productId)"
      ></el-image>
      </div> -->
      <!-- <img class="card-img-top" alt = {{p.productName }}/> -->
      <!-- <el-row class="test">
      <el-col :span="16" align="middele">
              <div> -->
      <div class="test">
        <span class="price">￥{{ p.productPrice }} </span><p class="baoyou">包邮</p>
        <p class="sale"> {{p.sale }}人付款</p>
      </div>
      <!-- <img :src= {{ p.productImgurl }} > -->
      <!-- <h5 class="name"><router-link :to="{name: 'productDetail',params:{productId:p.productId}}">{{ p.productName }} </router-link> </h5> -->
      <el-button type="text" @click="toDetail(p.productId)" class="name">{{ p.productName }}</el-button>
      <!-- <p class="card-text overflow-hidden" style="height:25px">{{ p.productDescription }}</p> -->
      <!-- <p class="card-text overflow-hidden" style="height:25px">在售：{{ p.productNum }}件</p> -->
      <!-- <h4 class="card-text">价格: {{ p.productPrice }}</h4> -->
      <!-- <a href="#" class="btn btn-primary">加入购物车</a> -->
      <!-- </el-container> -->
      <div class="guanggao">
        <el-row :gutter="20">
          <el-col :span="24"><div class="yihang">{{ p.productDescription}}</div></el-col>
          <!--            <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>-->
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4"><div class=""><img :src="tmall" style="margin-top: 15px;margin-left: 10px"/> </div></el-col>
          <el-col :span="16"><div class=""></div></el-col>
          <el-col :span="4"><div class=""><img :src="ali" style="margin-top: 15px;"/></div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8"><div class="">
            <p class="shop">呆毛的小店</p>
          </div></el-col>
          <el-col :span="8"><div class=""></div></el-col>
          <el-col :span="4"><div class=""><p class="dizhi">江苏</p></div></el-col>
          <el-col :span="4"><div class=""><p class="dizhi">南京</p></div></el-col>
        </el-row>


      </div>
    </div></div>
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
            fit: 'cover',
            tmall:require('@/assets/plist/tmall.png'),
            ali:require('@/assets/plist/ali.png'),
            plist:[],
            result:[],
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
        recommand(val){
          getRequest('/user/recommend?logUserId='+val).then( resp =>{
             // var pId = resp.data.data[0];
             var p = JSON.parse(JSON.stringify(resp.data.data));
             // pId.toLocaleString();
             // console.log(pId.toLocaleString());
            for(var obj1 in p[0]){
              // console.log(obj);
              obj1 = obj1.substring(0,obj1.length-1);
              this.result = obj1.split(',');
              if(this.result.length<10){
                for(var obj2 in p[1]){
                  obj2 = obj2.substring(0,obj2.length-1);
                  var tmp = obj2.split(',');
                  console.log(tmp);
                  // console.log(obj2.split(','))
                  for(var l = 0;l<tmp.length;l++){
                    this.result.push(tmp[l]);
                  }
                }
              }
              console.log(this.result);
              for(var i = 0;i<this.result[1].length;i++){
                getRequest('/product/queryOne?productId='+this.result[i]).then( resp =>{
                  // console.log(resp.data);
                  if(resp.data!==""){
                  this.plist.push(resp.data);
                  }
                });
              }

            }
            // console.log(p[0]);
          })
        },
      toDetail: function(val){
        this.$router.push({name: 'productDetail',params:{productId:val}});
      },
      goDetail(val){
        this.$router.push({name: 'productDetail',params:{productId:val}})
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
        this.recommand(this.userId);
        // this.queryTicket();
    }
}
</script>

<style scoped>
.b-input{
    text-align: center
}
  .avatarDai{
    height: 60px;
    width: 60px;
    border-radius: 30px;
  }
 .el-col {
   border-radius: 4px;
   height: 38px;
 }
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.guanggao{
  height: 110px;
  /*background-color: aqua;*/
}
.test{
  height: 40px;
  /* background-color: aqua; */
  display: flex;
  align-items: center; /*定义body的元素垂直居中*/

}
.list{
  border-radius: 3px;
  display: inline-block;
  margin: 10px;
  width: 300px;
  height: 600px;
}
.picture{
  object-fit: cover;
}
.price{
  font-size: 30px;
  color: red;
  display: inline-block;
  /* float: left; */
}
.sale{
  font-size: 15px;
  color: grey;
  display: inline-block;
  /* text-align: right */
  /* float: right; */
  margin-left: 70px;
}
.name{
  width: 250px;
  color: black;
  /* line-height: 50px; */
  text-align: left;
  font-size: 15px;
  word-wrap: break-word !important;
  word-break: break-all !important;
  white-space: normal !important;

}
.baoyou{
  background-color: red;
  font-size: 13px;
  display: inline-block;
  color: white;
  padding-left: 2px;
  padding-right: 2px;
  /* text-align: center; */
  /* margin: 0 auto; */
  /* line-height: 40px; */
  /* height: 30px; */
  /* text-align: center; */

}
.shop{
  font-size: 11px;
  line-height: 38px;
  text-decoration: underline;
  text-decoration-color: #8c939d;
  color: #8c939d;
}
.dizhi{
  font-size: 11px;
  line-height: 38px;
  color: #8c939d;
}
.yihang{
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 13px;
  /*line-height: 38px;*/
  padding-left: 5px;
}


</style>
