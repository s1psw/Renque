<template>
  <div class="journey-page">
    <!-- 页面标题 -->
    <section class="container">
      <div class="page-header">
        <h1 class="page-title"> 见闻</h1>
        <p class="page-subtitle">记录生活中的点滴发现与感动</p>
        <div class="divider"></div>
      </div>
    </section>

    <!-- 见闻卡片列表 -->
    <section class="journey-list container">
      <article
        v-for="(item, index) in items"
        :key="index"
        class="journey-card glass-card"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="journey-card__header">
          <span class="journey-card__icon">{{ item.icon }}</span>
          <div class="journey-card__meta">
            <span class="journey-card__title">{{ item.title }}</span>
            <time class="journey-card__date">{{ item.date }}</time>
          </div>
        </div>
        <p class="journey-card__content">{{ item.content }}</p>
        <div v-if="item.image" class="journey-card__image">
          <img :src="item.image" :alt="item.title" loading="lazy" />
        </div>
      </article>

      <!-- 空状态 -->
      <div v-if="items.length === 0" class="journey-empty glass-card">
        <span class="journey-empty__icon"></span>
        <p>还没有见闻记录</p>
        <p class="journey-empty__hint">在 src/views/Journey.vue 中添加你的见闻吧~</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 见闻数据（按时间倒序，最新的在前）
const items = ref([
  {
    icon: '',
    title: '博客建成的第一天',
    date: '2026-06-06',
    content: '终于把博客部署上线了。樱花飘落、旋转唱片、日系配色——这就是我想要的样子。从今天开始，这里就是我的数字花园。',
    image: ''
  },
  {
    icon: '',
    title: '夏天的第一场雨',
    date: '2026-06-05',
    content: '窗外突然下起了大雨，空气里弥漫着泥土的清香。泡了杯热茶，听着雨声写代码，这样安静的下午真好。',
    image: ''
  },
  {
    icon: '',
    title: '找到了很棒的BGM',
    date: '2026-06-04',
    content: '在网易云上偶然听到一首纯音乐，旋律温柔得像春日午后的阳光。已经设为博客的背景音乐了，希望来访的人也会喜欢。',
    image: ''
  },
  {
    icon: '',
    title: '发现了宝藏咖啡馆',
    date: '2026-06-03',
    content: '学校附近新开了一家猫咪主题咖啡馆，里面的猫都很亲人。坐在窗边写代码，偶尔摸摸猫，效率反而更高了。',
    image: ''
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

/* ---- 卡片列表 ---- */
.journey-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 680px;
  margin: 0 auto;
}

.journey-card {
  padding: 28px !important;
  animation: fadeInUp 0.6s ease-out both;
  cursor: default !important;
}

.journey-card:hover {
  transform: none !important;
  box-shadow: var(--shadow-card) !important;
}

.journey-card__header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
}

.journey-card__icon {
  font-size: 2rem;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 133, 162, 0.12), rgba(167, 139, 250, 0.1));
}

.journey-card__meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.journey-card__title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
}

.journey-card__date {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.journey-card__content {
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.8;
  margin: 0;
}

.journey-card__image {
  margin-top: 16px;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.journey-card__image img {
  width: 100%;
  display: block;
  border-radius: var(--radius-md);
}

/* ---- 空状态 ---- */
.journey-empty {
  text-align: center;
  padding: 60px 32px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: default !important;
}

.journey-empty:hover {
  transform: none !important;
}

.journey-empty__icon {
  font-size: 3rem;
  opacity: 0.4;
}

.journey-empty p {
  color: var(--text-secondary);
}

.journey-empty__hint {
  font-size: 0.85rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .journey-card {
    padding: 20px !important;
  }
}
</style>
