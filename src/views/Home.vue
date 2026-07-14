<template>
  <div class="home">
    <!-- 首屏：个人介绍区 -->
    <section class="hero container">
      <div class="hero__content">
        <!-- 头像（带渐变光环） -->
        <div class="hero__avatar-wrapper">
          <div class="hero__avatar-ring"></div>
          <div class="hero__avatar">
           <router-link to="/about" ><img src="https://avatars.githubusercontent.com/u/123810227?s=400&u=dc18c53d2bf1c70c82ed586465b384bdf550348f&v=4" alt="头像" class="touxiang" /></router-link> 
          </div>
        </div>

        <!-- 介绍文字 -->
        <h1 class="hero__greeting">你好，我是 <span class="gradient-text">Renque</span> </h1>
        <p class="hero__subtitle"></p>
        <p class="hero__bio">
         动画爱好者 / 技术写作者 / 终身学习者
          <br />
        </p>

        <!-- 操作按钮 -->
        <div class="hero__actions">
          <router-link to="/blog" class="btn-gradient">
             浏览文章
          </router-link>
        <div @click="tranAbout" class="btn-outline">了解更多</div> 
          <router-link to="/about" class="btn-outline">
             了解更多
          </router-link>
        </div>
      </div>

      <!-- 装饰：浮动代码符号 -->
      <div class="hero__decoration">
        <span class="float-code" style="top: 10%; left: 5%; animation-delay: 0s;">{ }</span>
        <span class="float-code" style="top: 20%; right: 8%; animation-delay: 1.5s;">< /></span>
        <span class="float-code" style="bottom: 30%; left: 3%; animation-delay: 3s;">#!</span>
        <span class="float-code" style="bottom: 15%; right: 5%; animation-delay: 4.5s;">()</span>
        <span class="float-code" style="top: 50%; right: 3%; animation-delay: 2s;">[]</span>
      </div>
    </section>

    <!-- 精选文章区 -->
    <section class="featured container">
      <div class="section-header">
        <h2 class="section-title"> 精选文章</h2>
        <p class="section-subtitle">最近发布的几篇文章</p>
        <div class="divider"></div>
      </div>

      <div class="featured__grid">
        <BlogCard
          v-for="(post, index) in featuredPosts"
          :key="post.id"
          :post="post"
          :delay="index"
        />
      </div>

      <!-- 查看更多按钮 -->
      <div class="featured__more">
        <router-link to="/blog" class="btn-outline">
          查看全部文章 →
        </router-link>
      </div>
    </section>

    <!-- 统计数据区 -->
    <section class="stats container">
      <div class="stats__grid">
        <div class="stats__item glass-card">
          <span class="stats__number gradient-text">{{ posts.length }}</span>
          <span class="stats__label">篇文章</span>
        </div>
        <div class="stats__item glass-card">
          <span class="stats__number gradient-text">{{ categories.length }}</span>
          <span class="stats__label">个分类</span>
        </div>
        <div class="stats__item glass-card">
          <span class="stats__number gradient-text">100+</span>
          <span class="stats__label">杯咖啡 </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { posts, getCategories } from '@/data/posts.js'
import BlogCard from '@/components/BlogCard.vue'

import {useRouter} from 'vue-router'
// import { onMounted } from 'vue'

const router =useRouter()
function tranAbout(){
  router.push('/about')
}
// onMounted(()=>{
//   setTimeout(()=>{
//     router.push('/blog')
//   }, 3000)
// })
// 精选文章：取最新的 3 篇
const featuredPosts = computed(() => posts.slice(0, 3))

// 分类列表
const categories = computed(() => getCategories())
</script>

<style scoped>
/* ---- 首屏 ---- */
.touxiang {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
} 
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 70px);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero__content {
  position: relative;
  z-index: 2;
  max-width: 600px;
}

/* 头像 */
.hero__avatar-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 28px;
}

.hero__avatar-ring {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-start), var(--accent-end), var(--accent-glow), var(--accent-start));
  background-size: 300% 300%;
  animation: ringRotate 3s ease-in-out infinite;
  filter: blur(8px);
  opacity: 0.7;
}

@keyframes ringRotate {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero__avatar {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid rgba(102, 126, 234, 0.4);
}

.hero__avatar-emoji {
  font-size: 3rem;
}

/* 文字 */
.hero__greeting {
  font-size: 2.6rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.hero__subtitle {
  font-size: 1.15rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.hero__bio {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.8;
  margin-bottom: 32px;
}

.hero__actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

/* 装饰浮动代码 */
.hero__decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.float-code {
  position: absolute;
  font-family: 'Space Grotesk', monospace;
  font-size: 1.8rem;
  color: rgba(102, 126, 234, 0.15);
  font-weight: 700;
  animation: codeFloat 6s ease-in-out infinite;
}

@keyframes codeFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
  50% { transform: translateY(-15px) rotate(5deg); opacity: 0.6; }
}

/* ---- 精选文章 ---- */
.featured {
  padding: var(--section-gap) 0;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.section-subtitle {
  color: var(--text-secondary);
}

.section-header .divider {
  margin: 16px auto 0;
}

.featured__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}

.featured__more {
  text-align: center;
}

/* ---- 统计数据 ---- */
.stats {
  padding-bottom: var(--section-gap);
}

.stats__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.stats__item {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 28px 16px !important;
  cursor: default !important;
}

.stats__item:hover {
  transform: none !important;
}

.stats__number {
  font-size: 2.2rem;
  font-weight: 700;
}

.stats__label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* 响应式 */
@media (max-width: 768px) {
  .hero__greeting {
    font-size: 2rem;
  }

  .featured__grid {
    grid-template-columns: 1fr;
  }

  .stats__grid {
    grid-template-columns: 1fr;
  }

  .hero__decoration {
    display: none;
  }
}
</style>
