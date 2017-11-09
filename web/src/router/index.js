import Vue from 'vue'
import Router from 'vue-router'

import store from '../vuex/index.js'  // 下面有一个路由检查登录状态要用到里面的状态值，但是感觉这样子做法有点问题的，感觉不应该把这个东西引入进来

import home from '@/components/home'

import mall from '@/components/mall'
import goodsList from '@/components/goodsList'
import goodsDetails from '@/components/goodsDetails'
import confirmOrder from '@/components/confirmOrder'
import orderDetails from '@/components/orderDetails'
import myAddress from '@/components/myAddress'
import addAddress from '@/components/addAddress'

import aixiu from '@/components/aixiu'
import aixiuDetails from '@/components/aixiuDetails'

import member from '@/components/member'
import myShow from '@/components/myShow'
import release from '@/components/release'
import myOrder from '@/components/myOrder'

import login from '@/components/login'
import registered from '@/components/registered'

Router.prototype.goBack = function () {
　　this.isBack = true;
　　window.history.go(-1);
}

Vue.use(Router)

var myRoute =  new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/mall',
      name: 'mall',
      component: mall
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: goodsList
    },
    {
      path: '/goodsDetails',
      name: 'goodsDetails',
      component: goodsDetails
    },
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: confirmOrder
    },
    {
      path: '/orderDetails',
      name: 'orderDetails',
      component: orderDetails
    },
    {
      path: '/myAddress',
      name: 'myAddress',
      component: myAddress
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: addAddress
    },
    {
      path: '/aixiu',
      name: 'aixiu',
      component: aixiu
    },
    {
      path: '/aixiuDetails',
      name: 'aixiuDetails',
      component: aixiuDetails
    },
    {
      path: '/member',
      name: 'member',
      component: member,
      beforeEnter:function(to,from,next){
				if (store.state.userData.status) {
					next()
				}else {
		    	next({name:'login'})
				}
	    }
    },
    {
      path: '/myShow',
      name: 'myShow',
      component: myShow
    },
    {
      path: '/release',
      name: 'release',
      component: release
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/registered',
      name: 'registered',
      component: registered
    }
  ]
})

myRoute.beforeEach( (to, from, next) => {
	if (to.meta.auth) {
		next()
	}else {
		next()
	}
})

export default myRoute