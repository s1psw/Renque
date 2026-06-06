<template>
  <!-- 音乐播放器：网易云 iframe 藏在唱片后面 -->
  <div class="music-player">
    <!-- 唱片容器（包裹 iframe + 封面） -->
    <div class="player-wrapper" @click="togglePlay">
      <!-- 网易云 iframe 在底层，唱片挡住它 -->
      <iframe
        ref="iframeRef"
        class="audio-iframe"
        :src="iframeSrc"
        frameborder="0"
        allow="autoplay *"
      ></iframe>

      <!-- 封面唱片盖在 iframe 上面 -->
      <div
        class="cover-disc"
        :class="{ 'cover-disc--spinning': isPlaying }"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const baseUrl = import.meta.env.BASE_URL
const SONG_ID = '399367379'

const isPlaying = ref(true)
const iframeRef = ref(null)

const iframeSrc = computed(() =>
  `https://music.163.com/outchain/player?type=2&id=${SONG_ID}&auto=${isPlaying.value ? 1 : 0}&height=66`
)

function togglePlay() {
  isPlaying.value = !isPlaying.value
  // 强制刷新 iframe
  if (iframeRef.value) {
    iframeRef.value.src = iframeSrc.value
  }
}
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 950;
}

/* 包装器：iframe 在底层，唱片盖在上面 */
.player-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  cursor: pointer;
}

/* iframe 正常大小在底层，唱片遮住它 */
.audio-iframe {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  z-index: 1;
}

/* ---- 封面唱片 ---- */
.cover-disc {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: none;
  padding: 0;
  overflow: hidden;
  z-index: 2;
  pointer-events: none; /* 点击由 .player-wrapper 处理 */
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
  .player-wrapper {
    width: 64px;
    height: 64px;
  }
  .audio-iframe {
    width: 64px;
    height: 64px;
  }
}
</style>
