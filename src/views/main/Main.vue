<template>
  <el-container class="wrapper">
    <el-aside class="menu">
      <r-nav></r-nav>
    </el-aside>
    <el-container>
      <el-header class="main-header-con">
        <r-header></r-header>
      </el-header>
      <el-scrollbar class="page-component__main" :wrapStyle="'overflow-x:hidden;'">
        <el-main class="content" style="overflow-x:hidden;">
          <r-tag></r-tag>
          <keep-alive>
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
export default {
  name: 'Main',
  components: {
    'r-nav': Nav,
    'r-header': Header,
    'r-tag': Tag
  }
}
</script>

<style lang="scss" scoped>
  .page-component__main{
    height: 100%;
      .el-scrollbar__wrap {
        height: 100%;
      }
  }
</style>
