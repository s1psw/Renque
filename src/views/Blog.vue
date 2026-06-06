<template>
  <div class="blog-page">
    <section class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="page-title">文章列表</h1>
        <p class="page-subtitle">探索所有文章，找到感兴趣的内容</p>
        <div class="divider"></div>
      </div>

      <!-- 分类筛选栏 -->
      <div class="filter-bar">
        <button
          class="filter-btn"
          :class="{ 'filter-btn--active': activeCategory === '全部' }"
          @click="activeCategory = '全部'"
        >
          全部
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-btn"
          :class="{ 'filter-btn--active': activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- 搜索结果条数 -->
      <p class="filter-count">
        共找到 <span class="gradient-text">{{ filteredPosts.length }}</span> 篇文章
      </p>

      <!-- 文章网格 -->
      <div class="blog-grid">
        <BlogCard
          v-for="(post, index) in filteredPosts"
          :key="post.id"
          :post="post"
          :delay="index"
        />
      </div>

      <!-- 空状态 -->
      <div v-if="filteredPosts.length === 0" class="empty-state glass-card">
        <span class="empty-icon"></span>
        <p>该分类下暂无文章</p>
        <button class="btn-outline" @click="activeCategory = '全部'">查看全部文章</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { posts, getCategories } from '@/data/posts.js'
import BlogCard from '@/components/BlogCard.vue'


// 分类列表
const categories = getCategories()

// 当前选中的分类
const activeCategory = ref('全部')

// 按分类筛选文章
const filteredPosts = computed(() => {
  if (activeCategory.value === '全部') {
    return posts
  }
  return posts.filter(p => p.category === activeCategory.value)
})
</script>

<style scoped>
.blog-page {
  padding-top: 40px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
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

/* 筛选栏 */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 24px;
}

.filter-btn {
  padding: 8px 22px;
  border-radius: 50px;
  border: 1px solid rgba(180, 150, 200, 0.35);
  background: rgba(255, 255, 255, 0.3);
  color: var(--text-secondary);
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-btn:hover {
  border-color: var(--accent-start);
  color: var(--accent-start);
  background: rgba(255, 133, 162, 0.06);
}

.filter-btn--active {
  background: linear-gradient(135deg, rgba(255, 133, 162, 0.2), rgba(167, 139, 250, 0.2));
  border-color: rgba(255, 133, 162, 0.4);
  color: var(--accent-start);
  font-weight: 600;
}

.filter-count {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 32px;
}

/* 文章网格 */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 32px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  cursor: default !important;
}

.empty-state:hover {
  transform: none !important;
}

.empty-icon {
  font-size: 3rem;
}

.empty-state p {
  color: var(--text-secondary);
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
}
</style>
