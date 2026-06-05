<template>
  <!-- 音乐播放器：旋转唱片 + 网易云音乐连接 -->
  <div class="music-player" :class="{ 'music-player--active': isOpen }">
    <!-- 唱片（点击切换播放面板） -->
    <button
      class="vinyl-disc"
      :class="{ 'vinyl-disc--spinning': isOpen }"
      @click="togglePlayer"
      :aria-label="isOpen ? '关闭音乐' : '打开音乐'"
      title="点击播放音乐 🎵"
    >
      <!-- 唱片纹理 -->
      <div class="vinyl-grooves"></div>
      <!-- 唱片中心标签 -->
      <div class="vinyl-label">
        <span class="vinyl-label__icon">🎵</span>
        <span class="vinyl-label__text">MUSIC</span>
      </div>
      <!-- 唱臂 -->
      <div class="tonearm" :class="{ 'tonearm--on': isOpen }"></div>
    </button>

    <!-- 音乐播放面板 -->
    <transition name="player-panel">
      <div v-if="isOpen" class="player-panel glass-card">
        <!-- 面板头部 -->
        <div class="player-panel__header">
          <span class="player-panel__title">🎶 正在播放</span>
          <div class="player-panel__actions">
            <!-- 自定义歌曲 ID -->
            <input
              v-model="songIdInput"
              class="player-panel__song-id"
              placeholder="网易云歌曲 ID"
              title="输入网易云音乐歌曲 ID 后按回车"
              @keyup.enter="updateSongId"
            />
            <button class="player-panel__close" @click="togglePlayer" title="关闭">✕</button>
          </div>
        </div>

        <!-- 网易云 iframe 播放器 -->
        <div class="player-panel__iframe-wrapper">
          <iframe
            v-if="currentSongId"
            :key="currentSongId"
            class="player-panel__iframe"
            :src="iframeSrc"
            frameborder="0"
            width="100%"
            height="66"
            allow="autoplay"
          ></iframe>
          <div v-else class="player-panel__empty">
            <p>输入网易云音乐歌曲 ID 来播放</p>
            <p class="player-panel__hint">
              打开网易云网页版 → 歌曲详情页 → 网址中的 id 数字<br />
              <code>https://music.163.com/song?id=<strong>399367379</strong>&uct2=U2FsdGVkX1+i+ldKimAqOP4FH0Qa0HS6IaEr9H8TwMQ=</code>
            </p>
          </div>
        </div>

        <p class="player-panel__tip">
          点击唱片收起面板 · 输入歌曲 ID 按回车切换歌曲
        </p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 默认歌曲 ID（可在此修改）
const DEFAULT_SONG_ID = '399367379' // 默认歌曲

const isOpen = ref(true) // 默认打开播放
const currentSongId = ref(DEFAULT_SONG_ID)
const songIdInput = ref(DEFAULT_SONG_ID)

// 网易云外链播放器 URL
const iframeSrc = computed(() => {
  return `https://music.163.com/outchain/player?type=2&id=${currentSongId.value}&auto=1&height=66`
})

function togglePlayer() {
  isOpen.value = !isOpen.value
}

function updateSongId() {
  const id = songIdInput.value.trim()
  if (id && /^\d+$/.test(id)) {
    currentSongId.value = id
  } else {
    songIdInput.value = currentSongId.value
  }
}
</script>

