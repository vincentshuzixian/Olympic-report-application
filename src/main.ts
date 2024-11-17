import './assets/main.css'
// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import pinia from './store'
import router from './router'
import './styles/global.css'

createApp(App).use(pinia).use(router).mount('#app')
