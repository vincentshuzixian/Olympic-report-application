// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import MedalTable from '../components/MedalTable.vue'
import CountryDetails from '../components/CountryDetails.vue'

const routes = [
  { path: '/', component: MedalTable },
  { path: '/country/:country', component: CountryDetails },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
