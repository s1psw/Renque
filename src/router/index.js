import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
// 定义路由
const routes = [
  {
    path: '/',
    name: 'Home',
    // 首页：个人介绍 + 精选文章
    component: Home,
    meta: { title: ' Renque的个人博客' }
  },
  {
    path: '/blog',
    name: 'Blog',
    // 博客列表页
    component: () => import('@/views/Blog.vue'),
    meta: { title: ' Renque的个人博客' }
  },
  {
    path: '/blog/:id',
    name: 'Post',
    // 文章详情页
    component: () => import('@/views/Post.vue'),
    meta: { title: ' Renque的个人博客' }
  },
  {
    path: '/journey',
    name: 'Journey',
    // 见闻
    component: () => import('@/views/Journey.vue'),
    meta: { title: ' Renque的个人博客' }
  },
  {
    path: '/about',
    name: 'About',
    // 关于我
    component: () => import('@/views/About.vue'),
    meta: { title: ' Renque的个人博客' }
  },
  {
    // 404 重定向到首页
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory('/'),
  routes,
  // 页面切换后滚动到顶部
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

// 全局后置守卫：更新页面标题
router.afterEach((to) => {
  document.title = to.meta.title || ' 个人博客'
})

export default router
