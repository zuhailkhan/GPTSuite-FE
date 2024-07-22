import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const { isLoggedIn, revalidateAuth } = useAuthStore()
  if (!isLoggedIn && to.meta?.requiresAuth) {
    next({ name: 'login' })
    return
  } else if (!to.meta?.requiresAuth && isLoggedIn) {
    await revalidateAuth()
    next(from.path)
    return
  }
  next()
})

export default router
