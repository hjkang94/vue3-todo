import { createRouter, createWebHistory } from 'vue-router'
import TodoPage from '../views/TodoPage.vue'
import AboutPage from '../views/AboutPage.vue'
import ErrorPage from '../views/ErrorPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/todo',
    }, {
      path: '/todo',
      name: 'todo',
      component: TodoPage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorPage,
    },
  ]
})

export default router
