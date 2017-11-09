// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS

Vue.config.productionTip = false

Vue.use(iView);

import axios from 'axios'

Vue.prototype.$http = axios;
Vue.prototype.reload = function () {
	window.location.reload();
}

import myPlugins from './myPlugins.js'

Vue.use(myPlugins);

import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
