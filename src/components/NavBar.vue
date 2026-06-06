<template>
  <!-- 顶部导航栏：玻璃态 + 固定定位 -->
  <header class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="navbar__inner container">
      <!-- Logo -->
      <router-link to="/" class="navbar__logo">
        <span class="logo-icon">✦</span>
        <span class="logo-text gradient-text">Renque的个人博客</span>
      </router-link>

      <!-- 桌面端导航链接 -->
      <nav class="navbar__links">
        <router-link to="/" class="navbar__link" exact-active-class="navbar__link--active">
           首页
        </router-link>
        <router-link to="/blog" class="navbar__link" active-class="navbar__link--active">
           文章
        </router-link>
        <router-link to="/journey" class="navbar__link" active-class="navbar__link--active">
           见闻
        </router-link>
        <router-link to="/about" class="navbar__link" active-class="navbar__link--active">
           关于
        </router-link>
      </nav>

      <!-- 移动端菜单按钮 -->
      <button
        class="navbar__hamburger"
        @click="menuOpen = !menuOpen"
        :aria-label="menuOpen ? '关闭菜单' : '打开菜单'"
      >
        <span class="hamburger-line" :class="{ 'hamburger-line--open': menuOpen }"></span>
        <span class="hamburger-line" :class="{ 'hamburger-line--open': menuOpen }"></span>
        <span class="hamburger-line" :class="{ 'hamburger-line--open': menuOpen }"></span>
      </button>
    </div>

    <!-- 移动端下拉菜单 -->
    <transition name="slide">
      <nav v-if="menuOpen" class="navbar__mobile">
        <router-link to="/" class="navbar__mobile-link" @click="menuOpen = false">🏠 首页</router-link>
        <router-link to="/blog" class="navbar__mobile-link" @click="menuOpen = false">📝 文章</router-link>
        <router-link to="/journey" class="navbar__mobile-link" @click="menuOpen = false"> 见闻</router-link>
        <router-link to="/about" class="navbar__mobile-link" @click="menuOpen = false">👤 关于</router-link>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 滚动状态：滚动超过 50px 后加深导航栏背景
const isScrolled = ref(false)
const menuOpen = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 16px 0;
  transition: all var(--transition-normal);
  /* 初始透明 */
  background: transparent;
}

/* 滚动后：玻璃态背景 */
.navbar--scrolled {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 182, 193, 0.3);
  padding: 10px 0;
  box-shadow: 0 4px 30px rgba(255, 150, 180, 0.12);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.navbar__logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.4rem;
  font-weight: 700;
  text-decoration: none;
}

.logo-icon {
  font-size: 1.6rem;
  animation: logoSpin 4s linear infinite;
}

@keyframes logoSpin {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
}

.logo-text {
  font-weight: 100px;
  letter-spacing: 1px;
}

/* 桌面端链接 */
.navbar__links {
  display: flex;
  gap: 8px;
}

.navbar__link {
  padding: 8px 20px;
  border-radius: 50px;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all var(--transition-fast);
  position: relative;
}

.navbar__link:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.06);
}

.navbar__link--active {
  color: #fff !important;
  background: linear-gradient(135deg, rgba(255, 210, 225, 0.3), rgba(200, 180, 255, 0.3));
  border: 1px solid rgba(102, 126, 234, 0.3);
}

/* 汉堡菜单按钮 */
.navbar__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  z-index: 1001;
}

.hamburger-line {
  display: block;
  width: 26px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all var(--transition-normal);
}

.hamburger-line--open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger-line--open:nth-child(2) {
  opacity: 0;
}

.hamburger-line--open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* 移动端菜单 */
.navbar__mobile {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 245, 250, 0.97);
  backdrop-filter: blur(30px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  z-index: 999;
}

.navbar__mobile-link {
  font-size: 1.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-fast);
}

.navbar__mobile-link:hover {
  color: var(--accent-start);
}

/* 移动端过渡 */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

/* 响应式 */
@media (max-width: 768px) {
  .navbar__links {
    display: none;
  }

  .navbar__hamburger {
    display: flex;
  }
}
</style>
