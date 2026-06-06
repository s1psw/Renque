<template>
  <div class="journey-page">
    <section class="container">
      <div class="page-header">
        <h1 class="page-title"> 见闻</h1>
        <p class="page-subtitle">从2026开始，用镜头记录生活的温度</p>
        <div class="divider"></div>
      </div>
    </section>

    <!-- Tag 筛选 -->
    <div class="filter-bar container">
      <button
        class="filter-btn"
        :class="{ 'filter-btn--active': activeTag === '全部' }"
        @click="switchTag('全部')"
      >全部</button>
      <button
        v-for="tag in allTags"
        :key="tag"
        class="filter-btn"
        :class="{ 'filter-btn--active': activeTag === tag }"
        @click="switchTag(tag)"
      >{{ tag }}</button>
    </div>

    <p class="filter-count container">
      共 <span class="gradient-text">{{ filteredItems.length }}</span> 条见闻
      <template v-if="totalPages > 1"> · 第 {{ currentPage }} / {{ totalPages }} 页</template>
    </p>

    <!-- 双列瀑布流：左右独立堆叠，无空位 -->
    <section class="journey-grid container">
      <!-- 左列 -->
      <div class="journey-col">
        <article
          v-for="(item, index) in leftCol"
          :key="'L' + index"
          class="journal-card"
          :style="{ animationDelay: `${(index % 8) * 0.1}s` }"
        >
          <div class="journal-card__image">
            <img v-if="item.image" :src="item.image" :alt="item.title" loading="lazy" />
            <div v-else class="journal-card__placeholder"><span class="journal-card__placeholder-icon"></span></div>
            <span class="journal-card__date-tag">{{ item.date }}</span>
          </div>
          <div class="journal-card__caption">
            <h3 class="journal-card__title">{{ item.title }}</h3>
            <p v-if="item.content" class="journal-card__text">{{ item.content }}</p>
            <div v-if="item.location" class="journal-card__location">{{ item.location }}</div>
            <div v-if="item.tags" class="journal-card__tags">
              <span v-for="t in item.tags" :key="t" class="journal-card__tag">{{ t }}</span>
            </div>
          </div>
        </article>
      </div>
      <!-- 右列 -->
      <div class="journey-col">
        <article
          v-for="(item, index) in rightCol"
          :key="'R' + index"
          class="journal-card"
          :style="{ animationDelay: `${(index % 8) * 0.1 + 0.05}s` }"
        >
          <div class="journal-card__image">
            <img v-if="item.image" :src="item.image" :alt="item.title" loading="lazy" />
            <div v-else class="journal-card__placeholder"><span class="journal-card__placeholder-icon"></span></div>
            <span class="journal-card__date-tag">{{ item.date }}</span>
          </div>
          <div class="journal-card__caption">
            <h3 class="journal-card__title">{{ item.title }}</h3>
            <p v-if="item.content" class="journal-card__text">{{ item.content }}</p>
            <div v-if="item.location" class="journal-card__location">{{ item.location }}</div>
            <div v-if="item.tags" class="journal-card__tags">
              <span v-for="t in item.tags" :key="t" class="journal-card__tag">{{ t }}</span>
            </div>
          </div>
        </article>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredItems.length === 0" class="journey-empty glass-card">
        <span class="journey-empty__icon"></span>
        <p>该分类下暂无见闻</p>
        <button class="btn-outline" @click="activeTag = '全部'">查看全部</button>
      </div>
    </section>

    <!-- 分页 -->
    <nav v-if="totalPages > 1" class="pagination container">
      <button
        class="page-btn"
        :disabled="currentPage === 1"
        @click="currentPage = 1"
      >首页</button>
      <button
        class="page-btn"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >← 上一页</button>

      <span
        v-for="p in visiblePages"
        :key="p"
        class="page-num"
        :class="{ 'page-num--active': p === currentPage, 'page-num--ellipsis': p === '...' }"
        @click="p !== '...' && (currentPage = p)"
      >{{ p }}</span>

      <button
        class="page-btn"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >下一页 →</button>
      <button
        class="page-btn"
        :disabled="currentPage === totalPages"
        @click="currentPage = totalPages"
      >末页</button>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const PAGE_SIZE = 8
const activeTag = ref('全部')
const currentPage = ref(1)

