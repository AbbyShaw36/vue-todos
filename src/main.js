import Vue from 'vue'
import App from './app'
import router from './router'
import mock from './mock'

mock.start()

new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})