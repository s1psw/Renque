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
          <p class="about-intro__role">全栈开发 · 技术博主 · 开源爱好者</p>
          <p class="about-intro__bio">
            拥有 5 年以上 Web 开发经验，专注于 Vue.js 生态与前端工程化。
            热衷于将复杂的技术概念转化为通俗易懂的文字，帮助更多开发者成长。
            
          </p>

          <!-- 社交按钮 -->
          <div class="about-intro__social">
            <a href="https://github.com" target="_blank" rel="noopener" class="btn-outline">
               GitHub
            </a>
            <a href="mailto:hello@example.com" class="btn-outline">
               联系我
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 技能区 -->
    <section class="skills container">
      <h2 class="section-title">🛠️ 技术栈</h2>
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
      <h2 class="section-title">📅 经历</h2>
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
      <h2 class="section-title">🔗 朋友们</h2>
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
          <span class="friend-card__avatar">{{ friend.avatar }}</span>
          <div class="friend-card__info">
            <span class="friend-card__name">{{ friend.name }}</span>
            <span class="friend-card__desc">{{ friend.desc }}</span>
          </div>
        </a>
      </div>

      <!-- 申请友链 -->
      <div class="friends__apply">
        <p>💌 想交换友链？<a href="mailto:3284729638@qq.com">发邮件给我</a> 或者在评论区留言~</p>
      </div>
    </section>

    <!-- 评论区 -->
    <section class="comments container">
      <h2 class="section-title">💬 留言板</h2>
      <div class="divider"></div>
      <p class="comments__desc">有什么想说的就在这里留言吧~</p>

      <div class="comments__box glass-card">
        <!-- 评论表单 -->
        <form class="comments__form" @submit.prevent="addComment">
          <div class="comments__form-row">
            <input
              v-model="newComment.name"
              type="text"
              placeholder="你的昵称"
              required
              class="comments__input"
              maxlength="20"
            />
            <input
              v-model="newComment.email"
              type="email"
              placeholder="邮箱（选填，不会公开）"
              class="comments__input"
            />
          </div>
          <textarea
            v-model="newComment.content"
            placeholder="写下你想说的话……"
            required
            class="comments__textarea"
            rows="3"
            maxlength="500"
          ></textarea>
          <button type="submit" class="btn-gradient comments__submit">
            ✨ 发表留言
          </button>
        </form>

        <!-- 评论列表 -->
        <div class="comments__list">
          <div
            v-for="(c, index) in comments"
            :key="index"
            class="comment-item"
          >
            <div class="comment-item__avatar">{{ c.name[0] }}</div>
            <div class="comment-item__body">
              <div class="comment-item__header">
                <span class="comment-item__name">{{ c.name }}</span>
                <span class="comment-item__time">{{ c.time }}</span>
              </div>
              <p class="comment-item__content">{{ c.content }}</p>
            </div>
          </div>

          <!-- 空状态 -->
          <p v-if="comments.length === 0" class="comments__empty">
            还没有留言，来抢沙发吧~ ☕
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 当前时间
const now = new Date()
const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

// 友链数据
const friends = ref([
  {
    name: 'Vue.js 官网',
    url: 'https://cn.vuejs.org/',
    avatar: '💚',
    desc: '渐进式 JavaScript 框架'
  },
  {
    name: 'Vite 官网',
    url: 'https://cn.vitejs.dev/',
    avatar: '⚡',
    desc: '下一代前端构建工具'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/s1psw',
    avatar: '🐙',
    desc: '我的 GitHub 主页'
  }
])

// 评论列表
const comments = ref([
  {
    name: 'Renque',
    content: '欢迎来到我的博客！这里是留言板，有什么想说的都可以写下来~',
    time: timeStr
  }
])

// 新评论表单
const newComment = ref({
  name: '',
  email: '',
  content: ''
})

function addComment() {
  if (!newComment.value.name.trim() || !newComment.value.content.trim()) return
  const now = new Date()
  comments.value.unshift({
    name: newComment.value.name.trim(),
    content: newComment.value.content.trim(),
    time: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  })
  newComment.value = { name: '', email: '', content: '' }
}

// 技能数据
const skills = ref([
  { name: 'Vue.js', icon: '💚', level: 92 },
  { name: 'JavaScript', icon: '🟨', level: 88 },
  { name: 'CSS / SCSS', icon: '🎨', level: 85 },
  { name: 'Node.js', icon: '🟢', level: 78 },
  { name: 'TypeScript', icon: '🔷', level: 72 },
  { name: 'Python', icon: '🐍', level: 65 },
  { name: 'Git / DevOps', icon: '🔧', level: 80 },
  { name: 'UI/UX 设计', icon: '✏️', level: 60 }
])

// 经历时间线
const timeline = ref([
  {
    period: '2024 - 至今',
    title: '高级前端工程师',
    org: '某科技公司',
    description: '负责核心产品前端架构设计与技术选型，推动 Vue 3 迁移，搭建组件库与设计系统。'
  },
  {
    period: '2022 - 2024',
    title: '全栈开发工程师',
    org: '某互联网公司',
    description: '参与多个全栈项目的开发与维护，使用 Vue.js + Node.js 技术栈，负责从前端到后端的完整交付。'
  },
  {
    period: '2020 - 2022',
    title: '前端开发工程师',
    org: '某创业公司',
    description: '作为早期成员加入团队，从零搭建前端项目，积累了丰富的实战经验与快速迭代能力。'
  },
  {
    period: '2016 - 2020',
    title: '计算机科学 学士',
    org: '某大学',
    description: '主修计算机科学与技术，期间参与多个开源项目与校内竞赛，打下了扎实的计算机基础。'
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
  font-size: 2rem;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 133, 162, 0.15), rgba(167, 139, 250, 0.12));
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

/* ---- 评论区 ---- */
.comments {
  padding-bottom: var(--section-gap);
}

.comments__desc {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 28px;
}

.comments__box {
  max-width: 700px;
  margin: 0 auto;
  padding: 28px !important;
  cursor: default !important;
}

.comments__box:hover {
  transform: none !important;
  box-shadow: var(--shadow-card) !important;
}

/* 评论表单 */
.comments__form {
  margin-bottom: 32px;
  padding-bottom: 28px;
  border-bottom: 1px solid rgba(180, 150, 200, 0.2);
}

.comments__form-row {
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
}

.comments__input {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid rgba(180, 150, 200, 0.3);
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.9rem;
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.5);
  outline: none;
  transition: border-color 0.2s;
}

.comments__input:focus {
  border-color: var(--accent-start);
}

.comments__textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(180, 150, 200, 0.3);
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.9rem;
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.5);
  outline: none;
  resize: vertical;
  margin-bottom: 14px;
  transition: border-color 0.2s;
}

.comments__textarea:focus {
  border-color: var(--accent-start);
}

.comments__submit {
  font-size: 0.9rem;
  padding: 10px 32px;
}

/* 评论列表 */
.comments__list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  display: flex;
  gap: 14px;
}

.comment-item__avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-start), var(--accent-end));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.comment-item__body {
  flex: 1;
  min-width: 0;
}

.comment-item__header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
}

.comment-item__name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-primary);
}

.comment-item__time {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.comment-item__content {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.7;
  word-break: break-word;
}

.comments__empty {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
  padding: 20px 0;
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

  .comments__form-row {
    flex-direction: column;
  }

  .comments__box {
    padding: 20px !important;
  }
}
</style>
