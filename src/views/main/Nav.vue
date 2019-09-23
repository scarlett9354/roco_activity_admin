<template>
  <el-scrollbar class="page-component__nav" :wrapStyle="'overflow-x:hidden;'">
    <aside class="main-sidebar-menu_con">
      <div class="main-logo_con" :style="logoStyle">
        活动平台
      </div>
      <el-menu @select="selectHandler" :default-active="currentPageName" :collapse="isCollapse">
        <template v-for="menu in menuList">
          <template v-if="menu.access">
            <template v-if="menu.isSingle">
              <el-menu-item :index="menu.children[0].name" :key="menu.name">
                <i style="width:24px;font-size:18px;" v-if="menu.children[0].icon" :class="menu.children[0].icon"></i>
                <span slot="title">{{ menu.children[0].title }}</span>
              </el-menu-item>
            </template>
            <template v-else>
              <el-submenu :index="menu.name" :key="menu.name">
                <template slot="title">
                  <i style="width:24px;font-size:18px;" v-if="menu.icon" :class="menu.icon"></i>
                  <span>{{ menu.title }}</span>
                </template>
                <template v-for="submenu in menu.children">
                  <template v-if="submenu.access">
                    <el-menu-item :index="submenu.name" :key="submenu.name">
                      <i style="width:24px;font-size:18px;" :class="submenu.icon || 'el-icon-edit'"></i>
                      <span slot="title">{{ submenu.title }}</span>
                    </el-menu-item>
                  </template>
                </template>
              </el-submenu>
            </template>
          </template>
        </template>
      </el-menu>
    </aside>
  </el-scrollbar>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import utils from '@/utils'
export default {
  methods: {
    selectHandler(key, keyPath) {
      if(this.cachePageList.indexOf(key) === -1) {
        if(this.pageListLength >= this.maxPageListLength) {
          this.$message({
            showClose: true,
            message: `已经打开了${this.maxPageListLength}个页面,请先关闭不常用的再打开新页`,
            type: 'warning'
          })
          return false
        }
      }
      utils.openNewPage(this, key)
    }
  },
  computed: {
    ...mapState({
      menuList: state => state.main.menuList,
      currentPageName: state => state.main.currentPageName,
      cachePageList: state => state.main.cachePageList,
      pageListLength: state => state.main.pageList.length,
      maxPageListLength: state => state.main.maxPageListLength
    }),
    ...mapGetters({
      isCollapse: 'mainMenuCollapse'
    }),
    logoStyle() {
      return {
        color: '#409EFF',
        fontSize: this.isCollapse ? '12px' : '24px',
        justifyContent: 'center'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-component__nav{
    height: 100%;
    .el-scrollbar__wrap {
      height: 100%;
    }
  }
</style>
