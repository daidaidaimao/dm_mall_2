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
<!--    <el-table-column-->
<!--      label="密码"-->
<!--      prop="password">-->
<!--    </el-table-column>-->
       <el-table-column
       label="在线状态">
         <template slot-scope="scope">
           {{getOnline(scope.row.userId)}}
         </template>
       </el-table-column>
    <el-table-column
      label="状态"
      :filters="[{ text: '被封的', value: 0 }, { text: '能使用的', value: 1 }]"
      :filter-method="filterstatus"
      filter-placement="bottom-end"
      >
      <template slot-scope="scope">
          {{ getStatus(scope.row.status) }}<el-button type="primary" size="small" @click="changState(scope.row.userId)">{{ caozuo}} </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {getRequest} from '@/utils/api.js'
export default {
  inject: ['reload'],
    data: function(){
        return{
            user:[],
            caozuo:"",
            status:false,
        }
    },
    methods:{
        initUser(){
            getRequest('/user/showUser').then( resp=>{
                this.user = resp.data.data;
                // console.log(this.user);
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
        },
      inOnlie(val){
          getRequest('/user/OnlineUser?userId='+val).then( resp =>{
            this.$cookies.set(val,resp.data.message);
            // console.log(resp.data);
            // if(resp.data.status === 200){
            //   this.status =true;
            // }else{
            //   this.status =false;
            // }
            // return resp.data.message
          });
          // return b;

      },
      changState(val){
          getRequest('/user/changeStatus?userId='+val).then( resp=>{
            if(resp.data.status ===200){
              alert("操作成功");
              this.reload();
            }
          })
      },
      getOnline(val){
          this.inOnlie(val);
          // var information = this.inOnlie(val)
          // return information;
        return this.$cookies.get(val);
      }
    },
    mounted: function(){
        this.initUser();
    }
}
</script>

<style>

</style>
