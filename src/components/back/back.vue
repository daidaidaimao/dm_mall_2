<template>    
<el-container>
  <el-aside width="200px">
      <el-menu :default-openeds="['1', '2','3']" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>首页</template>
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
        <template slot="title"><i class="el-icon-menu"></i>商品管理</template>
        <el-menu-item-group>
          <template slot="title" class="el-icon-s-goods">商品相关</template>
          <el-menu-item index="2-1" class="el-icon-setting">商品分类管理</el-menu-item>
          <el-menu-item index="2-2" class="el-icon-s-grid">商品总览</el-menu-item>
          <el-menu-item index="2-3" disabled>商品编辑</el-menu-item>
          <el-menu-item index="2-4" class="el-icon-circle-plus">商品添加</el-menu-item>
          <el-menu-item index="2-5">商品销售数据</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="图表分析">
          <el-menu-item index="2-6">销售情况汇总</el-menu-item>
        </el-menu-item-group>
        <!-- <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项4-1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>用户相关</template>
        <el-menu-item-group>
          <template slot="title">用户管理</template>
          <el-menu-item index="3-1">用户总览</el-menu-item>
          <!-- <el-menu-item index="3-2">选项2</el-menu-item> -->
        </el-menu-item-group>
        <el-menu-item-group title="用户行为分析">
          <el-menu-item index="3-3">未完成</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">未完成</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header>呆毛商城的超强后台</el-header>
    <el-main>
        <router-view></router-view>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</el-container>


</template>

<script>
  export default {
    methods: {
      handleSelect : function(key,keyPath){
      console.log(key);
      if(key == '1-1'){
        this.$router.push('/daimao');
      }else if(key == '1-2'){
        this.$router.push('/daimao/skill');
      }else if(key == '2-1'){
        this.$router.push('/daimao/cateManage')
      }else if(key == '2-2'){
        this.$router.push('/daimao/productManage')
      }else if(key == '2-4'){
        this.$router.push('/daimao/addproduct')
      }else if(key == '2-6'){
        this.$router.push('/daimao/echart')
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
    background-color: rgba(195, 195, 206, 0.897);
}
.el-main{
    background-color: cornflowerblue;
}
.el-footer{
    background-color: darkgray;
}
</style>

