import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './styles/global.css'

// 创建 Vue 应用
const app = createApp(App)

// 注册路由
app.use(router)

// 挂载到 #app
app.mount('#app')
