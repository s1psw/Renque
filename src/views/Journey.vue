<template>
  <div class="journey-page">
    <section class="container">
      <div class="page-header">
        <h1 class="page-title"> 见闻</h1>
        <p class="page-subtitle">用镜头记录生活的温度</p>
        <div class="divider"></div>
      </div>
    </section>

    <!-- 图片主导的瀑布流 -->
    <section class="journey-grid container">
      <article
        v-for="(item, index) in items"
        :key="index"
        class="journal-card"
        :class="{ 'journal-card--tall': index % 3 === 1 }"
        :style="{ animationDelay: `${index * 0.12}s` }"
      >
        <!-- 图片主体 -->
        <div class="journal-card__image">
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.title"
            loading="lazy"
          />
          <div v-else class="journal-card__placeholder">
            <span class="journal-card__placeholder-icon"></span>
          </div>

          <!-- 图片上的日期标签 -->
          <span class="journal-card__date-tag">{{ item.date }}</span>
        </div>

        <!-- 文字说明层 -->
        <div class="journal-card__caption">
          <h3 class="journal-card__title">{{ item.title }}</h3>
          <p class="journal-card__text">{{ item.content }}</p>

          <!-- 地点/标签 -->
          <div v-if="item.location" class="journal-card__location">
            {{ item.location }}
          </div>
        </div>
      </article>

      <!-- 空状态 -->
      <div v-if="items.length === 0" class="journey-empty glass-card">
        <span class="journey-empty__icon"></span>
        <p>还没有见闻记录</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  {
    title: '博客建成的第一天',
    date: '2026.06.06',
    content: '樱花飘落、旋转唱片、日系配色——从今天开始，这里就是我的数字花园。',
    image: '',
    location: ' 家中'
  },
  {
    title: '夏天的第一场雨',
    date: '2026.06.05',
    content: '窗外突然下起了大雨，空气里弥漫着泥土的清香。泡了杯热茶，听着雨声写代码。',
    image: '',
    location: ' 窗边'
  },
  {
    title: '找到了很棒的BGM',
    date: '2026.06.04',
    content: '旋律温柔得像春日午后的阳光，已设为博客背景音乐。',
    image: '',
    location: ' 网易云音乐'
  },
  {
    title: '发现了宝藏咖啡馆',
    date: '2026.06.03',
    content: '猫咪很亲人，坐在窗边写代码，偶尔摸摸猫，效率反而更高了。',
    image: '',
    location: '☕ 猫咪咖啡馆'
  }
])
</script>

<style scoped>
.journey-page {
  padding-top: 40px;
  padding-bottom: var(--section-gap);
}

.page-header {
  text-align: center;
  margin-bottom: 48px;
}
.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
}
.page-subtitle {
  color: var(--text-secondary);
}
.page-header .divider {
  margin: 16px auto 0;
}

/* ---- 瀑布流网格 ---- */
.journey-grid {
  columns: 2;
  column-gap: 20px;
  max-width: 900px;
  margin: 0 auto;
}

/* ---- 卡片 ---- */
.journal-card {
  break-inside: avoid;
  margin-bottom: 20px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  animation: fadeInUp 0.6s ease-out both;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.journal-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 40px rgba(160, 130, 180, 0.2);
}

/* ---- 图片区 ---- */
.journal-card__image {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #f0e6f6, #e8f0f8, #fce4ec);
  min-height: 200px;
}

/* 高卡片加大图片区 */
.journal-card--tall .journal-card__image {
  min-height: 320px;
}

.journal-card__image img {
  width: 100%;
  display: block;
  object-fit: cover;
  min-height: 200px;
  transition: transform 0.5s ease;
}

.journal-card--tall .journal-card__image img {
  min-height: 320px;
}

.journal-card:hover .journal-card__image img {
  transform: scale(1.03);
}

/* 无图片时的占位 */
.journal-card__placeholder {
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255,133,162,0.08), rgba(167,139,250,0.08));
}
.journal-card--tall .journal-card__placeholder {
  min-height: 320px;
}
.journal-card__placeholder-icon {
  font-size: 2.5rem;
  opacity: 0.2;
}

/* 日期标签 */
.journal-card__date-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-family: 'Space Grotesk', monospace;
  font-weight: 500;
  color: #fff;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  letter-spacing: 0.03em;
}

/* ---- 文字说明 ---- */
.journal-card__caption {
  padding: 18px 20px 20px;
}

.journal-card__title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 6px;
  line-height: 1.3;
}

.journal-card__text {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

.journal-card__location {
  margin-top: 10px;
  font-size: 0.8rem;
  color: var(--accent-start);
  font-weight: 500;
}

/* ---- 空状态 ---- */
.journey-empty {
  text-align: center;
  padding: 80px 32px !important;
  max-width: 400px;
  margin: 0 auto;
  cursor: default !important;
}
.journey-empty:hover {
  transform: none !important;
}
.journey-empty__icon {
  font-size: 3rem;
  opacity: 0.3;
  display: block;
  margin-bottom: 8px;
}
.journey-empty p {
  color: var(--text-secondary);
}

/* 响应式 */
@media (max-width: 768px) {
  .journey-grid {
    columns: 1;
    max-width: 500px;
  }
  .journal-card--tall .journal-card__image,
  .journal-card__image {
    min-height: 220px;
  }
  .journal-card--tall .journal-card__image img,
  .journal-card__image img {
    min-height: 220px;
  }
  .journal-card--tall .journal-card__placeholder,
  .journal-card__placeholder {
    min-height: 220px;
  }
  .journal-card__caption {
    padding: 14px 16px 16px;
  }
}
</style>
