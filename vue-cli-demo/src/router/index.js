import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import hello from '@/components/HelloYxy.vue'
import AxiosDemo from '@/components/AxiosDemo.vue'

import echarts1 from '@/components/echartsdemo/echarts1.vue'

import threejs1 from '@/components/threejsdemo/threejs1.vue'
import threejs2 from '@/components/threejsdemo/threejs2.vue'
import threejs3 from '@/components/threejsdemo/threejs3.vue'

import elTable from '@/components/elTable.vue'
import gojsdemo1 from '@/components/gojsdemo/gojsdemo1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/elTab',
      name: 'elTab',
      component: elTable
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
    ,
    {
      path: '/echarts1',
      name: 'echarts1',
      component: echarts1
    },
    {
      path: '/threejs1',
      name: 'threejs1',
      component: threejs1
    },
    {
      path: '/threejs2',
      name: 'threejs2',
      component: threejs2
    }
    ,
    {
      path: '/threejs3',
      name: 'threejs3',
      component: threejs3
    }
    ,
    {
      path: '/gojsdemo1',
      name: 'gojsdemo1',
      component: gojsdemo1
    }
  ]
})
