<template>
  <transition name="loader-fade">
    <div v-if="visible" class="loading-screen">
      <div class="loading-screen__inner">
        <!-- 当前页面名称 -->
        <p class="loading-screen__page">{{ pageName }}</p>

        <!-- 轮换文字 -->
        <div class="loading-screen__text-wrapper">
          <transition name="text-swap" mode="out-in">
            <p :key="currentPhrase" class="loading-screen__text">
              {{ currentPhrase }}
            </p>
          </transition>
        </div>

        <!-- 进度条 -->
        <div class="loading-screen__bar-track">
          <div
            class="loading-screen__bar-fill"
            :style="{ width: progress + '%' }"
          ></div>
        </div>

        <!-- 百分比 -->
        <span class="loading-screen__percent">{{ progress }}%</span>

        <!-- 底部装饰点 -->
        <div class="loading-screen__dots">
          <span
            v-for="i in 3"
            :key="i"
            class="loading-screen__dot"
            :class="{ 'loading-screen__dot--active': dotIndex === i - 1 }"
          ></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const pageNames = {
  '/': 'Home',
  '/blog': 'Blog',
  '/journey': 'Journey',
  '/about': 'About'
}

const phrases = [
  '桜が舞い降りる…',
  '音楽を準備中…',
  '思い出を整理中…',
  '星を数えています…',
  'お茶を淹れています…',
  '風が吹いています…',
  '猫が横切っています…',
  '雲が流れています…'
]

const visible = ref(true)
const progress = ref(0)
const currentPhrase = ref(phrases[0])
const dotIndex = ref(0)
const pageName = ref('')

let phraseTimer = null
let dotTimer = null
let progressTimer = null
let completeTimer = null

function startProgress(duration = 1800) {
  reset()

  pageName.value = pageNames[router.currentRoute.value.path] || ''
  visible.value = true
  progress.value = 0
  currentPhrase.value = phrases[Math.floor(Math.random() * phrases.length)]
  dotIndex.value = 0

  // 进度条 - 在 duration 时间内填满
  const steps = 30
  const interval = duration / steps
  let step = 0
  progressTimer = setInterval(() => {
    step++
    // 缓出效果
    const p = step / steps
    progress.value = Math.floor(p * 100)
    if (step >= steps) {
      clearInterval(progressTimer)
      complete()
    }
  }, interval)

  // 轮换文字
  phraseTimer = setInterval(() => {
    const next = phrases[Math.floor(Math.random() * phrases.length)]
    currentPhrase.value = next !== currentPhrase.value ? next : phrases[0]
  }, 800)

  // 底部点
  dotTimer = setInterval(() => {
    dotIndex.value = (dotIndex.value + 1) % 3
  }, 350)
}

function complete() {
  clearInterval(progressTimer)
  clearInterval(phraseTimer)
  clearInterval(dotTimer)
  progress.value = 100

  completeTimer = setTimeout(() => {
    visible.value = false
  }, 400)
}

function reset() {
  clearInterval(progressTimer)
  clearInterval(phraseTimer)
  clearInterval(dotTimer)
  clearTimeout(completeTimer)
}

// 初始加载 — 稍长
startProgress(2200)

// 路由切换 — 短暂加载
watch(() => router.currentRoute.value.path, () => {
  if (visible.value) return
  startProgress(1200)
})

onUnmounted(() => {
  reset()
})
</script>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, #fff0f5 0%, #fde8f0 20%, #e8e0f5 40%, #dceefb 65%, #fef0f4 85%, #f5e8fa 100%);
}

.loading-screen__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  min-width: 280px;
}

/* ---- 页面名 ---- */
.loading-screen__page {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--text-muted);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin: 0;
  opacity: 0.6;
}

/* ---- 文字 ---- */
.loading-screen__text-wrapper {
  height: 36px;
  display: flex;
  align-items: center;
}

.loading-screen__text {
  font-family: 'Noto Sans SC', 'Space Grotesk', sans-serif;
  font-size: 1.15rem;
  font-weight: 200;
  color: var(--text-secondary);
  letter-spacing: 0.08em;
  margin: 0;
  text-align: center;
  white-space: nowrap;
}

/* ---- 进度条 ---- */
.loading-screen__bar-track {
  width: 240px;
  height: 2px;
  background: rgba(180, 150, 200, 0.15);
  border-radius: 1px;
  overflow: hidden;
}

.loading-screen__bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-start), var(--accent-end));
  border-radius: 1px;
  position: relative;
}

.loading-screen__bar-fill::after {
  content: '';
  position: absolute;
  right: 0;
  top: -1px;
  width: 12px;
  height: 4px;
  background: var(--accent-start);
  border-radius: 2px;
  opacity: 0.6;
  filter: blur(2px);
}

/* ---- 百分比 ---- */
.loading-screen__percent {
  font-family: 'Space Grotesk', monospace;
  font-size: 0.8rem;
  font-weight: 300;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

/* ---- 底部点 ---- */
.loading-screen__dots {
  display: flex;
  gap: 8px;
}

.loading-screen__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(180, 150, 200, 0.25);
  transition: all 0.3s ease;
}

.loading-screen__dot--active {
  background: var(--accent-start);
  box-shadow: 0 0 6px rgba(255, 133, 162, 0.4);
  transform: scale(1.3);
}

/* 文字切换 */
.text-swap-enter-active { animation: textIn 0.35s ease-out; }
.text-swap-leave-active { animation: textOut 0.2s ease-in; }

@keyframes textIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes textOut {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-8px); }
}

/* 整体淡出 */
.loader-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.loader-fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .loading-screen__bar-track { width: 200px; }
  .loading-screen__text { font-size: 1rem; }
}
</style>
