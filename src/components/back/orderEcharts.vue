<template>
    <div id="myChart" :style="{width: '1500px', height: '600px'}"></div>
</template>
<script>
  import {getRequest} from "../../utils/api";

  export default {
    data:function(){
    return {
        x:[],
        y:[],
      dates:[[]],

    }},
    computed:{
      options() {
        let that = this;
        let option = {
          title: {
            text: '每日订单成交量',
            subtext: '成交量',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '日期：{b}  成交量 : {c} '
          },
          xAxis: {
            type: 'category',
            data: this.x
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.y,
            type: 'line'
          }]
        };
        return option;
      }
    },
    methods:{
      initDate(){
        var myChart = this.$echarts.init(document.getElementById('myChart'));
        myChart.setOption(this.options);
      },
      getDate(){
        getRequest('/product/getOrderE').then( resp =>{
          console.log(resp.data.data);
          var x = resp.data.data;
          for(var i=0;i<x.length;i++){
            // console.log(x[i].date);
            this.x.push(x[i].date);
            this.y.push(x[i].sum);
          }
          // console.log(this.x,this.y);
          this.initDate();
        })
      },

    },
    mounted() {
      this.getDate();
    }
  }
  </script>
