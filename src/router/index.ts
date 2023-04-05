import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/assets/:id',
      name: 'asset',
      component: () => import('../views/AssetView.vue')
    }
  ]
})

export default router
