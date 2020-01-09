<template>
<el-container>
    <el-dialog title="分类名" :visible.sync="dialogTableVisible">
        <el-input placeholder="请输入要添加的分类名" v-model="name"/>
        <el-button type="primary" @click="() => append(data)">新增节点</el-button> 
    </el-dialog>

    
    <el-tree :data="data" 
    :props="defaultProps" 
    @node-click="handleNodeClick" 
    node-key="data.id" 
    :default-expand-all="true">
     <span class="custom-tree-node" slot-scope="{ node, data }">
        <span class="node">{{ node.label }}</span>
        <span>
          <el-button 
            type="text"
            size="mini"
            icon="el-icon-edit"
            @click="() => dio(data)">
            添加
            
          </el-button>

          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            slot="reference"
            @click="() => remove(node, data)">  删除</el-button>
        </span>
      </span>
    </el-tree>
  <el-image
      :src="url"
      :fit="fit"></el-image>

</el-container>
</template>

<script>
import {getRequest} from '@/utils/api'
import {postRequest} from '@/utils/api'
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
        node_id: 0,
        name:'',
        dialogTableVisible: false,
        parentId:0,
        url: require('@/assets/Category.png'),
        fit:"cover"

      }},
    methods: {

        getCategory(){
            getRequest("/product/tree").then(resp => {
                this.data = resp.data;
                // console.log(resp.data)
            })
            },
        handleNodeClick(data){
          console.log("---------");
        //   this.$router.push('/cate/'+data.id);
        },
        dio(data){
            this.parentId = data.id;
            console.log(this.parentId);
            this.dialogTableVisible = true;
        },
        append(data) {
            
            if (!data.children) {
                // console.log(data);
                this.$set(data, 'children', []);    
            }

            // console.log(data.id);
            postRequest('/product/addNode?parentId='+this.parentId+"&name="+this.name).then(resp => {
                if(resp.status === 200){
                    alert(resp.data.message);
                    this.$router.go(0);
                }else{
                    alert(resp.data.message);
                }
            })
        },

        remove(node, data) {
            console.log(data)
            if(data.childList){
                alert("还有子分类不可删除当前节点")
            }else{
                getRequest('/product/deleteNode?id='+data.id).then(resp => {
                    if(resp.data.status == 200){
                        alert(resp.data.message);
                        this.$router.go(0);
                    }else{
                        alert(resp.data.message);
                    }
                })
            }
        },
    },
    mounted: function(){
        this.getCategory()
    }
  }
</script>

<style scoped>
.el-input{
    width: 13%;
}
.el-tree{
  margin-left: 10%;
  
  /* align-content: center; */

}


</style>