<style scoped>
/* ---- 容器 ---- */
.music-player {
  position: fixed;
  bottom: 30px;
  left: 30px;
  z-index: 950;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

/* ---- 旋转唱片 ---- */
.vinyl-disc {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #1a1a2e 0deg, #2d2d44 2deg, #1a1a2e 4deg, #2d2d44 6deg,
    #1a1a2e 8deg, #2d2d44 10deg, #1a1a2e 12deg, #2d2d44 14deg,
    #1a1a2e 16deg, #2d2d44 18deg, #1a1a2e 20deg, #2d2d44 22deg,
    #1a1a2e 24deg, #2d2d44 26deg, #1a1a2e 28deg, #2d2d44 30deg,
    #1a1a2e 32deg, #2d2d44 34deg, #1a1a2e 36deg, #2d2d44 38deg,
    #1a1a2e 40deg, #2d2d44 42deg, #1a1a2e 44deg, #2d2d44 46deg,
    #1a1a2e 48deg, #2d2d44 50deg, #1a1a2e 52deg, #2d2d44 54deg,
    #1a1a2e 56deg, #2d2d44 58deg, #1a1a2e 60deg, #2d2d44 62deg,
    #1a1a2e 64deg, #2d2d44 66deg, #1a1a2e 68deg, #2d2d44 70deg,
    #1a1a2e 72deg, #2d2d44 74deg, #1a1a2e 76deg, #2d2d44 78deg,
    #1a1a2e 80deg, #2d2d44 82deg, #1a1a2e 84deg, #2d2d44 86deg,
    #1a1a2e 88deg, #2d2d44 90deg, #1a1a2e 92deg, #2d2d44 94deg,
    #1a1a2e 96deg, #2d2d44 98deg, #1a1a2e 100deg, #2d2d44 102deg,
    #1a1a2e 104deg, #2d2d44 106deg, #1a1a2e 108deg, #2d2d44 110deg,
    #1a1a2e 112deg, #2d2d44 114deg, #1a1a2e 116deg, #2d2d44 118deg,
    #1a1a2e 120deg, #2d2d44 122deg, #1a1a2e 124deg, #2d2d44 126deg,
    #1a1a2e 128deg, #2d2d44 130deg, #1a1a2e 132deg, #2d2d44 134deg,
    #1a1a2e 136deg, #2d2d44 138deg, #1a1a2e 140deg, #2d2d44 142deg,
    #1a1a2e 144deg, #2d2d44 146deg, #1a1a2e 148deg, #2d2d44 150deg,
    #1a1a2e 152deg, #2d2d44 154deg, #1a1a2e 156deg, #2d2d44 158deg,
    #1a1a2e 160deg, #2d2d44 162deg, #1a1a2e 164deg, #2d2d44 166deg,
    #1a1a2e 168deg, #2d2d44 170deg, #1a1a2e 172deg, #2d2d44 174deg,
    #1a1a2e 176deg, #2d2d44 178deg, #1a1a2e 180deg, #2d2d44 182deg,
    #1a1a2e 184deg, #2d2d44 186deg, #1a1a2e 188deg, #2d2d44 190deg,
    #1a1a2e 192deg, #2d2d44 194deg, #1a1a2e 196deg, #2d2d44 198deg,
    #1a1a2e 200deg, #2d2d44 202deg, #1a1a2e 204deg, #2d2d44 206deg,
    #1a1a2e 208deg, #2d2d44 210deg, #1a1a2e 212deg, #2d2d44 214deg,
    #1a1a2e 216deg, #2d2d44 218deg, #1a1a2e 220deg, #2d2d44 222deg,
    #1a1a2e 224deg, #2d2d44 226deg, #1a1a2e 228deg, #2d2d44 230deg,
    #1a1a2e 232deg, #2d2d44 234deg, #1a1a2e 236deg, #2d2d44 238deg,
    #1a1a2e 240deg, #2d2d44 242deg, #1a1a2e 244deg, #2d2d44 246deg,
    #1a1a2e 248deg, #2d2d44 250deg, #1a1a2e 252deg, #2d2d44 254deg,
    #1a1a2e 256deg, #2d2d44 258deg, #1a1a2e 260deg, #2d2d44 262deg,
    #1a1a2e 264deg, #2d2d44 266deg, #1a1a2e 268deg, #2d2d44 270deg,
    #1a1a2e 272deg, #2d2d44 274deg, #1a1a2e 276deg, #2d2d44 278deg,
    #1a1a2e 280deg, #2d2d44 282deg, #1a1a2e 284deg, #2d2d44 286deg,
    #1a1a2e 288deg, #2d2d44 290deg, #1a1a2e 292deg, #2d2d44 294deg,
    #1a1a2e 296deg, #2d2d44 298deg, #1a1a2e 300deg, #2d2d44 302deg,
    #1a1a2e 304deg, #2d2d44 306deg, #1a1a2e 308deg, #2d2d44 310deg,
    #1a1a2e 312deg, #2d2d44 314deg, #1a1a2e 316deg, #2d2d44 318deg,
    #1a1a2e 320deg, #2d2d44 322deg, #1a1a2e 324deg, #2d2d44 326deg,
    #1a1a2e 328deg, #2d2d44 330deg, #1a1a2e 332deg, #2d2d44 334deg,
    #1a1a2e 336deg, #2d2d44 338deg, #1a1a2e 340deg, #2d2d44 342deg,
    #1a1a2e 344deg, #2d2d44 346deg, #1a1a2e 348deg, #2d2d44 350deg,
    #1a1a2e 352deg, #2d2d44 354deg, #1a1a2e 356deg, #2d2d44 358deg
  );
  border: 3px solid #2d2d44;
  box-shadow:
    0 4px 20px rgba(60, 50, 80, 0.25),
    inset 0 0 0 3px rgba(255, 255, 255, 0.05);
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: vinylFloat 3s ease-in-out infinite;
}

