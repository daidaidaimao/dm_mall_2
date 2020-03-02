<template>
    <div>
      <div v-for="p in product" :key="product.productId">
        {{ p.productName}}
        <img :src="p.productImgurl" />
      </div>
    </div>
</template>

<script>
    import {getRequest} from "../../utils/api";
    export default {
        name: "orderComment",
        data: function () {
          return{
            orderId:this.$route.params.orderId,
            product:[],
          }
        },
      methods:{
          initData(orderId){
            console.log(this.orderId);
            getRequest('/user/queryItem?orderId='+orderId).then(resp=>{
              this.product = resp.data;
              console.log(this.product)
            })
          }
      },
      mounted() {
          this.initData(this.orderId);
      }
    }
</script>

<style scoped>

</style>
