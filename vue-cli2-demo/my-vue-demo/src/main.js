import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)

import axios from 'axios' // axios http请求库

Vue.prototype.$http = axios


require('./mockjs')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
