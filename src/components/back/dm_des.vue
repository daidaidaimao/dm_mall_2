<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <h1>呆毛商城</h1>
    <el-button style="float: right; padding: 3px 0" type="text">点我赞助</el-button>
  </div>
  <div class="text item">
    <div>解决问题：</div>
    <div>对随着Internet的迅速崛起，互联网已日益成为收集提供信息的最佳渠道并逐步进入传统的流通领域。传统销售业务中间渠道过多，导致最高面向用户的价格会有所偏高。</div>
    <div>解决方案：</div>
    <div>网上购物系统是企业(商家)面对消费者、购买者的模式下系统。企业通过它可以建立自己的网上商店。建立网上销售渠道，可以让企业直接面对最终用户，减少了销售过程中的中间环节，降低了客户的购物成本。使用该系统，用户可以让所有上网浏览的客户看到你在网上所登录的产品信息，并可以查看、购买商品和下订单，缩短与小客户的距离，直接获得效益。</div>
    <div>主要设计：</div>
    <div>基于传统电商平台的功能，前台 加入商品热度排行（根据点击数、购买量、页面停留时间等分析）、商品推荐/猜你喜欢功能（根据用户过往行为：曾经的购买记录，曾经浏览记录却未下单记录等），后台：用户行为分析的图表展示和商品的各项指标的分析图表功能。</div>
    <div style="text-align: left"><h2>特色</h2></div>
    <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="一致性 Consistency" name="1">
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
  </el-collapse-item>
  <el-collapse-item title="反馈 Feedback" name="2">
    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
  </el-collapse-item>
  <el-collapse-item title="效率 Efficiency" name="3">
    <div>简化流程：设计简洁直观的操作流程；</div>
    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
  </el-collapse-item>
  <el-collapse-item title="可控 Controllability" name="4">
    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
  </el-collapse-item>
</el-collapse>
  </div>
</el-card>

</template>

<script>
export default {
    data() {
      return {
        activeNames: ['1']
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>

<style scoped>

  .text {
    font-size: 14px;
    
  }

  .item {
    margin-bottom: 18px;
    text-align: left;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>