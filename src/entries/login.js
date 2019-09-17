import Vue from 'vue'
import Login from '../Login'

require('@/configs/vue')

Vue.config.productionTip = (process.env.NODE_ENV === 'development')

new Vue({
  el: '#app',
  template: '<Login/>',
  components: {
    Login
  }
})
