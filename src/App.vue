<template>
  <!-- 根组件：全局布局框架 -->
  <div class="app-wrapper">
    <!-- 樱花花瓣飘落 -->
    <SakuraPetals />

    <!-- 顶部导航栏 -->
    <NavBar />

    <!-- 主内容区（带路由过渡动画） -->
    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <!-- 页脚 -->
    <Footer />

    <!-- 返回顶部按钮 -->
    <BackToTop />

    <!-- 鼠标拖尾特效 -->
    <MouseTrail />

    <!-- 音乐播放器（旋转唱片） -->
    <MusicPlayer />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import BackToTop from './components/BackToTop.vue'
import MouseTrail from './components/mousemove.vue'
import SakuraPetals from './components/SakuraPetals.vue'
import MusicPlayer from './components/MusicPlayer.vue'
</script>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-top: 70px; /* 留出固定导航栏的高度 */
  padding-bottom: var(--section-gap);
}

/* 路由过渡动画（关键帧定义在 global.css 中） */
.page-enter-active {
  animation: pageIn 0.4s ease-out;
}

.page-leave-active {
  animation: pageOut 0.25s ease-in;
}
</style>

