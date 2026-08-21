import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)

app.use(createPinia())
// practice.html에는 <RouterView>가 없어 라우터를 주입하지 않는다 (매칭 경고 방지)

app.mount('#app')
