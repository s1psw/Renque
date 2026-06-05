<template>
  <!-- 返回顶部按钮：滚动超过 400px 后显示 -->
  <transition name="fade">
    <button
      v-show="visible"
      class="back-to-top glass-card"
      @click="scrollToTop"
      aria-label="返回顶部"
      title="返回顶部"
    >
      <span class="back-to-top__icon">⬆</span>
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

function handleScroll() {
  visible.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 900;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
  border-radius: 50% !important;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.25), rgba(118, 75, 162, 0.25)) !important;
  border: 1px solid rgba(102, 126, 234, 0.3) !important;
  cursor: pointer;
  transition: all var(--transition-normal) !important;
}

.back-to-top:hover {
  transform: translateY(-4px) !important;
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4) !important;
  border-color: var(--accent-start) !important;
}

.back-to-top__icon {
  font-size: 1.2rem;
  color: #fff;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 42px;
    height: 42px;
  }
}
</style>
