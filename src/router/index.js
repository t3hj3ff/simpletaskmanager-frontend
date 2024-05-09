import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Homepage.vue'
import Taskdetails from '@/views/Taskdetails.vue'
import Taskcreate from '@/views/Taskcreate.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/tasks/:id',
      name: 'task-details',
      component: Taskdetails,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      name: 'create-task',
      component: Taskcreate,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const isAuthenticated = localStorage.getItem('token')

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (!requiresAuth && isAuthenticated && to.name === 'login') {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
