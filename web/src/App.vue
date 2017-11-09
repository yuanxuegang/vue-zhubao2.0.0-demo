<template>
  <div id="app">
    <header-c></header-c>
    <div style="height: 1.8rem;"></div>
    <transition :name="transitionName"> 
      <router-view class="Router"></router-view>
    </transition>
    <div style="height: 2.5rem;" :style="{ display: $store.state.goodsDetailsPageHidden }"></div>
    <footer-c></footer-c>
  </div>
</template>

<script>

import headerC from '@/components/headerC';
import footerC from '@/components/footerC';

export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-right'  // 默认动态路由变化为slide-right
    }
  },
  components: {
    "header-c": headerC,
    "footer-c": footerC
  },
  methods: {

  },
  created: function () {
    this.changeTitle('首页');
  },
  watch: {
    '$route' (to, from) {
      let isBack = this.$router.isBack;
      if(isBack) {
        this.transitionName = 'slide-right';
      } else {
        this.transitionName = 'slide-left';
      }
      this.$router.isBack = false;
    }
  }
}
</script>

<style>
#app {
  font-family: '黑体', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

.Router {
  /*position: relative;*/
  width: 100%;
  transition: all .5s ease;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
</style>
