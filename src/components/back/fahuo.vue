<template>
<el-button>发货</el-button>
</template>
<script>
  import {getRequest} from '@/utils/api.js'
  export default {
      data: function () {
          return {
              orderId:this.$route.params.orderId,
          }
      },
      methods:{
        fahuo(val){
          getRequest('/user/fahuo?orderId='+val).then( resp =>{
            alert(resp.data.message);
            this.reload();
          })
        }
      },

  }
</script>
