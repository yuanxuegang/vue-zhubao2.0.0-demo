import Vue from 'vue'
import Router from 'vue-router'

import addSwipe from '@/components/addSwipe'
import goodsCla from '@/components/goodsCla'
import GoodsList from '@/components/GoodsList'
import addGoods from '@/components/addGoods'

import user from '@/components/user'

import aixiuList from '@/components/aixiuList'

import orderList from '@/components/orderList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'addGoods'
    },
    {
      path: '/addSwipe',
      name: 'addSwipe',
      component: addSwipe
    },
    {
      path: '/goodsCla',
      name: 'goodsCla',
      component: goodsCla
    },
    {
      path: '/addGoods',
      name: 'addGoods',
      component: addGoods
    },
    {
      path: '/GoodsList/:page',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/user/:page',
      name: 'user',
      component: user
    },
    {
      path: '/aixiuList/:page',
      name: 'aixiuList',
      component: aixiuList
    },
    {
      path: '/orderList/:page',
      name: 'orderList',
      component: orderList
    }
  ]
})
