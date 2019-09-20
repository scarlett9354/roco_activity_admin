<template>
  <el-scrollbar class="page-component__nav" :wrapStyle="'overflow-x:hidden;'">
    <aside class="main-sidebar-menu_con">
      <div class="main-logo_con" :style="logoStyle">
        活动平台
      </div>
      <el-menu>
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
export default {
  created() {
    console.log(this.menuList)
  },
  computed: {
    ...mapState({
      menuList: state => state.main.menuList
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
