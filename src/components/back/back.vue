<template>
<el-container>
  <el-aside width="200px">
      <el-menu :default-openeds="['1']" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"/>首页</template>
        <el-menu-item-group>
          <template slot="title">简单介绍</template>
          <el-menu-item index="1-1">项目简单介绍</el-menu-item>
          <el-menu-item index="1-2">技术手段介绍</el-menu-item>
        </el-menu-item-group>
        <!-- <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group> -->
        <!-- <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"/>商品管理</template>
        <el-menu-item-group>
          <template slot="title" class="el-icon-s-goods">商品相关</template>
          <el-menu-item index="2-1" class="el-icon-setting">商品分类管理</el-menu-item>
          <el-menu-item index="2-2" class="el-icon-s-grid">商品总览</el-menu-item>
          <el-menu-item index="2-3" disabled>商品编辑</el-menu-item>
          <el-menu-item index="2-4" class="el-icon-circle-plus">商品添加</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="图表分析">
          <el-menu-item index="2-5">每日订单量走势图</el-menu-item>
          <el-menu-item index="2-6">销售情况汇总</el-menu-item>
        </el-menu-item-group>
        <!-- <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项4-1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"/>用户相关</template>
        <el-menu-item-group>
          <template slot="title">用户管理</template>
          <el-menu-item index="3-1">用户总览</el-menu-item>
          <!-- <el-menu-item index="3-2">选项2</el-menu-item> -->
        </el-menu-item-group>


      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"/>订单管理</template>
        <el-menu-item-group>
          <template slot="title">订单总览</template>
          <el-menu-item index="4-1">订单总览</el-menu-item>
          <el-menu-item index="4-2" disabled>发货</el-menu-item>
          <!-- <el-menu-item index="3-2">选项2</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-info"/>后端API查询</template>
          <el-menu-item-group>
             <el-menu-item index="5-1"><el-link href="http://localhost:8888/swagger-ui.html" target="_blank">商品和商品分类API</el-link></el-menu-item>
            <el-menu-item index="5-2"><el-link href="http://localhost:9999/swagger-ui.html" target="_blank">用户、购物车、订单API</el-link></el-menu-item>
            <el-menu-item index="5-3">商品搜索功能API</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title"><i class="el-icon-back">返回首页</i> </template>
            <el-menu-item-group>
              <el-menu-item index="6-1">误点，返回刚刚界面</el-menu-item>
              <el-menu-item index="6-2">我就是要去首页</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header height="60px">
      呆毛超强后台
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer>欢迎使用后台</el-footer>
  </el-container>
</el-container>


</template>

<script>
  export default {
    data:function(){
      return {
        url: require('../../assets/back/shaonian.png'),
        fit: 'cover',
      }
    },
    methods: {
      handleSelect : function(key,keyPath){
      console.log(key);
      if(key === '1-1'){
        this.$router.push('/daimao');
      }else if(key === '1-2'){
        this.$router.push('/daimao/skill');
      }else if(key === '2-1'){
        this.$router.push('/daimao/cateManage')
      }else if(key === '2-2'){
        this.$router.push('/daimao/productManage')
      }else if(key === '2-4'){
        this.$router.push('/daimao/addproduct')
      }else if(key === '2-6'){
        this.$router.push('/daimao/echart')
      }else if(key === '4-1'){
        this.$router.push('/daimao/orderManage')
      }else if(key === '3-1'){
        this.$router.push('/daimao/userManage')
      }else if(key === '6-1'){
        this.$router.go(-1)
      }else if(key === '6-2'){
        this.$router.push('/')
      }else if(key ==='2-5'){
        this.$router.push('/daimao/orderEcharts')
      }
      }
    }
  }



</script>

<style scoped>
.el-container{
    border: 1px solid #eee;
}
.el-aside{
    background-color: rgba(248, 248, 248, 0.986);
    /* line-height: 1000px; */
}
.el-header{
    /*height: 55px;*/
    line-height: 60px;
    font-size: 30px;
    background-color: rgba(195, 195, 206, 0.897);
  /*margin: 0 auto*/
}
.el-main{
    /*background-color: cornflowerblue;*/
}
.el-footer{
    background-color: darkgray;
}
</style>

