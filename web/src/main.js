// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'

import axios from 'axios'
Vue.prototype.$ajax = axios;

import mixin from './plugins/mixin.js'
Vue.use(mixin);

import filter from './plugins/filter.js'
Vue.use(filter);

import toastPlus from './plugins/toastPlus.js'
Vue.use(toastPlus);

import './plugins/dialog.css'
import Loading from './plugins/loading.js'
import Notify from './plugins/notify.js'
Vue.prototype.$dialog = {
    loading: Loading,
    notify: Notify
};

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
