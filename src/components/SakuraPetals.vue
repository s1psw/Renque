<template>
  <!-- 大量樱花花瓣飘落 -->
  <div class="sakura-container" aria-hidden="true">
    <span
      v-for="p in petals"
      :key="p.id"
      class="sakura-petal"
      :style="p.style"
    >🌸</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 生成 30 片花瓣，每片参数随机
const petalCount = 30

function random(min, max) {
  return min + Math.random() * (max - min)
}

const petals = computed(() => {
  return Array.from({ length: petalCount }, (_, i) => {
    const left = random(0, 100)
    const duration = random(8, 22)        // 下落时长 8~22s
    const delay = random(-20, 0)          // 负延迟让花瓣一开始就在不同位置
    const size = random(14, 28)           // 大小 14~28px
    const drift = random(-80, 80)         // 水平漂移量
    const rotation = random(360, 1080)    // 旋转角度
    const startY = random(-10, -5)        // 起始 Y
    const opacity = random(0.10, 0.25)    // 透明度

    return {
      id: i,
      style: {
        left: `${left}%`,
        fontSize: `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        opacity,
        '--drift': `${drift}px`,
        '--rotation': `${rotation}deg`,
        '--startY': `${startY}vh`,
      }
    }
  })
})
</script>

<style scoped>
.sakura-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.sakura-petal {
  position: absolute;
  top: -10vh;
  /* 每片花瓣独立的下落动画 */
  animation: sakuraFall var(--duration, 12s) linear infinite;
  animation-delay: var(--delay, 0s);
  /* 随机初始 Y 位置，让花瓣开场就已散落各处 */
  transform: translateY(var(--startY, 0vh));
}

@keyframes sakuraFall {
  0% {
    transform: translateY(-10vh) translateX(0) rotate(0deg);
    opacity: 0;
  }
  5% {
    opacity: var(--opacity, 0.18);
  }
  50% {
    transform: translateY(45vh) translateX(calc(var(--drift, 40px) * 0.6)) rotate(calc(var(--rotation, 540deg) * 0.5));
    opacity: var(--opacity, 0.18);
  }
  90% {
    opacity: calc(var(--opacity, 0.18) * 0.7);
  }
  100% {
    transform: translateY(105vh) translateX(var(--drift, 80px)) rotate(var(--rotation, 720deg));
    opacity: 0;
  }
}
</style>
