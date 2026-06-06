<template>
  <!-- 音乐播放器：网易云 iframe -->
  <div class="music-player">
    <!-- 网易云播放器 iframe -->
    <iframe
      ref="iframeRef"
      class="audio-iframe"
      :src="`https://music.163.com/outchain/player?type=2&id=399367379&auto=1&height=66`"
      frameborder="0"
      allow="autoplay"
    ></iframe>

    <!-- 封面唱片（点击切换播放） -->
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
import { ref } from 'vue'

const baseUrl = import.meta.env.BASE_URL
const SONG_ID = '399367379'

const isPlaying = ref(true)   // 默认播放
const iframeRef = ref(null)

function togglePlay() {
  isPlaying.value = !isPlaying.value
  if (iframeRef.value) {
    iframeRef.value.src = isPlaying.value
      ? `https://music.163.com/outchain/player?type=2&id=${SONG_ID}&auto=1&height=66`
      : ''
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

/* 极小化 iframe，保持可见避免浏览器阻止 */
.audio-iframe {
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
