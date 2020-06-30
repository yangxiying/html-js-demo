// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

// import pdf from 'vue-pdf';
// Vue.use(pdf)

import axios from 'axios'
Vue.prototype.$http= axios


import ECharts from 'vue-echarts'
// import 'echarts/lib/chart/line'
Vue.component('v-chart', ECharts)


// import VuePIXI from 'vue-pixi'
// Vue.use(VuePIXI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
