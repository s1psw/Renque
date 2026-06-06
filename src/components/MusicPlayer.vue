<template>
  <div class="music-player">
    <!-- 本地音频：静音自动播放 -->
    <audio
      ref="audioRef"
      :src="`${baseUrl}music.mp3`"
      loop
      preload="auto"
      autoplay
      muted
      playsinline
      @play="onPlay"
      @pause="onPause"
    ></audio>

    <!-- 封面唱片按钮 -->
    <button
      class="cover-disc"
      :class="{ 'cover-disc--spinning': isPlaying }"
      @click="togglePlay"
      :aria-label="isPlaying ? '暂停' : '播放'"
      :title="isPlaying ? '点击暂停' : '点击播放'"
    >
      <img
        :src="`${baseUrl}img/cover.png`"
        class="cover-disc__img"
        alt="专辑封面"
      />
      <div class="cover-disc__veil"></div>
      <div class="cover-disc__glow-ring"></div>
      <div class="tonearm" :class="{ 'tonearm--on': isPlaying }"></div>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const baseUrl = import.meta.env.BASE_URL

const isPlaying = ref(true)       // 当前播放状态
const audioRef = ref(null)
let audioEnabled = false          // 是否已激活声音（用户已交互）
let globalUnmuteHandler = null    // 全局事件处理器引用

// 激活声音：取消静音，如果处于暂停状态则开始播放
function enableAudio() {
  const audio = audioRef.value
  if (!audio || audioEnabled) return

  // 取消静音，设置音量
  audio.muted = false
  audio.volume = 0.5

  // 如果当前是暂停状态，则开始播放
  if (audio.paused) {
    audio.play().catch(() => {
      // 极少数情况播放失败，保持静音并重试一次
      audio.muted = true
      audio.play()
    })
  }

  audioEnabled = true

  // 移除全局事件监听，防止重复激活
  if (globalUnmuteHandler) {
    document.removeEventListener('click', globalUnmuteHandler)
    document.removeEventListener('touchstart', globalUnmuteHandler)
    globalUnmuteHandler = null
  }
}

// 封面的点击切换逻辑
function togglePlay() {
  const audio = audioRef.value
  if (!audio) return

  // 如果尚未激活声音，先激活声音（保持当前播放/暂停状态不变）
  if (!audioEnabled) {
    enableAudio()
    return
  }

  // 声音已激活，正常切换播放/暂停
  if (isPlaying.value) {
    audio.pause()
  } else {
    // 确保有声播放
    audio.muted = false
    audio.volume = 0.5
    audio.play().catch(() => {
      // 失败时回退静音播放（基本不会发生）
      audio.muted = true
      audio.play()
    })
  }
}

// 音频事件同步状态
function onPlay() { isPlaying.value = true }
function onPause() { isPlaying.value = false }

onMounted(() => {
  const audio = audioRef.value
  if (!audio) return

  // 确保自动播放（静音），避免某些浏览器忽略 autoplay 属性
  audio.play().catch(() => {
    // 静音播放总是允许的
    audio.muted = true
    audio.play()
  })

  // 定义全局首次交互处理器（任意点击/触摸即激活声音）
  globalUnmuteHandler = () => {
    enableAudio()
  }
  document.addEventListener('click', globalUnmuteHandler, { once: true })
  document.addEventListener('touchstart', globalUnmuteHandler, { once: true })
})

onUnmounted(() => {
  // 清理事件，避免内存泄漏
  if (globalUnmuteHandler) {
    document.removeEventListener('click', globalUnmuteHandler)
    document.removeEventListener('touchstart', globalUnmuteHandler)
  }
})
</script>

<style scoped>
/* 样式保持不变，与原代码相同 */
.music-player {
  position: fixed;
  bottom: 60px;
  left: 30px;
  z-index: 950;
}

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

.cover-disc__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0.85;
  filter: brightness(1.08) contrast(0.92) saturate(0.9);
}

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

.cover-disc__glow-ring {
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.35);
  pointer-events: none;
  box-shadow: inset 0 0 12px rgba(255, 220, 240, 0.2);
}

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

@media (max-width: 768px) {
  .music-player {
    bottom: 80px;
    right: 16px;
    left: auto;
    z-index: 940;
  }

  .cover-disc {
    width: 56px;
    height: 56px;
    -webkit-tap-highlight-color: transparent;
  }

  .cover-disc:hover {
    box-shadow:
      0 0 0 3px rgba(255, 255, 255, 0.45),
      0 4px 28px rgba(154, 117, 178, 0.25);
  }

  .tonearm {
    top: -14px;
    right: -1px;
    width: 28px;
    height: 3px;
  }

  .tonearm::after {
    right: -4px;
    top: -2px;
    width: 8px;
    height: 8px;
  }

  .cover-disc__glow-ring {
    border-width: 1.5px;
  }
}
</style>