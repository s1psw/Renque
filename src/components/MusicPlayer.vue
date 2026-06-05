<template>
  <!-- 音乐播放器：柔美封面唱片 -->
  <div class="music-player">
    <!-- 本地音频 -->
    <audio
      ref="audioRef"
      :src="`${baseUrl}music.mp3`"
      loop
      preload="auto"
      autoplay
      playsinline
      @canplaythrough="onReady"
      @error="onError"
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
import { ref, onMounted } from 'vue'

const baseUrl = import.meta.env.BASE_URL

const isPlaying = ref(false)
const audioRef = ref(null)
let playAttempted = false

// 音频加载完成后自动播放
function onReady() {
  if (playAttempted) return
  playAttempted = true

  const audio = audioRef.value
  if (!audio) return
  audio.volume = 0.5

  // 先尝试直接有声播放
  const tryUnmuted = () => {
    audio.muted = false
    audio.play().then(() => {
      isPlaying.value = true
    }).catch(() => {
      // 浏览器阻止有声播放，回退到静音播放
      audio.muted = true
      audio.play().then(() => {
        isPlaying.value = true
        // 等待用户首次交互后取消静音
        const unmute = () => {
          audio.muted = false
          audio.volume = 0.5
          document.removeEventListener('click', unmute)
          document.removeEventListener('touchstart', unmute)
        }
        document.addEventListener('click', unmute, { once: true })
        document.addEventListener('touchstart', unmute, { once: true })
      }).catch(() => {
        // 静音也失败，等用户点击唱片手动播放
        isPlaying.value = false
      })
    })
  }

  // 给浏览器一点时间完成加载
  setTimeout(tryUnmuted, 100)
}

function onError() {
  console.error('音频文件加载失败，请检查文件路径')
}

// 兜底：onMounted 时如果 canplaythrough 没触发，手动尝试
onMounted(() => {
  setTimeout(() => {
    if (!playAttempted) onReady()
  }, 2000)
})

function togglePlay() {
  const audio = audioRef.value
  if (!audio) return

  if (isPlaying.value) {
    audio.pause()
    isPlaying.value = false
  } else {
    // 用户主动点击，这时有手势，可以直接有声播放
    audio.muted = false
    audio.volume = 0.5
    audio.play().then(() => {
      isPlaying.value = true
    }).catch(() => {
      // 失败就静音播放
      audio.muted = true
      audio.play().then(() => {
        isPlaying.value = true
      }).catch(() => {
        isPlaying.value = false
      })
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
