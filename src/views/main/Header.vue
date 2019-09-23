<template>
  <div class="main-header">
    <div class="navicon-con">
      <el-button :style="{transform: 'rotateZ(' + (!isCollapse ? '0' : '-90') + 'deg)'}" type="text" class="navicon-button" @click="toggleHandler">
        <i class="ion-navicon" style="font-size: 32px;"></i>
      </el-button>
    </div>
    <div class="breadcrumb-con">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item v-for="(path,$index) in breadCrumbs" :key="path.name" :to="{name: $index === 1 ? '' : path.name}">
          {{path.title}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-header_item avatar-con" style="line-height:32px;">
      <div class="user-dropdown-menu-con">
        <el-dropdown @command="commandHandler">
          <span class="el-dropdown-link">
            {{`欢迎您，${user.username}`}}
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="password">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as MainTypes from '@/store/types/main'
import utils from '@/utils'
import axios from '@/configs/axios'
import CODE_SUCCESS from '@/constants/response-code'
export default {
  methods: {
    // 收缩菜单
    toggleHandler() {
      this.$store.commit(MainTypes.MAIN_TOGGLE_MENU)
    },
    // 登出操作
    commandHandler(command) {
      let key = ''
      switch(command) {
        case 'password':
          key = 'SystemPassword'
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
          this.$router.push({ name: key })
          break
        case 'logout':
          axios.get('/api/adm/account/logout').then((res) => {
            if(res.data.code === CODE_SUCCESS) {
              sessionStorage.removeItem('user')
              window.localStorage.removeItem(process.env.TOKEN_KEY)
              // 刷新页面，省的重置store了
              window.location.href = 'login.html?' + new Date().getTime()
            }
          })
          break
      }
    }
  },
  computed: {
    ...mapState({
      isCollapse: state => state.main.collapse,
      breadCrumbs: state => state.main.breadCrumbs,
      user: state => state.main.user,
      cachePageList: state => state.main.cachePageList,
      pageListLength: state => state.main.pageList.length,
      maxPageListLength: state => state.main.maxPageListLength
    })
  }
}
</script>
