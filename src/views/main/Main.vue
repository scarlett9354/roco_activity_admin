<template>
  <el-container v-if="initialized" class="wrapper">
    <el-aside :width="asideWidth" :style="asideStyle" class="menu">
      <r-nav></r-nav>
    </el-aside>
    <el-container>
      <el-header class="main-header-con">
        <r-header></r-header>
      </el-header>
      <el-scrollbar class="page-component__main">
        <el-main class="content" style="overflow-x:hidden;">
          <r-tag></r-tag>
          <keep-alive :include="cachePageList">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script>
import Nav from './Nav'
import Header from './Header'
import Tag from './Tag'
import { mapState, mapGetters } from 'vuex'
import * as MainTypes from '@/store/types/main'
import { getMenuList } from '@/router'
import CODE_SUCCESS from '@/constants/response-code'
import { Loading } from 'element-ui'
import Vue from 'vue'
export default {
  name: 'Main',
  components: {
    'r-nav': Nav,
    'r-header': Header,
    'r-tag': Tag
  },
  created() {
    this.getUserMenu()
  },
  methods: {
    // 获取用户和菜单信息
    getUserMenu() {
      let loadingInstance = Loading.service({
        background: 'rgba(0, 0, 0, 0.5)'
      })
      this.$store.dispatch(MainTypes.MAIN_FETCH_USER)
        .then(res => {
          console.log(res.data)
          if(res.data.code === CODE_SUCCESS) {
            let obj = Object.assign({}, {
              system: {
                checked: true
              },
              systemplatform: {
                checked: true
              }
            }, res.data.data.allPermission)
            res.data.data.allPermission = obj
            this.setUser(res.data.data)
            this.$store.commit('setInitialized', true)
          }
        })
        .finally(() => {
          loadingInstance.close()
        })
    },
    setUser(user) {
      this.$store.commit(MainTypes.MAIN_SET_USER, user)
      this.$store.commit(MainTypes.MAIN_MAKE_MENU, this.makeMenuList(getMenuList()))
    },
    makeMenuList(menuList) {
      let _list = []
      try {
        // 遍历设置菜单访问权限
        menuList.forEach((menu) => {
          // 创建一个新菜单对象，不包含vue组件
          let _menu = {
            icon: menu.icon,
            isSingle: menu.isSingle,
            name: menu.name,
            path: menu.path,
            title: menu.title,
            children: []
          }
          if(_menu.name !== 'Home') {
            // 不是首页的
            console.log(this.user)
            // 小写化菜单名
            let menuName = _menu.name.toLowerCase()
            // 获取后端访问权限
            let access = !!(this.user.allPermission[menuName] && this.user.allPermission[menuName].checked)
            // 菜单对象在根对象上设置access
            _menu.access = access
            // 路由对象在meta中设置
            if(access) {
              menu.children.forEach((submenu) => {
                let subMenuName = submenu.name.toLowerCase()
                let access = !!(this.user.allPermission[subMenuName] && this.user.allPermission[subMenuName].checked)
                let _submenu = {
                  access,
                  icon: submenu.icon,
                  name: submenu.name,
                  path: submenu.path,
                  title: submenu.title
                }
                if(submenu.meta) {
                  submenu.meta.access = access
                  Vue.set(submenu.meta, 'permissions', submenu.name)
                }
                _menu.children.push(_submenu)
              })
            }
          }else {
            // 遍历首页下的子目录
            menu.children.forEach((submenu) => {
              let _submenu = {
                access: true,
                icon: submenu.icon,
                name: submenu.name,
                path: submenu.path,
                title: submenu.title
              }
              _menu.children.push(_submenu)
              // 首页肯定可以访问
              _menu.access = true
            })
          }
          _list.push(_menu)
        })
      }catch(e) {
        console.log(e)
      }
      return _list
    }
  },
  computed: {
    ...mapState({
      user: state => state.main.user,
      initialized: state => state.initialized,
      cachePageList: state => state.main.cachePageList
    }),
    ...mapGetters({
      isCollapse: 'mainMenuCollapse'
    }),
    asideWidth() {
      return this.isCollapse ? '64px' : '210px'
    },
    asideStyle() {
      return {
        'overflow-y': this.isCollapse ? 'visible' : 'auto'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-component__main{
    height: 100%;
    overflow-x: hidden;
    .el-scrollbar__wrap {
      height: 100%;
    }
  }
</style>
