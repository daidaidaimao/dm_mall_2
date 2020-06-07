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

import VueCropper from 'vue-cropper'
Vue.use(VueCropper);
Vue.use(Buefy,);

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(VueCookies);
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
