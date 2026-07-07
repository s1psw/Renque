<template>
  <div class="about-page">
    <!-- 页面标题 -->
    <section class="container">
      <div class="page-header">
        <h1 class="page-title">关于我</h1>
        <p class="page-subtitle">一个热爱动画与创作的普通人</p>
        <div class="divider"></div>
      </div>
    </section>

    <!-- 个人信息卡片 -->
    <section class="about-intro container">
      <div class="about-intro__card glass-card">
        <!-- 头像 -->
        <div class="about-intro__avatar">
          <img src="https://avatars.githubusercontent.com/u/123810227?s=400&u=dc18c53d2bf1c70c82ed586465b384bdf550348f&v=4" class="touxiang" />
        </div>

        <div class="about-intro__info">
          <h2>认却 <span class="gradient-text">Renque</span></h2>
          <p class="about-intro__role">动画爱好者 · 学生 · 开发学习者</p>
          <p class="about-intro__bio">
            拥有 0 年以上 Web 开发经验，专注于 Vue.js 生态与前端工程化。
            热衷于将复杂的技术概念转化为通俗易懂的文字，帮助更多开发者成长。
            
          </p>

          <!-- 社交按钮 -->
          <div class="about-intro__social">
            <a href="https://github.com/s1psw" target="_blank" rel="noopener" class="btn-outline">
               GitHub
            </a>
            <a href="mailto:hello@3284729638@qq.com" class="btn-outline">
               联系我
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 技能区 -->
    <section class="skills container">
      <h2 class="section-title"> 技术</h2>
      <div class="divider"></div>

      <div class="skills__grid">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="skills__item glass-card"
        >
          <div class="skills__header">
            <span class="skills__icon">{{ skill.icon }}</span>
            <span class="skills__name">{{ skill.name }}</span>
            <span class="skills__level">{{ skill.level }}%</span>
          </div>
          <!-- 渐变进度条 -->
          <div class="skills__bar">
            <div
              class="skills__bar-fill"
              :style="{ width: skill.level + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 经历时间线 -->
    <section class="timeline container">
      <h2 class="section-title"> 经历</h2>
      <div class="divider"></div>

      <div class="timeline__list">
        <div
          v-for="(item, index) in timeline"
          :key="index"
          class="timeline__item"
        >
          <div class="timeline__node">
            <div class="timeline__dot"></div>
            <div v-if="index < timeline.length - 1" class="timeline__line"></div>
          </div>
          <div class="timeline__card glass-card">
            <span class="timeline__period tag">{{ item.period }}</span>
            <h3 class="timeline__title">{{ item.title }}</h3>
            <p class="timeline__org">{{ item.org }}</p>
            <p class="timeline__desc">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 友链 -->
    <section class="friends container">
      <h2 class="section-title"> 友链</h2>
      <div class="divider"></div>
      <p class="friends__desc">一些有趣的人和网站，欢迎交换友链~</p>

      <div class="friends__grid">
        <a
          v-for="friend in friends"
          :key="friend.name"
          :href="friend.url"
          target="_blank"
          rel="noopener"
          class="friend-card glass-card"
        >
          <div class="friend-card__avatar">
            <img v-if="friend.avatar" :src="friend.avatar" :alt="friend.name" class="friend-card__avatar-img" />
            <span v-else class="friend-card__avatar-emoji">🔗</span>
          </div>
          <div class="friend-card__info">
            <span class="friend-card__name">{{ friend.name }}</span>
            <span class="friend-card__desc">{{ friend.desc }}</span>
          </div>
        </a>
      </div>

      <!-- 申请友链 -->
      <div class="friends__apply">
        <p> 想交换友链？<a href="mailto:3284729638@qq.com">发邮件给我</a>~</p>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// 友链数据（avatar 填图片 URL，留空则显示默认图标）
const friends = ref([
  {
    name: 'Bangumi番组计划',
    url: 'https://bgm.tv/',
    avatar: 'https://ts4.tc.mm.bing.net/th/id/OIP-C.IKJFJOWeVG-W4dxF7c5pwwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    desc: 'ACG爱好者聚集地'
  },
  {
    name: 'Vue.js 官网',
    url: 'https://cn.vuejs.org/',
    avatar: 'https://cn.vuejs.org/images/logo.png',
    desc: '渐进式 JavaScript 框架'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/s1psw',
    avatar: 'https://github.githubassets.com/favicons/favicon-dark.svg',
    desc: '我的 GitHub 主页'
  },
  {
    name: 'NNNullptr南',
    url: 'https://www.xnmoe.com/friends.html',
    avatar: 'https://www.xnmoe.com/assets/images/pfp.png',
    desc: '数学生的古早拼贴风格网站'
  }

])

