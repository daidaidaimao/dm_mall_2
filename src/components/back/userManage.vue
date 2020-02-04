<template>
     <el-table
    :data="user"
    style="width: 100%"
    >
    <el-table-column
      label="用户 ID"
      prop="userId">
    </el-table-column>
    <el-table-column
      label="username"
      prop="username">
    </el-table-column>
    <el-table-column
      label="密码"
      prop="password">
    </el-table-column>
    <el-table-column
      label="状态"
      :filters="[{ text: '被封的', value: 0 }, { text: '能使用的', value: 1 }]"
      :filter-method="filterstatus"
      filter-placement="bottom-end"
      >
      <template slot-scope="scope">
          {{ getStatus(scope.row.status) }}<el-button type="primary" size="small" :disabled="dd">{{ caozuo}} </el-button> 
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {getRequest} from '@/utils/api.js'
export default {
    data: function(){
        return{
            user:[],
            caozuo:""
        }
    },
    methods:{
        initUser(){
            getRequest('/user/showUser').then( resp=>{
                this.user = resp.data.data;
            })
        },
        getStatus(val){
            if(val === 1){
                this.caozuo = "封禁";
                return "可以使用"
            }else{
                this.caozuo = "解封";
                return "已被封禁"
            }
        },
        filterstatus(value,row){
            return row.status === value;
        }
    },
    mounted: function(){
        this.initUser();
    }
}
</script>

<style>

</style>