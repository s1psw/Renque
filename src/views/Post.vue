<template>
  <div class="post-page">
    <!-- 文章加载失败 -->
    <div v-if="!post" class="not-found container">
      <div class="not-found__card glass-card">
        <span class="not-found__icon"></span>
        <h2>文章未找到</h2>
        <p>你访问的文章可能不存在或已被移除。</p>
        <router-link to="/blog" class="btn-gradient">← 返回文章列表</router-link>
      </div>
    </div>

    <!-- 文章内容 -->
    <template v-else>
      <!-- 文章头部 -->
      <header class="post-header container">
        <!-- 樱花装饰 -->
        <div class="post-header__sakura-left">🌸</div>
        <div class="post-header__sakura-right">🌸</div>
        

        <router-link to="/blog" class="post-header__back">
          ← 返回列表
        </router-link>

        <span class="tag post-header__category">{{ post.category }}</span>
        <h1 class="post-header__title">{{ post.title }}</h1>

        <div class="post-header__meta">
          <time :datetime="post.date"> {{ post.date }}</time>
          <span class="meta-sep">·</span>
          <span>Renque</span>
          <span class="meta-sep">·</span>
          <span>约 {{ readingTime }} 分钟阅读</span>
        </div>

        <!-- 标签 -->
        <div class="post-header__tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </header>

      <!-- 文章正文 -->
      <article class="post-body container">
        <div class="post-body__card glass-card">
          <div class="post-content" v-html="renderedContent"></div>
        </div>
      </article>

      <!-- 文章导航 -->
      <nav class="post-nav container">
        <router-link
          v-if="prevPost"
          :to="`/blog/${prevPost.id}`"
          class="post-nav__link glass-card"
        >
          <span class="post-nav__label">← 上一篇</span>
          <span class="post-nav__title">{{ prevPost.title }}</span>
        </router-link>
        <div v-else class="post-nav__link post-nav__link--disabled"></div>

        <router-link
          v-if="nextPost"
          :to="`/blog/${nextPost.id}`"
          class="post-nav__link glass-card post-nav__link--next"
        >
          <span class="post-nav__label">下一篇 →</span>
          <span class="post-nav__title">{{ nextPost.title }}</span>
        </router-link>
      </nav>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { posts, getPostById } from '@/data/posts.js'

const route = useRoute()

// 根据路由参数获取文章
const post = computed(() => getPostById(route.params.id))

// 估算阅读时间（中文约 400 字/分钟）
const readingTime = computed(() => {
  if (!post.value) return 1
  const charCount = post.value.content.replace(/\s/g, '').length
  return Math.max(1, Math.ceil(charCount / 400))
})

// 简单的 Markdown 渲染（按块级元素分段处理，避免嵌套 <p> 问题）
const renderedContent = computed(() => {
  if (!post.value) return ''
  const text = post.value.content

  // 行内处理：加粗、行内代码
  function renderInline(str) {
    return str
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  }

  // 先提取代码块，用占位符替换，避免内部被处理
  const codeBlocks = []
  let processed = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    codeBlocks.push(`<pre class="code-block"><code>${code.trim()}</code></pre>`)
    return `%%CODEBLOCK_${codeBlocks.length - 1}%%`
  })

  // 按双换行分割为块
  const blocks = processed.split(/\n\n+/).filter(b => b.trim())

  const htmlBlocks = blocks.map(block => {
    const lines = block.split('\n')
    const firstLine = lines[0].trim()

    // 标题
    if (/^###\s/.test(firstLine)) {
      return `<h3>${renderInline(firstLine.replace(/^###\s+/, ''))}</h3>`
    }
    if (/^##\s/.test(firstLine)) {
      return `<h2>${renderInline(firstLine.replace(/^##\s+/, ''))}</h2>`
    }

    // 无序列表（以 - 开头）
    if (/^-\s/.test(firstLine)) {
      const items = lines
        .filter(l => /^-\s/.test(l.trim()))
        .map(l => `<li>${renderInline(l.trim().replace(/^-\s+/, ''))}</li>`)
      return `<ul>${items.join('')}</ul>`
    }

    // 有序列表（以数字. 开头）
    if (/^\d+\.\s/.test(firstLine)) {
      const items = lines
        .filter(l => /^\d+\.\s/.test(l.trim()))
        .map(l => `<li>${renderInline(l.trim().replace(/^\d+\.\s+/, ''))}</li>`)
      return `<ol>${items.join('')}</ol>`
    }

    // 普通段落：合并多行并用 <br> 连接
    const content = lines.map(l => renderInline(l.trim())).join('<br />')
    return `<p>${content}</p>`
  })

  // 还原代码块占位符
  let result = htmlBlocks.join('')
  codeBlocks.forEach((code, i) => {
    result = result.replace(`%%CODEBLOCK_${i}%%`, code)
  })

  return result
})

