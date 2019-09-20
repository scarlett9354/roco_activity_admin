import Vue from 'vue'
import Vuex from 'vuex'
import main from './modules/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initialized: false
  },
  modules: {
    main
  },
  mutations: {
    setInitialized(state, bool) {
      state.initialized = bool
    }
  }
})
