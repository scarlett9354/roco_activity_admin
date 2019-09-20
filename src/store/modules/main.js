import * as MainTypes from '../types/main'
import { DefaultIndexName } from '@/router/default-index'
import axios from 'axios'

const state = {
  user: {},
  collapse: false,
  menuList: null,
  cachePageList: [DefaultIndexName]
}

const actions = {
  // 获取用户和菜单信息
  [MainTypes.MAIN_FETCH_USER](state) {
    return axios.get('/api/adm/account/login/user')
  }
}

const mutations = {
  // 设置用户
  [MainTypes.MAIN_SET_USER](state, user) {
    state.user = user
  },
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
  actions,
  mutations,
  getters
}
