/**
 * 模拟博客文章数据
 * 每篇文章包含：id、标题、摘要、内容、日期、分类、标签
 */
export const posts = [
  {
    id: '1',
    title: 'Vue 3 Composition API 实战指南',
    excerpt: '深入探讨 Vue 3 组合式 API 的核心概念与最佳实践，帮助你从选项式 API 平滑过渡到更灵活的组合式开发模式。',
    content: `## 引言

Vue 3 的 Composition API 为我们提供了一种全新的组织组件逻辑的方式。相比传统的 Options API，它让代码复用和逻辑关注点分离变得更加自然。

## 为什么选择 Composition API？

### 1. 更好的逻辑复用

在 Options API 中，我们通常使用 mixins 来复用逻辑，但 mixins 有诸多问题：
- 命名冲突风险
- 来源不清晰
- 隐式依赖

Composition API 通过组合函数（Composables）优雅地解决了这些问题。

### 2. 更好的类型推导

配合 TypeScript，Composition API 能提供更准确的类型推导。

### 3. 更灵活的代码组织

不再受 \`data\`、\`methods\`、\`computed\` 等选项的限制，可以按功能组织代码。

## setup 函数与 script setup

Vue 3.2 引入了 \`<script setup>\` 语法糖，让组件编写更加简洁：

\`\`\`js
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

function increment() {
  count.value++
}
</script>
\`\`\`

## 核心 API 详解

### ref 与 reactive

- **ref**: 用于基本类型值的响应式包装
- **reactive**: 用于对象的深度响应式包装

### computed

计算属性会自动追踪依赖并缓存结果。

### watch 与 watchEffect

- **watch**: 显式监听特定数据源
- **watchEffect**: 自动追踪回调中的响应式依赖

## 总结

Composition API 不是 Options API 的替代，而是补充。选择哪种方式取决于具体场景和个人偏好。`,
    date: '2025-12-15',
    category: '前端开发',
    tags: ['Vue.js', 'JavaScript', 'Composition API']
  },
  {
    id: '2',
    title: 'CSS 玻璃态设计完全指南',
    excerpt: '从 backdrop-filter 到渐变边框，全方位解析玻璃态（Glassmorphism）UI 设计在 Web 中的实现技巧。',
    content: `## 什么是玻璃态设计？

玻璃态（Glassmorphism）是近年来流行的 UI 设计趋势，核心特征是：
- 半透明背景
- 背景模糊效果
- 细腻的边框
- 层次分明的多层结构

## 核心 CSS 属性

### backdrop-filter

\`\`\`css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
\`\`\`

### 注意事项

1. **浏览器兼容性**: \`backdrop-filter\` 在主流浏览器中已广泛支持
2. **性能考虑**: 过多模糊层会影响渲染性能
3. **对比度**: 确保文字与背景有足够的对比度

## 进阶技巧

### 渐变边框

使用 \`border-image\` 或伪元素创建渐变边框效果。

### 多层玻璃

通过堆叠多个玻璃态层创造深度感。

### 光晕动画

结合 CSS 动画为玻璃卡片添加微妙的光效。

## 实战示例

创建一个精美的玻璃态卡片组件，包含头像、标题、描述和操作按钮。

## 总结

玻璃态设计能让你的界面瞬间提升现代感和精致度。关键在于把握好透明度和模糊的平衡。`,
    date: '2025-11-28',
    category: 'CSS 艺术',
    tags: ['CSS', 'Glassmorphism', 'UI 设计']
  },
  {
    id: '3',
    title: '从零搭建个人博客的技术选型',
    excerpt: '比较多种博客搭建方案：Hexo、VuePress、Nuxt Content 到纯手写 Vue 3 项目，帮你找到最适合自己的方式。',
    content: `## 为什么要自己搭建博客？

在这个社交媒体泛滥的时代，拥有一个属于自己的独立博客比以往任何时候都更有价值。

## 方案对比

### 1. Hexo / Hugo

静态站点生成器，适合纯文字博客。

**优点**: 快速、SEO 友好、部署简单
**缺点**: 定制需要学习模板语法

### 2. VuePress / VitePress

Vue 驱动的静态站点生成器。

**优点**: Vue 生态、Markdown 支持好
**缺点**: 主题定制有一定门槛

### 3. Nuxt Content

基于 Nuxt 的内容管理方案。

**优点**: 功能强大、支持多种数据源
**缺点**: 学习曲线较陡

### 4. 纯手写 Vue 3 + Vite

完全自定义的方案。

**优点**: 100% 可控、学习价值高
**缺点**: 需要自己处理所有细节

## 我的选择

对于想要深入理解前端并享受完全创作自由的人来说，纯手写是最佳选择。这个博客正是基于 Vue 3 + Vite 从零搭建的。

## 总结

没有最好的方案，只有最适合你的方案。选择你能持续维护并乐在其中的方式。`,
    date: '2025-09-05',
    category: '技术思考',
    tags: ['博客', 'Vue.js', '技术选型', '建站']
  },
  {
    id: '4',
    title: '前端动画性能优化实战',
    excerpt: '深入分析 CSS 动画与 JavaScript 动画的性能差异，分享如何用 FLIP 技术实现 60fps 流畅动画。',
    content: `## 动画性能为什么重要？

流畅的动画是优秀用户体验的关键组成部分。卡顿的动画会立即让用户感到不专业。

## 浏览器渲染管线

理解浏览器的渲染步骤是优化动画的前提：

1. **Layout**（布局）
2. **Paint**（绘制）
3. **Composite**（合成）

## 只触发 Composite 的属性

最佳性能的动画属性：
- \`transform\`
- \`opacity\`

它们只触发合成阶段，不会重排或重绘。

## FLIP 技术

First, Last, Invert, Play — 一种高效动画模式：

\`\`\`js
// 记录起始位置
const first = el.getBoundingClientRect();

// 改变布局
updateLayout();

// 记录结束位置
const last = el.getBoundingClientRect();

// 反转差值
const invert = first.top - last.top;

// 播放动画
el.animate([
  { transform: \`translateY(\${invert}px)\` },
  { transform: 'translateY(0)' }
], { duration: 300, easing: 'ease-out' });
\`\`\`

## 使用 will-change

\`will-change\` 属性可以提前告知浏览器哪些属性即将变化，让浏览器提前优化。

## 总结

动画优化的核心原则：尽量只触发合成，避免 layout 和 paint。`,
    date: '2025-08-18',
    category: '前端开发',
    tags: ['CSS', 'JavaScript', '性能优化', '动画']
  },
  {
    id: '5',
    title: '程序员的效率工具清单 2025',
    excerpt: '分享我日常开发中不可或缺的效率工具：从编辑器插件到命令行工具，全面提升你的开发工作流。',
    content: `## 工欲善其事，必先利其器

一套好的工具链可以显著提升开发效率和幸福感。

## 编辑器 / IDE

### VS Code

依然是前端开发的首选。推荐插件：
- **Vue - Official**: Vue 3 官方扩展
- **GitHub Copilot**: AI 代码补全
- **Error Lens**: 行内错误显示
- **Better Comments**: 彩色注释

## 终端工具

### Warp / Windows Terminal

现代化的终端体验，支持 GPU 加速渲染。

### starship

跨 shell 的提示符美化工具。

## 效率技巧

### 快捷键

花时间学习快捷键是回报率最高的投资。

### 自动化脚本

将重复性任务脚本化：
- 项目初始化模板
- 自动化部署
- 代码格式化

## 总结

工具的价值在于让你专注于真正重要的事情——解决问题和创造价值。`,
    date: '2025-07-22',
    category: '技术思考',
    
    tags: ['工具', '效率', '开发环境']
  },
  {
    id: '6',
    title: '给博客添加樱花飘落效果 —— 纯 CSS + Vue 实现',
    excerpt: '手把手教你用纯 CSS 关键帧动画配合 Vue 组件，为网页添加浪漫的日式樱花花瓣飘落特效，每片花瓣都有独立的运动轨迹。',
    content: `## 效果预览

进入本博客主页，你会看到数十片粉色的樱花花瓣在背景中缓缓飘落——每片花瓣的下落速度、水平漂移、大小、透明度都各不相同，营造出自然浪漫的日式动漫氛围。

## 核心思路

整个效果分成两层：

1. **CSS 关键帧动画** — 定义花瓣从顶部飘落到底部的运动轨迹
2. **Vue 组件** — 用 JavaScript 随机生成多片花瓣，每片独立参数

## CSS 动画

核心是一个 \`@keyframes\` 动画，让花瓣从视口顶部飘到底部：

\`\`\`css
@keyframes sakuraFall {
  0% {
    transform: translateY(-10vh) translateX(0) rotate(0deg);
    opacity: 0;
  }
  5% {
    opacity: var(--opacity, 0.18);
  }
  50% {
    transform: translateY(45vh) translateX(calc(var(--drift, 40px) * 0.6)) rotate(calc(var(--rotation, 540deg) * 0.5));
  }
  100% {
    transform: translateY(105vh) translateX(var(--drift, 80px)) rotate(var(--rotation, 720deg));
    opacity: 0;
  }
}
\`\`\`

关键细节：
- 使用 CSS 自定义属性（\`--drift\`、\`--rotation\`、\`--opacity\`）让每片花瓣参数不同
- 水平漂移在 50% 处到达 60%，模拟花瓣随风摆动
- 透明度在顶部和底部淡入淡出

## Vue 组件

用 \`computed\` 生成 50 片花瓣的随机参数：

\`\`\`js
const petalCount = 50

function random(min, max) {
  return min + Math.random() * (max - min)
}

const petals = computed(() => {
  return Array.from({ length: petalCount }, (_, i) => ({
    id: i,
    style: {
      left: \`\${random(0, 100)}%\`,
      fontSize: \`\${random(14, 28)}px\`,
      animationDuration: \`\${random(8, 22)}s\`,
      animationDelay: \`\${random(-20, 0)}s\`,
      opacity: random(0.10, 0.25),
      '--drift': \`\${random(-80, 80)}px\`,
      '--rotation': \`\${random(360, 1080)}deg\`,
    }
  }))
})
\`\`\`

模板渲染每片花瓣：

\`\`\`html
<div class="sakura-container" aria-hidden="true">
  <span
    v-for="p in petals"
    :key="p.id"
    class="sakura-petal"
    :style="p.style"
  >🌸</span>
</div>
\`\`\`

## 关键技巧

- **负延迟**：\`animationDelay\` 设为负值，让花瓣从不同位置开始，避免"一行同时落下"的违和感
- **固定定位**：容器使用 \`position: fixed; inset: 0\` 覆盖全屏
- **\`pointer-events: none\`**：花瓣不阻挡任何页面交互
- **\`aria-hidden="true"\`**：对屏幕阅读器隐藏装饰元素

## 总结

不到 80 行代码就能实现一个完整的樱花飘落系统。核心是理解 CSS 自定义属性如何与 JavaScript 生成的随机参数配合，让每片花瓣都拥有独一无二的运动轨迹。`,
    date: '2026-06-06',
    category: 'CSS 艺术',
    tags: ['CSS', '动画', 'Vue.js', '樱花', '前端特效']
  }
]

/**
 * 获取所有文章分类
 * @returns {string[]} 分类数组
 */
export function getCategories() {
  return [...new Set(posts.map(p => p.category))]
}

/**
 * 根据 ID 获取文章
 * @param {string} id 文章 ID
 * @returns {object|undefined} 文章对象
 */
export function getPostById(id) {
  return posts.find(p => p.id === id)
}
