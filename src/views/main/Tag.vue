<template>
  <div ref="scrollContainer" @mousewheel="scrollHandler" class="tags-con">
    <div class="tags-outer-scroll-con">
    <div class="tags-close-all">
      <el-dropdown @command="handleCommand">
        <el-button size="mini" type="primary">
          标签选项<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          <el-dropdown-item command="etc">关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div ref="scrollBody" class="tags-inner-scroll-body" :style="{'left': `${tagBodyLeft}px`}">
      <transition-group name="tagSlideIn">
      <el-tag v-for="(item,index) in pageList"
        type="info"
        ref="tagsPageOpened"
        :key="item.name"
        :name="item.name"
        :closable="item.name !== DefaultIndexName"
        :class="{active:item.name === currentPageName}"
        @click.native="routeTo(item)"
        @close.stop="closeHandler(item,index)"
        class="tag-history"
      >
      <i class="symbol_dot"></i>
      {{item.title}}
      </el-tag>
      </transition-group>
    </div>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { DefaultIndexName } from '@/router/default-index'
import * as MainTypes from '@/store/modules/main'
export default {
  data() {
    return {
      tagBodyLeft: 0,
      DefaultIndexName,
      currentPageName: this.$route.name
    }
  },
  methods: {
    scrollHandler() {},
    handleCommand(command) {
      switch(command) {
        case 'all':
          this.$store.commit(MainTypes.MAIN_TAGS_CLOSE_ALL)
          this.$router.push({
            name: DefaultIndexName
          })
          break
        case 'etc':
          this.$store.commit(MainTypes.MAIN_TAGS_CLOSE_ETC, this.$route.name)
      }
    },
    routeTo(item) {
      let routerObj = {
        name: item.name
      }
      if(item.argu) {
        routerObj.params = item.argu
      }
      if(item.query) {
        routerObj.query = item.query
      }
      this.$router.push(routerObj)
    },
    closeHandler(item, index) {
      
    }
  },
  computed: {
    ...mapState({
      pageList: state => state.main.pageList
    })
  }
}
</script>
