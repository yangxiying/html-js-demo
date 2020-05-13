import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import hello from '@/components/HelloYxy.vue'
import AxiosDemo from '@/components/AxiosDemo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/hello',
      name: 'Hello',
      component: hello
    },
    {
      path: '/pdf',
      name: 'pdf',
      component: AxiosDemo
    }
  ]
})
