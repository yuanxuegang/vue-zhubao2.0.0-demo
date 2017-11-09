import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		titleName: '',
		showfooterC: true,
		userData: {
			userName: '',
			userImg: '',
			status: null
		},
		goodsDetailsPageHidden: 'block'
	},
	getters:{},
	mutations,
	actions:{},
	modules:{}
})

export default store;