// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import axios from 'axios'
axios.defaults.baseURL = "http://127.0.0.1:3000"
Vue.prototype.$http = axios
Vue.prototype.pic= "http://127.0.0.1:3000/"

Vue.use(MintUI)

import footer from './components/footer'
Vue.component('my-footer',footer)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