// 技能数据
const skills = ref([
  { name: 'Vue3', level: 92 },
  { name: 'Node.js', level: 78 },
  { name: 'Spring Boot', level: 65 },
  { name: 'JavaScript', level: 80 },
  { name: 'Arcgis', level: 85 },
  { name: 'Gis数据处理', level: 60 },
  { name: 'webgis', level: 40 }
])

// 经历时间线
const timeline = ref([
  {
    period: '2024 - 至今',
    title: '大学生',
    org: '哈尔滨某大学',
    description: '苦逼学习中。。'
  }
])
</script>

<style scoped>
.touxiang {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.about-page {
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

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 4px;
}

/* ---- 个人信息卡片 ---- */
.about-intro__card {
  display: flex;
  gap: 40px;
  align-items: center;
  margin-bottom: var(--section-gap);
}

.about-intro__avatar {
  flex-shrink: 0;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  border: 3px solid rgba(102, 126, 234, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-intro__emoji {
  font-size: 3.5rem;
}

.about-intro__info h2 {
  font-size: 1.6rem;
  margin-bottom: 6px;
}

.about-intro__role {
  color: var(--accent-start);
  font-weight: 500;
  font-size: 0.95rem;
  margin-bottom: 14px;
}

.about-intro__bio {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 20px;
}

.about-intro__social {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* ---- 技能区 ---- */
.skills {
  margin-bottom: var(--section-gap);
}

.skills__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 32px;
}

.skills__item {
  padding: 20px 24px !important;
  cursor: default !important;
}

.skills__item:hover {
  transform: none !important;
}

.skills__header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.skills__icon {
  font-size: 1.3rem;
}

.skills__name {
  font-weight: 500;
  flex: 1;
}

.skills__level {
  color: var(--text-muted);
  font-size: 0.85rem;
}

/* 渐变进度条 */
.skills__bar {
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.skills__bar-fill {
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--accent-start), var(--accent-end));
  transition: width 1s ease-out;
  animation: barFill 1s ease-out;
}

@keyframes barFill {
  from { width: 0 !important; }
}

/* ---- 时间线 ---- */
.timeline__list {
  margin-top: 32px;
  position: relative;
}

.timeline__item {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
}

/* 时间线节点 */
.timeline__node {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 20px;
}

.timeline__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-start), var(--accent-end));
  box-shadow: 0 0 12px rgba(102, 126, 234, 0.5);
  flex-shrink: 0;
}

.timeline__line {
  width: 2px;
  flex: 1;
  background: linear-gradient(180deg, var(--accent-start), transparent);
  margin-top: 6px;
}

.timeline__card {
  flex: 1;
  padding: 24px !important;
  cursor: default !important;
}

.timeline__card:hover {
  transform: none !important;
}

.timeline__period {
  margin-bottom: 10px;
}

.timeline__title {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.timeline__org {
  color: var(--accent-start);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 10px;
}

.timeline__desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.7;
}

/* ---- 友链 ---- */
.friends {
  margin-bottom: var(--section-gap);
}

.friends__desc {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 28px;
}

.friends__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.friend-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px !important;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-normal);
}

.friend-card:hover {
  transform: translateY(-2px) !important;
  border-color: var(--accent-start);
}

.friend-card__avatar {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 133, 162, 0.15), rgba(167, 139, 250, 0.12));
}

.friend-card__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.friend-card__avatar-emoji {
  font-size: 1.5rem;
}

.friend-card__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.friend-card__name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.friend-card__desc {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.friends__apply {
  text-align: center;
  font-size: 0.88rem;
  color: var(--text-muted);
}

.friends__apply a {
  font-weight: 500;
}

/* 响应式 */
@media (max-width: 768px) {
  .about-intro__card {
    flex-direction: column;
    text-align: center;
  }

  .about-intro__social {
    justify-content: center;
  }

  .skills__grid {
    grid-template-columns: 1fr;
  }

  .timeline__item {
    gap: 16px;
  }

  .friends__grid {
    grid-template-columns: 1fr;
  }
}
</style>
