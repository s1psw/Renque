<template>
  <!-- 音乐播放器：本地音频优先，失败则网易云 iframe 兜底 -->
  <div class="music-player">
    <!-- 本地音频（优先） -->
    <audio
      v-if="!useFallback"
      ref="audioRef"
      :src="`${baseUrl}music.mp3`"
      loop
      preload="auto"
      autoplay
      playsinline
      @canplaythrough="onReady"
      @error="switchToFallback"
      @stalled="switchToFallback"
    ></audio>

    <!-- 网易云 iframe 兜底（极小化，不可 display:none） -->
    <iframe
      v-if="useFallback"
      ref="iframeRef"
      class="fallback-iframe"
      :src="`https://music.163.com/outchain/player?type=2&id=399367379&auto=1&height=66`"
      frameborder="0"
      allow="autoplay"
    ></iframe>

    <!-- 封面唱片 -->
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
import { ref, nextTick } from 'vue'

const baseUrl = import.meta.env.BASE_URL
const SONG_ID = '399367379'

const isPlaying = ref(false)
const useFallback = ref(false)
const audioRef = ref(null)
const iframeRef = ref(null)
let playTried = false

// 尝试本地音频播放
function tryLocalPlay() {
  if (playTried || useFallback.value) return
  playTried = true

  const audio = audioRef.value
  if (!audio) return
  audio.volume = 0.5

  // 先试有声
  audio.muted = false
  audio.play().then(() => {
    isPlaying.value = true
  }).catch(() => {
    // 有声被阻，试静音
    audio.muted = true
    audio.play().then(() => {
      isPlaying.value = true
      // 首次点击取消静音
      const unmute = () => {
        if (audio) { audio.muted = false; audio.volume = 0.5 }
        document.removeEventListener('click', unmute)
        document.removeEventListener('touchstart', unmute)
      }
      document.addEventListener('click', unmute, { once: true })
      document.addEventListener('touchstart', unmute, { once: true })
    }).catch(() => {
      // 静音也失败 → 切网易云
      switchToFallback()
    })
  })
}

// 本地音频就绪
function onReady() {
  setTimeout(tryLocalPlay, 100)
}

// 切到网易云 iframe
function switchToFallback() {
  if (useFallback.value) return
  useFallback.value = true
  nextTick(() => {
    // iframe 的 auto=1 会自动播放
    isPlaying.value = true
  })
}

// 兜底：2 秒还没触发 canplaythrough 就认为本地文件不可用
setTimeout(() => {
  if (!playTried && !useFallback.value) {
    switchToFallback()
  }
}, 3000)

// 点击唱片
function togglePlay() {
  if (useFallback.value) {
    // 网易云 iframe 模式：点击重建 iframe 切换播放
    isPlaying.value = !isPlaying.value
    if (isPlaying.value && iframeRef.value) {
      iframeRef.value.src = `https://music.163.com/outchain/player?type=2&id=${SONG_ID}&auto=1&height=66`
    } else if (!isPlaying.value && iframeRef.value) {
      iframeRef.value.src = ''
    }
    return
  }

  // 本地音频模式
  const audio = audioRef.value
  if (!audio) return
  if (isPlaying.value) {
    audio.pause()
    isPlaying.value = false
  } else {
    audio.muted = false
    audio.volume = 0.5
    audio.play().then(() => {
      isPlaying.value = true
    }).catch(() => {
      switchToFallback()
    })
  }
}
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 60px;
  left: 30px;
  z-index: 950;
}

/* 兜底 iframe：1x1 像素可见，避免浏览器阻止 */
.fallback-iframe {
  position: absolute;
  width: 1px;
  height: 1px;
  bottom: 0;
  left: 0;
  opacity: 0.01;
  pointer-events: none;
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
    bottom: 20px;
    left: 20px;
  }
  .cover-disc {
    width: 64px;
    height: 64px;
  }
}
</style>
