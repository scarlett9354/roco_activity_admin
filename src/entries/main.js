import Vue from 'vue'
import '../plugins/element'
import store from '@/store'
import router from '@/router'

import App from '../App'

require('@/configs/vue')

Vue.config.productionTip = (process.env.NODE_ENV === 'development')
console.log(router)
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App
  }
})
