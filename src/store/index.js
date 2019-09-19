import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initialized: false
  },
  mutations: {
    setInitialized(state, bool) {
      state.initialized = bool
    }
  }
})
