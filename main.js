import Vue from 'vue'
import App from './App'
import './static/css/mui.css'
import './static/css/aui.css'
import './static/css/style.css'
import store from './store'
import api from './common/vmeitime-http/index.js'
Vue.config.productionTip = false
Vue.prototype.$api=api
Vue.prototype.$store = store
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
