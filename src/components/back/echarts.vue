<template>
  <div>
  <div id="myChart" :style="{width: '800px', height: '600px'}"></div>
  <div id="myChart2" :style="{width: '800px', height: '600px'}"></div>
  </div>
</template>
<script>
  import {getRequest} from "../../utils/api";

  export default {
    data:function(){
      return {
        echarts:require('echarts'),
        x:[],
        y:[],
        date:[],
        rdate:[],
        test:{},
        xx:[],
        datex:[],

      }
    },
    computed:{
      options() {
        let that = this;
        let option ={
        title: {
          text: '商品销量分析-总分类',
          subtext: '销量',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.x,
        },
        series: [
          {
            name: '销量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.date,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

          }
        ]
      };
      return option;
      },
      options2() {
        let that = this;
        let option ={
          title: {
            text: '商品销量分析-第二分类',
            subtext: '销量',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.xx,
          },
          series: [
            {
              name: '销量',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: this.datex,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },

            }
          ]
        };
        return option;
      },

    },
    methods:{
      initDate(){
        var myChart = this.$echarts.init(document.getElementById('myChart'));
        myChart.setOption(this.options);
        // let test = "";
        myChart.on('click', function (params) {
          console.log(params.data);
          // test = params.data.name;
          // this.onclickDate(params.data.name);
          // this.$cookies.set("tmp",params.data.name);
          // alert(params);

        });
        for(var i = 0;i<this.x.length;i++){
          // console.log(this.x);
          this.onclickDate(this.x[i]);
        }
      },
      getDate(){
        getRequest('/product/getCateDate').then(resp =>{
          // console.log(resp.data.data.书法作品);
          var p = resp.data.data
          for(let name in p){
            this.x.push(name);
            this.y.push(p[name]);
            this.date.push({value:p[name],name:name})
          }
          // console.log(this.date);
          // this.x = JSON.stringify(this.x);
          // this.date = JSON.stringify(this.date);
          // console.log(this.x);
          // console.log(this.date);
          // this.test = JSON.stringify(this.date[0]);
          // console.log(JSON.stringify(this.date));
          // console.log(x)
          // console.log(this.x);
          // console.log(this.y);
          this.initDate();
        });
      },
      onclickDate(val){
        getRequest('/product/getOne?name='+val).then(resp =>{
          var p = resp.data.data;
          console.log(p);
          for(let name in p){
            // console.log(name);
            // console.log(p[name]);
            this.xx.push(name);
            // this.y.push(p[name]);
            this.datex.push({value:p[name],name:name});
          }
          // console.log(this.datex);
          var myChart2 = this.$echarts.init(document.getElementById('myChart2'));
          myChart2.setOption(this.options2);
        })
      }
    },
    mounted() {
      this.getDate();


    }


  }
</script>
<style>

</style>