// 上一篇 / 下一篇
const prevPost = computed(() => {
  if (!post.value) return null
  const idx = posts.findIndex(p => p.id === post.value.id)
  return idx > 0 ? posts[idx - 1] : null
})

const nextPost = computed(() => {
  if (!post.value) return null
  const idx = posts.findIndex(p => p.id === post.value.id)
  return idx < posts.length - 1 ? posts[idx + 1] : null
})
</script>

<style scoped>
.post-page {
  padding-top: 40px;
  padding-bottom: var(--section-gap);
}

/* ---- 未找到 ---- */
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.not-found__card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 420px;
}

.not-found__icon {
  font-size: 4rem;
}

.not-found h2 {
  font-size: 1.5rem;
}

.not-found p {
  color: var(--text-secondary);
  margin-bottom: 8px;
}

/* ---- 文章头部 ---- */
.post-header {
  max-width: 800px;
  margin: 0 auto 32px;
  text-align: center;
  position: relative;
}

/* 樱花装饰 */
.post-header__sakura-left,
.post-header__sakura-right {
  position: absolute;
  top: -10px;
  font-size: 2.5rem;
  opacity: 0.25;
  pointer-events: none;
  animation: sakuraBounce 3s ease-in-out infinite;
}
.post-header__sakura-left {
  left: -40px;
  animation-delay: 0s;
}
.post-header__sakura-right {
  right: -40px;
  animation-delay: 1.5s;
}

.post-header__sparkle {
  position: absolute;
  top: 60px;
  right: -20px;
  font-size: 1.5rem;
  opacity: 0.3;
  pointer-events: none;
  animation: sparkleFloat 2.5s ease-in-out infinite;
}

@keyframes sakuraBounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(15deg); }
}

@keyframes sparkleFloat {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.2; }
  50% { transform: scale(1.3) rotate(180deg); opacity: 0.45; }
}

.post-header__back {
  display: inline-block;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 20px;
  transition: color var(--transition-fast);
}

.post-header__back:hover {
  color: var(--accent-start);
}

.post-header__category {
  margin-bottom: 16px;
}

.post-header__title {
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 16px;
}

.post-header__meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 0.9rem;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.meta-sep {
  color: var(--text-muted);
  opacity: 0.5;
}

.post-header__tags {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

/* ---- 文章正文 ---- */
.post-body {
  max-width: 800px;
  margin: 0 auto 48px;
}

.post-body__card {
  cursor: default !important;
}

.post-body__card:hover {
  transform: none !important;
}

/* 文章内容样式 */
.post-content :deep(h2) {
  font-size: 1.6rem;
  font-weight: 600;
  margin: 36px 0 16px;
  color: var(--text-primary);
  border-left: 4px solid var(--accent-start);
  padding-left: 16px;
}

.post-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 28px 0 12px;
  color: var(--text-primary);
}

.post-content :deep(p) {
  color: var(--text-secondary);
  line-height: 1.9;
  margin-bottom: 16px;
  font-size: 1.02rem;
}

.post-content :deep(strong) {
  color: var(--text-primary);
  font-weight: 600;
}

.post-content :deep(.code-block) {
  background: rgba(60, 45, 70, 0.06);
  border: 1px solid rgba(180, 150, 200, 0.2);
  border-radius: var(--radius-md);
  padding: 20px 24px;
  overflow-x: auto;
  margin: 20px 0;
  font-family: 'Space Grotesk', 'Noto Sans SC', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #4a3f5c;
}

.post-content :deep(.inline-code) {
  background: rgba(255, 133, 162, 0.12);
  color: #c94d6e;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'Space Grotesk', monospace;
  font-size: 0.9em;
  border: 1px solid rgba(255, 133, 162, 0.15);
}

.post-content :deep(ul) {
  list-style: none;
  padding-left: 0;
  margin: 16px 0;
}

.post-content :deep(li) {
  color: var(--text-secondary);
  padding: 4px 0 4px 24px;
  position: relative;
}

.post-content :deep(li::before) {
  content: '▸';
  position: absolute;
  left: 4px;
  color: var(--accent-start);
  font-size: 0.8rem;
}

.post-content :deep(br) {
  display: block;
  content: '';
  margin-top: 4px;
}

/* ---- 文章导航 ---- */
.post-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: 800px;
}

.post-nav__link {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-decoration: none;
  transition: all var(--transition-normal);
}

.post-nav__link--disabled {
  visibility: hidden;
}

.post-nav__link--next {
  text-align: right;
}

.post-nav__label {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.post-nav__title {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.95rem;
  line-height: 1.4;
  /* 最多两行 */
  display: -webkit-box;
  /* -webkit-line-clamp: 2; */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .post-header__title {
    font-size: 1.8rem;
  }

  .post-nav {
    grid-template-columns: 1fr;
  }

  .post-nav__link--next {
    text-align: left;
  }
}
</style>
