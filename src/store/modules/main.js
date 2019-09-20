import * as MainTypes from '../types/main'
import { DefaultIndexName } from '@/router/default-index'

const state = {
  collapse: false,
  menuList: null,
  cachePageList: [DefaultIndexName]
}

const mutations = {
  // 制作菜单
  [MainTypes.MAIN_MAKE_MENU](state, menuList) {
    state.menuList = menuList
  }
}

const getters = {
  mainMenuCollapse: (state) => {
    return state.collapse
  }
}

export default {
  state,
  mutations,
  getters
}
