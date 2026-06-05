<template>
  <!-- 页脚：渐变背景 + 社交链接 -->
  <footer class="footer">
    <!-- 顶部渐变装饰线 -->
    <div class="footer__gradient-line"></div>

    <div class="footer__inner container">
      <!-- 左侧：版权信息 -->
      <div class="footer__info">
        <span class="footer__logo gradient-text">✦ Renque的个人博客</span>
        <p class="footer__copyright">
          &copy; {{ currentYear }} 用心书写每一行代码与文字
        </p>
        <p class="footer__powered">
          基于 Vue 3 + Vite 构建 💜
        </p>
      </div>

      <!-- 中间：快速导航 -->
      <div class="footer__nav">
        <h4 class="footer__heading">快速导航</h4>
        <router-link to="/" class="footer__link">首页</router-link>
        <router-link to="/blog" class="footer__link">文章列表</router-link>
        <router-link to="/about" class="footer__link">关于我</router-link>
      </div>

      <!-- 右侧：社交链接 -->
      <div class="footer__social">
        <h4 class="footer__heading">找到我</h4>
        <div class="footer__social-links">
          <a href="https://github.com" target="_blank" rel="noopener" class="footer__social-link" title="GitHub">
            GitHub
          </a>
          
          <a href="mailto:hello@example.com" class="footer__social-link" title="邮箱">
             邮箱
          </a>
          <!-- <a href="#" class="footer__social-link" title="RSS 订阅">
            RSS
          </a> -->
        </div>
      </div>
    </div>

    <!-- 底部装饰文字 -->
    <div class="footer__decoration">
      <span class="decoration-text">Hello, World!</span>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  position: relative;
  padding: 60px 0 30px;
  background: linear-gradient(180deg, transparent 0%, rgba(15, 12, 41, 0.8) 30%, var(--bg-primary) 100%);
}

/* 顶部渐变线 */
.footer__gradient-line {
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-start), var(--accent-end), transparent);
  margin-bottom: 40px;
}

.footer__inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
}

/* 版权区 */
.footer__logo {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 12px;
  display: block;
}

.footer__copyright {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 6px;
}

.footer__powered {
  color: var(--text-muted);
  font-size: 0.85rem;
}

/* 导航标题 */
.footer__heading {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

/* 导航链接 */
.footer__nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer__link {
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.footer__link:hover {
  color: var(--accent-start);
}

/* 社交链接 */
.footer__social-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer__social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  border: 8px ;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all var(--transition-fast);
}

.footer__social-link:hover {
  color: var(--accent-start);
  transform: translateX(4px);
}

.social-icon {
  font-size: 1.1rem;
}

/* 底部装饰 */
.footer__decoration {
  text-align: center;
  margin-top: 40px;
}

.decoration-text {
  color: var(--text-muted);
  letter-spacing: 16px;
  font-size: 0.8rem;
  opacity: 0.5;
}

/* 响应式 */
@media (max-width: 768px) {
  .footer__inner {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: center;
  }

  .footer__nav {
    align-items: center;
  }

  .footer__social-links {
    align-items: center;
  }
}
</style>