.vinyl-disc:hover {
  box-shadow:
    0 8px 30px rgba(255, 133, 162, 0.3),
    inset 0 0 0 3px rgba(255, 255, 255, 0.08);
}

/* 唱片旋转动画 */
.vinyl-disc--spinning {
  animation: vinylSpin 2s linear infinite !important;
}

@keyframes vinylSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes vinylFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

/* 唱片纹理 */
.vinyl-grooves {
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* 唱片中心标签 */
.vinyl-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff85a2, #a78bfa);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 7px;
  color: #efeded;
  white-space: nowrap;
  box-shadow: 0 0 8px rgba(255, 133, 162, 0.4);
}

.vinyl-label__icon {
  font-size: 8px;
  line-height: 1;
}

.vinyl-label__text {
  font-size: 5px;
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 1;
}

/* 唱臂 */
.tonearm {
  position: absolute;
  top: -15px;
  right: 10px;
  width: 28px;
  height: 4px;
  background: linear-gradient(90deg, #555, #888);
  border-radius: 2px;
  transform-origin: right center;
  transform: rotate(-25deg);
  transition: transform 0.4s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.tonearm::after {
  content: '';
  position: absolute;
  right: -4px;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #777;
}

.tonearm--on {
  transform: rotate(-5deg);
}

/* ---- 播放面板 ---- */
.player-panel {
  width: 320px;
  height: auto;
  padding: 20px !important;
  cursor: default !important;
  animation: panelSlideUp 0.3s ease-out;
}

.player-panel:hover {
  transform: none !important;
  box-shadow: var(--shadow-card) !important;
}

@keyframes panelSlideUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 面板过渡 */
.player-panel-enter-active {
  animation: panelSlideUp 0.3s ease-out;
}

.player-panel-leave-active {
  animation: panelSlideUp 0.2s ease-in reverse;
}

.player-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  gap: 10px;
}

.player-panel__title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
}

.player-panel__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.player-panel__song-id {
  width: 90px;
  padding: 4px 10px;
  border: 1px solid rgba(200, 180, 220, 0.4);
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.75rem;
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.6);
  outline: none;
  transition: border-color 0.2s;
}

.player-panel__song-id:focus {
  border-color: var(--accent-start);
}

.player-panel__close {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  background: rgba(200, 180, 220, 0.2);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.player-panel__close:hover {
  background: rgba(255, 133, 162, 0.2);
  color: var(--accent-start);
}

.player-panel__iframe-wrapper {
  border-radius: var(--radius-sm);
  overflow: hidden;
  height: 100px;
  margin-bottom: 10px;
}

.player-panel__iframe {
  display: block;
}

.player-panel__empty {
  text-align: center;
  padding: 20px 0;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.player-panel__hint {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 8px;
  line-height: 1.6;
}

.player-panel__hint code {
  background: rgba(255, 133, 162, 0.1);
  padding: 1px 6px;
  border-radius: 4px;
  font-family: 'Space Grotesk', monospace;
  font-size: 0.72rem;
}

.player-panel__tip {
  font-size: 0.72rem;
  color: var(--text-muted);
  text-align: center;
  opacity: 0.7;
}

/* 响应式 */
@media (max-width: 768px) {
  .music-player {
    bottom: 20px;
    left: 20px;
  }

  .player-panel {
    width: calc(100vw - 60px);
    max-width: 320px;
  }

  .vinyl-disc {
    width: 52px;
    height: 52px;
  }

  .vinyl-label {
    width: 18px;
    height: 18px;
  }
}
</style>
