<template>
  <!-- 音乐播放器：柔美封面唱片 -->
  <div class="music-player">
    <!-- 本地音频播放（静音自动播放 → 首次点击取消静音） -->
    <audio
      ref="audioRef"
      :src="`${baseUrl}music.mp3`"
      loop
      preload="auto"
      autoplay
      muted
    ></audio>

    <!-- 封面唱片（点击切换播放） -->
    <button
      class="cover-disc"
      :class="{ 'cover-disc--spinning': isPlaying }"
      @click="togglePlay"
      :aria-label="isPlaying ? '暂停' : '播放'"
      :title="isPlaying ? '点击暂停' : '点击播放'"
    >
      <!-- 封面图片 -->
      <img
        :src="`${baseUrl}img/cover.png`"
        class="cover-disc__img"
        alt="专辑封面"
      />
      <!-- 柔光雾面遮罩 -->
      <div class="cover-disc__veil"></div>
      <!-- 光晕环 -->
      <div class="cover-disc__glow-ring"></div>
      <!-- 唱臂 -->
      <div class="tonearm" :class="{ 'tonearm--on': isPlaying }"></div>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 适配 GitHub Pages 子路径
const baseUrl = import.meta.env.BASE_URL

const isPlaying = ref(true)   // 静音自动播放，认为是"播放中"
const isMuted = ref(true)     // 初始静音
const audioRef = ref(null)

function handleFirstInteraction() {
  const audio = audioRef.value
  if (!audio) return
  // 取消静音，设音量
  audio.muted = false
  audio.volume = 0.5
  isMuted.value = false
}

onMounted(() => {
  // 静音自动播放 — 浏览器允许
  audioRef.value?.play().catch(() => {
    isPlaying.value = false
  })
  // 首次用户交互时取消静音
  document.addEventListener('click', handleFirstInteraction, { once: true })
  document.addEventListener('touchstart', handleFirstInteraction, { once: true })
})

onUnmounted(() => {
  document.removeEventListener('click', handleFirstInteraction)
  document.removeEventListener('touchstart', handleFirstInteraction)
})

function togglePlay() {
  const audio = audioRef.value
  if (!audio) return
  if (isPlaying.value) {
    audio.pause()
    isPlaying.value = false
  } else {
    audio.play().then(() => {
      isPlaying.value = true
    }).catch(() => {
      isPlaying.value = false
    })
  }
}
</script>

<style scoped>
/* ---- 容器 ---- */
.music-player {
  position: fixed;
  bottom: 60px;
  left: 30px;
  z-index: 950;
}

/* ---- 封面唱片 ---- */
.cover-disc {
  position: relative;
  width: 120px;
  
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  box-shadow:
    0 0 0 3px rgba(255, 255, 255, 0.45),
    0 4px 28px rgba(154, 117, 178, 0.25);
  transition: transform 0.3s ease, box-shadow 0.4s ease;
  animation: coverFloat 4s ease-in-out infinite;
  background: #f5eef8;
}

.cover-disc:hover {
  box-shadow:
    0 0 0 3px rgba(255, 255, 255, 0.65),
    0 8px 40px rgba(154, 117, 178, 0.4);
}

/* 封面图片 */
.cover-disc__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0.85;
  filter: brightness(1.08) contrast(0.92) saturate(0.9);
}

/* 柔光雾面遮罩 — 微微透明的柔美感 */
.cover-disc__veil {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 60%),
    radial-gradient(circle at 70% 60%, rgba(220, 180, 220, 0.12) 0%, transparent 50%),
    linear-gradient(180deg, rgba(255, 240, 250, 0.08) 0%, rgba(240, 220, 250, 0.15) 100%);
  pointer-events: none;
}

/* 光晕环 */
.cover-disc__glow-ring {
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.35);
  pointer-events: none;
  box-shadow: inset 0 0 12px rgba(255, 220, 240, 0.2);
}

/* 旋转动画 */
.cover-disc--spinning {
  animation: coverSpin 5s linear infinite !important;
}

@keyframes coverSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes coverFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* 唱臂 */
.tonearm {
  position: absolute;
  top: -18px;
  right: -2px;
  width: 34px;
  height: 4px;
  background: linear-gradient(90deg, #b0a0b8, #d0c8d8);
  border-radius: 2px;
  transform-origin: right center;
  transform: rotate(-30deg);
  transition: transform 0.5s ease;
  box-shadow: 0 1px 3px rgba(100, 80, 100, 0.25);
  z-index: 2;
}

.tonearm::after {
  content: '';
  position: absolute;
  right: -5px;
  top: -3px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #c8bcd0;
  box-shadow: 0 1px 3px rgba(100, 80, 100, 0.25);
}

.tonearm--on {
  transform: rotate(-5deg);
}

/* 响应式 */
@media (max-width: 768px) {
  .music-player {
    bottom: 20px;
    left: 20px;
  }

  .cover-disc {
    width: 64px;
    height: 64px;
  }
}
</style>