const items = ref([
  {
    date: '2026.05.30',
    title: '晚上一口气追完剧场版，不错',
    image: '/img/4.jpg',
    location: ' 佐贺偶像是传奇',
    tags: ['ACG']
  },
   {
    date: '2025.11.29',
    title: '8h推完，茉子可爱',
    image: '/img/11.jpg',
    location: ' 千恋万花',
    tags: ['ACG']
  },
   {
    date: '2025.12.10',
    title: '嘿嘿',
    image: '/img/12.jpg',
    location: ' 近月少女的礼仪',
    tags: ['ACG']
  },
  {
    date: '2026.05.01',
    title: '大连旅游。',
    image: '/img/2.jpg',
    location: ' 大连',
    tags: ['旅游']
  },
    {
    date: '2025.10.02',
    title: '冰雪大世界',
    image: '/img/13.jpg',
    location: ' 哈尔滨',
    tags: ['旅游']
  },
  {
    date: '2026.03.26',
    title: '藤本树太不是人了，，，',
    image: '/img/3.jpg',
    location: ' 炎拳',
    tags: ['ACG']
  },
    {
    date: '2025.12.09',
    title: '午休时间追完，喜欢',
    image: '/img/17.jpg',
    location: ' 电锯人',
    tags: ['ACG']
  },
  {
    date: '2026.03.06',
    title: '玩到了新游戏，艾米莉可爱，生9好玩',
    image: '/img/1.jpg',
    location: ' 生化危机9',
    tags: ['游戏']
  },
   {
    date: '2025.10.05',
    title: '神作',
    image: '/img/14.jpg',
    location: '最后生还者',
    tags: ['游戏']
  },
    {
    date: '2025.12.01',
    title: '大家一起',
    image: '/img/16.jpg',
    location: 'VRC',
    tags: ['游戏']
  },
  {
    date: '2026.02.28',
    title: '来BLG基地参观。',
    image: '/img/6.jpg',
    location: ' BLG',
    tags: ['旅游']
  },
  {
    date: '2026.02.28',
    title: '上海赏樱',
    image: '/img/7.jpg',
    location: ' 上海',
    tags: ['旅游']
  },
  {
    date: '2026.02.21',
    title: '来看新年电影',
    image: '/img/9.jpg',
    location: ' 家',
    tags: ['日常']
  },
    {
    date: '2026.02.21',
    title: '第一次和家人看看水族馆',
    image: '/img/15.jpg',
    location: ' 水族馆',
    tags: ['日常']
  },
   {
    date: '2025.09.27',
    title: '来凑凑热闹',
    image: '/img/10.jpg',
    location: ' 国际文化节',
    tags: ['日常']
  },
  {
    date: '2026.02.07',
    title: '鸣潮3.1太强了，新的高峰',
    image: '/img/5.jpg',
    location: ' 鸣潮',
    tags: ['游戏']
  },
  {
    date: '2026.01.04',
    title: '看夜上海',
    image: '/img/8.jpg',
    location: ' 上海',
    tags: ['旅游']
  }
])

// 所有 tag
const allTags = computed(() => {
  const set = new Set()
  items.value.forEach(i => (i.tags || []).forEach(t => set.add(t)))
  return [...set]
})

// 按时间降序排列
const sortedItems = computed(() => {
  return [...items.value].sort((a, b) => b.date.localeCompare(a.date))
})

// tag 筛选
const filteredItems = computed(() => {
  if (activeTag.value === '全部') return sortedItems.value
  return sortedItems.value.filter(i => (i.tags || []).includes(activeTag.value))
})

// 总分页
const totalPages = computed(() => Math.ceil(filteredItems.value.length / PAGE_SIZE))

// 当前页卡片
const pageItems = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredItems.value.slice(start, start + PAGE_SIZE)
})

// 左右分列（交替分配，左右独立堆叠无空位）
const leftCol = computed(() => pageItems.value.filter((_, i) => i % 2 === 0))
const rightCol = computed(() => pageItems.value.filter((_, i) => i % 2 === 1))

// 可见页码
const visiblePages = computed(() => {
  const total = totalPages.value
  const cur = currentPage.value
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = []
  pages.push(1)
  if (cur > 3) pages.push('...')

  const start = Math.max(2, cur - 1)
  const end = Math.min(total - 1, cur + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (cur < total - 2) pages.push('...')
  pages.push(total)
  return pages
})

// 切换 tag 时重置到第一页
function switchTag(tag) {
  activeTag.value = tag
  currentPage.value = 1
}
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

/* ---- 筛选栏 ---- */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
  max-width: 900px;
}
.filter-btn {
  padding: 6px 18px;
  border-radius: 50px;
  border: 1px solid rgba(180, 150, 200, 0.3);
  background: rgba(255, 255, 255, 0.3);
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.filter-btn:hover {
  border-color: var(--accent-start);
  color: var(--accent-start);
}
.filter-btn--active {
  background: linear-gradient(135deg, rgba(255, 133, 162, 0.18), rgba(167, 139, 250, 0.15));
  border-color: rgba(255, 133, 162, 0.35);
  color: var(--accent-start);
  font-weight: 600;
}
.filter-count {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.85rem;
  margin-bottom: 24px;
}

/* ---- 双列瀑布流：左右独立堆叠 ---- */
.journey-grid {
  display: flex;
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
  align-items: flex-start;
}
.journey-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.journal-card {
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

.journal-card__image {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #f0e6f6, #e8f0f8, #fce4ec);
  min-height: 200px;
}
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
.journal-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}
.journal-card__tag {
  font-size: 0.72rem;
  padding: 2px 10px;
  border-radius: 10px;
  background: rgba(255, 133, 162, 0.08);
  color: var(--accent-start);
}

.journey-empty {
  text-align: center;
  padding: 80px 32px !important;
  max-width: 400px;
  margin: 0 auto;
  cursor: default !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.journey-empty:hover {
  transform: none !important;
}
.journey-empty__icon {
  font-size: 3rem;
  opacity: 0.3;
}
.journey-empty p {
  color: var(--text-secondary);
}

/* ---- 分页 ---- */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.page-btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(180, 150, 200, 0.25);
  background: rgba(255, 255, 255, 0.3);
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.82rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.page-btn:hover:not(:disabled) {
  border-color: var(--accent-start);
  color: var(--accent-start);
}
.page-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.page-num {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  user-select: none;
}
.page-num:hover {
  background: rgba(255, 133, 162, 0.08);
  color: var(--accent-start);
}
.page-num--active {
  background: linear-gradient(135deg, var(--accent-start), var(--accent-end));
  color: #fff;
  font-weight: 600;
}
.page-num--ellipsis {
  cursor: default;
  pointer-events: none;
  opacity: 0.4;
}

/* 响应式 */
@media (max-width: 768px) {
  .journey-grid {
    flex-direction: column;
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
  .page-btn {
    padding: 6px 12px;
    font-size: 0.78rem;
  }
  .page-num {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }
}
</style>
