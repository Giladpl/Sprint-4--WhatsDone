import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../views/home-page.vue'
import login from '../views/login.vue'
import boardDetails from '../views/board-details.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: homePage
  },
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/board/:boardId',
    name: 'board-details',
    component: boardDetails
  },
  // {
  //   path: '/about',
  //   name: 'About',
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
