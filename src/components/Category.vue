<template>
<el-container>
  <el-aside width="200px">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" node-key="data.id" :default-expand-all="true"></el-tree>
  </el-aside>
  <el-main>
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="p in pic" :key="p.name">
            <el-image
            
            :src="p.url"
            :fit="fit"></el-image>
      </el-carousel-item>
    </el-carousel>
  </el-main>
</el-container>


 
</template>
<script>
import {getRequest} from '@/utils/api'
  export default {
    // methods: {
    //   handleOpen(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
    //   handleClose(key, keyPath) {
    //     console.log(key, keyPath);
    //   }
    // }
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'childList',
          label: 'name'
        },
        pic: [
          {'name':'轮播1','url':require('@/assets/lunbo1.png')},
          {'name':'轮播2','url':require('@/assets/lunbo2.png')},
          {'name':'轮播3','url':require('@/assets/lunbo3.png')},
          {'name':'轮播4','url':require('@/assets/lunbo4.png')},
        ],
        fit:"contain",
      };
    },
    methods: {
      getCategory(){
        getRequest("/product/tree").then(resp => {
            this.data = resp.data;
            console.log(resp.data)
        })
      },
      handleNodeClick(data){
          // console.log(data.id);
            this.$router.push('/cate/'+data.id);
      }
    },
    mounted: function(){
        this.getCategory()
    }
  }
  
</script>
<style scoped>


</style>

