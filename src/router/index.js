import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/main/Main'
import HomeMenu from './home'

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
console.log(MenuList)
export default router
