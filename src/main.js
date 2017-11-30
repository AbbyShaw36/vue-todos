import Vue from 'vue'
import App from './app'
import router from './router'
import mock from './mock'
import store from './vuex/store'

mock.start()

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})