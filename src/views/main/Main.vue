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
export default {
  name: 'Main',
  components: {
    'r-nav': Nav,
    'r-header': Header,
    'r-tag': Tag
  },
  created() {
    this.$store.commit('setInitialized', true)
    this.setUser()
  },
  methods: {
    setUser() {
      this.$store.commit(MainTypes.MAIN_MAKE_MENU, [{
        icon: 'fa fa-tachometer',
        name: 'Home',
        title: '首页',
        isSingle: false,
        access: true,
        children: [{
          name: 'Home',
          title: '首页',
          access: true
        }]
      }])
    }
  },
  computed: {
    ...mapState({
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
