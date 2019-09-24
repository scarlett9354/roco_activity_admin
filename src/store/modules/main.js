import * as MainTypes from '../types/main'
import DefaultIndex, { DefaultIndexTitle, DefaultIndexName } from '@/router/default-index'
import axios from 'axios'
import utils from '@/utils'

const state = {
  user: {},
  collapse: false,
  userCollapse: false,
  menuList: null,
  currentPageName: DefaultIndexName,
  cachePageList: [DefaultIndexName],
  disCacheList: ['SystemPassword'],
  pageList: [{
    title: DefaultIndexTitle,
    name: DefaultIndexName
  }],
  maxPageListLength: 10,
  tagList: {},
  breadCrumbs: [DefaultIndex]
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
  },
  // 折叠菜单
  [MainTypes.MAIN_TOGGLE_MENU](state) {
    state.userCollapse = !state.userCollapse
    state.collapse = !state.collapse
  },
  // 打开新页面
  [MainTypes.MAIN_ADD_OPEN_PAGE](state, page) {
    // 如有必要先检测是否为不缓存的页面
    if(!utils.inArray(page.name, state.disCacheList)) {
      state.cachePageList.push(page.name)
    }
    state.pageList.push(page)
  },
  // 设置标签
  [MainTypes.MAIN_MAKE_TAG_LIST](state, menuList) {
    let tagList = {}
    menuList.forEach((item, index) => {
      tagList[item.name] = Object.assign({}, item)
      item.children &&
        item.children.forEach((subItem, subIndex) => {
          let name = subItem.name
          if(tagList[name]) {
            console.error('有重复的菜单name',
              JSON.stringify(tagList[name]),
              JSON.stringify(subItem))
          }else {
            tagList[name] = Object.assign({}, subItem)
          }
        })
      tagList[item.name].children = null
    })
    state.tagList = tagList
    // 赋值给全局对象
    window._RouterList = Object.assign({}, tagList)
  },
  // 关闭所有标签
  [MainTypes.MAIN_TAGS_CLOSE_ALL](state) {
    state.pageList = [{
      title: DefaultIndexTitle,
      name: DefaultIndexName
    }]
    state.cachePageList = [DefaultIndexName]
  },
  // 关闭其他标签
  [MainTypes.MAIN_TAGS_CLOSE_ETC](state, routeName) {
    if(routeName === DefaultIndexName) {
      state.pageList = [{
        title: DefaultIndexTitle,
        name: DefaultIndexName
      }]
      state.cachePageList = [DefaultIndexName]
    }else {
      let currentPage = null
      state.pageList.forEach((page) => {
        if(page.name === routeName) {
          currentPage = page
          return false
        }
      })
      state.pageList = [{
        title: DefaultIndexTitle,
        name: DefaultIndexName
      }, currentPage]
      state.cachePageList = [DefaultIndexName, routeName]
    }
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
