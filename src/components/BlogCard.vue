<template>
  <!-- 博客文章卡片：玻璃态 + 悬浮效果 -->
  <article
    class="blog-card glass-card"
    :style="{ animationDelay: `${delay * 0.1}s` }"
    @click="$router.push(`/blog/${post.id}`)"
  >
    <!-- 分类标签 -->
    <span class="blog-card__category tag">{{ post.category }}</span>

    <!-- 标题 -->
    <h3 class="blog-card__title">
      <router-link :to="`/blog/${post.id}`">{{ post.title }}</router-link>
    </h3>

    <!-- 摘要 -->
    <p class="blog-card__excerpt">{{ post.excerpt }}</p>

    <!-- 底部信息：日期 + 标签 -->
    <div class="blog-card__footer">
      <time class="blog-card__date" :datetime="post.date">
        📅 {{ post.date }}
      </time>
      <div class="blog-card__tags">
        <span v-for="tag in post.tags" :key="tag" class="blog-card__tag">{{ tag }}</span>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  },
  delay: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
.blog-card {
  cursor: pointer;
  animation: fadeInUp 0.6s ease-out both;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.blog-card__category {
  align-self: flex-start;
}

.blog-card__title {
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.4;
}

.blog-card__title a {
  color: var(--text-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.blog-card__title a:hover {
  color: var(--accent-start);
}

.blog-card__excerpt {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
  /* 最多显示三行 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.blog-card__date {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.blog-card__tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.blog-card__tag {
  font-size: 0.78rem;
  color: var(--accent-start);
  background: rgba(102, 126, 234, 0.12);
  padding: 2px 10px;
  border-radius: 12px;
}
</style>
