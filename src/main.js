// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookies from 'vue-cookies'
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css';
import ECharts from 'vue-echarts' 
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
// import 'ant-design-vue/dist/antd.css';
// import Antd from 'ant-design-vue';
// Vue.config.productionTip = false;
// Vue.use(Antd);
// import { Table, Input } from 'buefy'
// import 'buefy/dist/buefy.css'

// Vue.use(Table)
// Vue.use(Input)
Vue.use(Buefy)
Vue.component('v-chart', ECharts)

Vue.prototype.$layer = layer(Vue);
Vue.use(VueCookies)
Vue.use(ElementUI);
Vue.use(Avue);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
