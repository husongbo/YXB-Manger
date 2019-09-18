import Vue from 'vue'
import Vuex from 'vuex'
import state from './modules/state.js'
import mutations from './modules/mutations.js'
import actions from './modules/actions.js'
Vue.use(Vuex)

const store = new Vuex.Store({
	state,
	mutations,
	actions
})

export default store
