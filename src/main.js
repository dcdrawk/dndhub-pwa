// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/dist/vuetify.min.css'
import Firebase from './firebase'
import Validation from './validation'
import EventBus from './event-bus'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Firebase)
Vue.use(Validation)
Vue.use(EventBus)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
