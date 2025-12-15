import { createRouter, createWebHistory } from 'vue-router'
import createLevel from '@/pages/create-level.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/create-level',
      name: 'create-level',
      component: createLevel
    }
  ],
})

export default router
