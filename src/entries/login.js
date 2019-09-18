import Vue from 'vue'
import Element from 'element-ui'
import Login from '../Login'

require('@/configs/vue')

Vue.use(Element)

Vue.config.productionTip = (process.env.NODE_ENV === 'development')

new Vue({
  el: '#app',
  template: '<Login/>',
  components: {
    Login
  }
})
