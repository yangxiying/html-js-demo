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


// require('./mockjs')

// import VueAwesomeSwiper from 'vue-awesome-swiper'

// // import style
// // import 'swiper/css/swiper.css'
// // If you use Swiper 6.0.0 or higher
// import 'swiper/swiper-bundle.css'

// Vue.use(VueAwesomeSwiper, /* { default options with global component } */)


import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';

NutUI.install(Vue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
