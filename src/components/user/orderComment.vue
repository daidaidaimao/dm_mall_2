<template>
    <div class="box">
      <div v-for="p in product" :key="product.productId">
        <p class="pname">商品名称：{{p.productName}}</p>
        <article class="media">

          <figure class="media-left">

            <p class="image is-64x64">
              {{ initProductId(p.productId)}}
              <img :src="p.productImgurl">
            </p>
          </figure>
          <div class="media-content">
            <div class="field">
              <p class="control">
                <textarea class="textarea" placeholder="Add a comment..." v-model="comment.commentContent"></textarea>
              </p>
            </div>
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <a class="button is-info" @click="submitComment(p)">提交评论</a>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <label class="checkbox">
<!--                    <input type="checkbox"> Press enter to submit-->
                  </label>
                </div>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
</template>

<script>
    import {getRequest} from "../../utils/api";
    import {postRequest} from "../../utils/api";

    export default {
        name: "orderComment",
        data: function () {
          return{
            orderId:this.$route.params.orderId,
            product:[],
            Order:{},
            comment:{
              productId:"",
              userId:"",
              commentContent:"",
            }
          }
        },
      methods:{
          initData(orderId){
            console.log(this.orderId);
            getRequest('/user/queryItem?orderId='+orderId).then(resp=>{
              this.product = resp.data;
              console.log(this.product)
              getRequest("/user/queryOrderDetail?orderId="+orderId).then(resp=>{
                this.order = resp.data;
                console.log(this.order)
              })
            })
          },
        submitComment(){
            // this.comment.productId = this.product.productId;
            this.comment.userId = this.order.userId;
            // console.log(this.comment.commentContent);
          postRequest("/user/addComment",this.comment).then( resp=>{
            console.log(resp.data.message);
          })

        },
        initProductId(val){
            this.comment.productId = val;
        }

      },
      mounted() {
          this.initData(this.orderId);
      }
    }
</script>

<style scoped>
.pic{
  width: 50%;
  height: 50%;
}
  .box{
    /*background-color: #1f94f4;*/
  }
  .pname{
    font-size: 10px
  }
</style>
