<template>
    <div class="box">
      <div v-for="(p,i) in product" :key="product.productId" >
        <p class="pname">商品名称：{{p.productName}}</p><el-rate
        v-model="score[i]"
        show-text>
      </el-rate>
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
                <textarea class="textarea" placeholder="Add a comment..." v-model="itemvalue[i]"></textarea>
              </p>
            </div>
            <nav class="level">
              <div class="level-left">
                <div class="level-item">
                  <a class="button is-info" @click="submitComment(p,i)" v-if=" i !== product.length-1">提交评论</a>
                  <a class="button is-info" v-if="i === product.length-1" @click="submitCommentlast(p,i)">提交评论？</a>
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
      <el-steps :active="5" align-center>
        <el-step title="拍下物品" description="2020-4-9 16:48:30"></el-step>
        <el-step title="付款到呆毛宝" description="2020-4-9 16:48:34"></el-step>
        <el-step title="卖家发货" description="2020-4-9 16:48:54"></el-step>
        <el-step title="确认收货" description="2020-4-9 16:48:54"></el-step>
        <el-step title="评价" description="2020-4-9 16:48:54"></el-step>
      </el-steps>
    </div>
</template>

<script>
    import {getRequest} from "../../utils/api";
    import {postRequest} from "../../utils/api";

    export default {
        name: "orderComment",
        inject: ['reload'],
        data: function () {
          return{
            orderId:this.$route.params.orderId,
            product:[],
            Order:{},
            comment:[{
              productId:"",
              userId:"",
              commentContent:"",
              orderId:"",
              score:0,
            }],
            // show:[true,true,true,true,true,true,true,true,true,true,],
            itemvalue:{},
            score:{},
          }
        },
      methods:{
          initData(orderId){
            // console.log(this.orderId);
            getRequest('/user/queryItem?orderId='+orderId).then(resp=>{
              this.product = resp.data;
              console.log(this.product);
              getRequest("/user/queryOrderDetail?orderId="+orderId).then(resp=>{
                this.order = resp.data;
                console.log(this.order)
              })
            })
          },
        submitComment(p,i){
          // console.log(p.productId);
            this.comment.productId = p.productId;
            this.comment.userId = this.order.userId;
            this.comment.orderId = this.order.orderId;
            this.comment.commentContent = this.itemvalue[i];
            this.comment.score = this.score[i];
            console.log(this.comment.commentContent);
            // console.log(this.comment.commentContent);
          // getRequest("/user/whetherComment?userId="+this.order.userId+"&productId="+this.comment.productId).then( resp => {
          //   if (resp.data.status === 202){
          //
          //   }
          // });
          postRequest("/user/addComment",this.comment).then( resp=>{
            console.log(resp.data.message);
            // this.show[i] = false;
            // console.log(this.show);
            alert("评论成功");
            // this.reload();
          })

        },
        initProductId(val){
            this.comment.productId = val;
        },
        whetherComment(productId,orderId,userId){
            // getRequest()
          return true;
        },
        submitCommentlast(p,i){
            // console.log(p.productId);
          this.comment.productId = p.productId;
          this.comment.userId = this.order.userId;
          this.comment.orderId = this.order.orderId;
          this.comment.commentContent = this.itemvalue[i];
          this.comment.score = this.score[i];
          postRequest("/user/addComment",this.comment).then( resp=>{
            console.log(resp.data.message);
            getRequest("/user/finish?orderId="+this.orderId).then( resp =>{
              console.log(resp.data.message);

            });
          })
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
