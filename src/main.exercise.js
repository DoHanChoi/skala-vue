import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.exercise.vue'
import router from './router/exercise.js'
import { naive } from './plugins/naive.js'

createApp(App).use(createPinia()).use(router).use(naive).mount('#app')
