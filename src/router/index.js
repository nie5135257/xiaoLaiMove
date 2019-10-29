import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import reg from '@/pages/reg'
import login from '@/pages/login'
import details from '@/pages/details'
import buy from '@/pages/buy'
import seat from '@/pages/seat'
import home from '@/pages/home'
import order from '@/pages/order'
import my from '@/pages/my'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/details',
      name: 'details',
      component: details
    },
    {
      path: '/buy',
      name: 'buy',
      component: buy
    },
    {
      path: '/seat',
      name: 'seat',
      component: seat
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/my',
      name: 'my',
      component: my
    }
  ]
})
