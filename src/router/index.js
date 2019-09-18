import Vue from 'vue'
import Router from 'vue-router'
import utils from '@/utils'

import Main from '@/views/main/Main'
import HomeMenu from './home'
import ErrorMenu from './error'
import _404Menu from './404'

Vue.use(Router)

let MenuList = [
  HomeMenu
]

// 为根路径全部授予Main组件 保证Main一直存在
MenuList.forEach((menu) => {
  menu.component = Main
})

const router = new Router({
  routes: MenuList
})
router.addRoutes([ErrorMenu, _404Menu])
router.beforeEach((to, from, next) => {
  if(to.meta.access === null) {
    utils.title(to.meta.title)
    next()
  }else if(to.meta.access === true) {
    utils.title(to.meta.title)
    next()
  }else {
    next({
      name: 'Error',
      params: {
        statusCode: '无权限',
        message: '您没有权限访问该页面'
      }
    })
  }
})
console.log(MenuList)
export default router
