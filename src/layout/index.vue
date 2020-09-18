<template>
  <div class="layout">
    <aside class="aside" :style="{
      width: asideWidth
    }">
      <side :active-name="activeName" :routes="routes" :collapsed="collapsed">
        <logo :img="_asideLogo" :collapsed="collapsed" slot="logo">{{ asideLogoName }}</logo>
      </side>
    </aside>
    <navbar
      class="header"
      :style="{
        left: asideWidth
      }"
      @expand="handleExpand"
    >
      <!-- 导航条 -->
      <!-- <bread-nav slot="left" class="header__bread"/> -->
      <div class="text-right">
        <!-- 用户信息 -->
        <Dropdown transfer trigger="click">
          <a href="javascript:void(0)">
            <!-- <Avatar icon="ios-person" :size="34"/>-->
            <span class="user__name">{{ username }}</span>
            <Icon type="ios-arrow-down" color="#666666" />
          </a>
          <DropdownMenu slot="list">
            <!-- <DropdownItem @click.native="handleChangeShop">切换店铺</DropdownItem> -->
            <DropdownItem @click.native="handleExit">退出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </navbar>
    <main
      class="main"
      :style="{
        paddingLeft: asideWidth
      }"
    >
      <transition
        name="fade-transform"
        mode="out-in"
      >
        <router-view :key="key" />
      </transition>
    </main>
    <!-- <footer class="footer">
      <footers />
    </footer> -->
  </div>
</template>

<script>
import side from './components/side/index.vue'
import navbar from './components/navbar/index.vue'
// import footers from './components/footers/index.vue'
import logo from './components/logo/index.vue'
// import breadNav from './components/bread-nav/index.vue'
import cssVar from './var.scss'
import _ from 'lodash'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    side,
    navbar,
    // footers,
    // breadNav,
    logo
  },
  data() {
    return {
      routes: [],
      winWidth: 0,
      collapsed: false
    }
  },
  computed: {
    ...mapState('user', ['username', 'asideLogoName', 'asideLogo', 'permission']),
    _asideLogo() {
      return this.asideLogo
    },
    activeName() {
      return this.$route.name
    },
    key() {
      return this.$route.path
    },
    // 侧边栏宽度
    asideWidth() {
      return this.collapsed ? `${cssVar.asideWidthMin}px` : `${cssVar.asideWidth}px`
    }
  },
  created() {
    // 初始化路由
    this.routes = this.$router.options.routes
  },
  mounted() {
    this.resize()

    // 节流方法，监听窗口尺寸改变
    this.onResize = _.throttle(this.resize, 50)
    window.addEventListener('resize', this.onResize, false)
  },
  methods: {
    ...mapActions('user', ['handleLogout']),
    /**
     * 窗口尺寸改变
     */
    resize() {
      this.winWidth = document.documentElement.clientWidth
      this.collapsed = this.winWidth <= 1200
    },
    // 展开侧边栏
    handleExpand() {
      this.collapsed = !this.collapsed
    },
    // 退出
    handleExit() {
      this.handleLogout()
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style lang="scss" scoped>
  @import "./var";
  .layout {
    position: relative;
    width: 100%;
    height: 100vh;
  }
  .aside {
    position: fixed;
    left: 0;
    top: 0;
    width: $asideWidth+px;
    height: 100%;
    z-index: 200;
    /*transition: all .2s ease;*/
  }
  .header {
    position: fixed;
    left: $asideWidth+px;
    right: 0;
    top: 0;
    height: $headerHeight+px;
    background-color: white;
    &__bread {
      margin-left: 16px;
    }
  }
  .main {
    min-height: 100vh;
    padding: $headerHeight+px 0 $footerHeight+px $asideWidth+px;
    background-color: #f5f8fa;
  }
  .footer {
    position: fixed;
    left: $asideWidth+px;
    bottom: 0;
    right: 0;
    height: $footerHeight+px;
    z-index: 200;
    background-color: white;
  }
  .user {
    &__name {
      color: #666666;
      font-weight: bold;
      transition: all .2s ease;
      &:hover {
        color: #999999;
      }
    }
  }
</style>
