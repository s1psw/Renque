<template>
  <!-- 音乐播放器：极简封面唱片 -->
  <div class="music-player">
    <!-- 隐藏的 iframe 播放器 -->
    <iframe
      v-show="false"
      ref="iframeRef"
      :src="iframeSrc"
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
      <!-- 封面图片（全覆盖） -->
      <img
        v-if="coverUrl"
        :src="coverUrl"
        class="cover-disc__img"
        alt="专辑封面"
      />
      <!-- 加载中占位 -->
      <div v-else class="cover-disc__placeholder">
        <span>🎵</span>
      </div>
      <!-- 唱臂 -->
      <div class="tonearm" :class="{ 'tonearm--on': isPlaying }"></div>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const DEFAULT_SONG_ID = '399367379'

const isPlaying = ref(true)
const currentSongId = ref(DEFAULT_SONG_ID)
const coverUrl = ref('')
const iframeRef = ref(null)

// 网易云外链播放器 URL
const iframeSrc = computed(() => {
  return `https://music.163.com/outchain/player?type=2&id=${currentSongId.value}&auto=1&height=66`
})

// 获取歌曲封面
async function fetchCover(songId) {
  try {
    const res = await fetch(
      `https://api.uomg.com/api/netease.song?id=${songId}`
    )
    const json = await res.json()
    if (json.code === 1 && json.data && json.data.cover) {
      coverUrl.value = json.data.cover
    }
  } catch {
    // 获取失败使用默认占位
    coverUrl.value = ''
  }
}

function togglePlay() {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    // 重新加载 iframe 以恢复播放
    if (iframeRef.value) {
      iframeRef.value.src = iframeSrc.value
    }
  } else {
    // 清空 iframe 停止播放
    if (iframeRef.value) {
      iframeRef.value.src = ''
    }
  }
}

onMounted(() => {
  fetchCover(currentSongId.value)
})

// 当歌曲 ID 变化时重新获取封面
watch(currentSongId, (id) => {
  fetchCover(id)
})
</script>

<style scoped>
/* ---- 容器 ---- */
.music-player {
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 950;
}

/* ---- 封面唱片 ---- */
.cover-disc {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  box-shadow:
    0 4px 24px rgba(100, 80, 120, 0.3),
    0 0 0 4px rgba(255, 255, 255, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: coverFloat 3s ease-in-out infinite;
  background: #1a1a2e;
}

.cover-disc:hover {
  box-shadow:
    0 8px 36px rgba(255, 133, 162, 0.4),
    0 0 0 4px rgba(255, 255, 255, 0.7);
}

/* 封面图片全覆盖 */
.cover-disc__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 加载中占位 */
.cover-disc__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #2d1b3d, #1a1a2e);
  font-size: 28px;
}

/* 旋转动画 */
.cover-disc--spinning {
  animation: coverSpin 3s linear infinite !important;
}

@keyframes coverSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes coverFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(0deg); }
}

/* 唱臂 */
.tonearm {
  position: absolute;
  top: -18px;
  right: -2px;
  width: 34px;
  height: 4px;
  background: linear-gradient(90deg, #999, #bbb);
  border-radius: 2px;
  transform-origin: right center;
  transform: rotate(-30deg);
  transition: transform 0.5s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
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
  background: #aaa;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
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
