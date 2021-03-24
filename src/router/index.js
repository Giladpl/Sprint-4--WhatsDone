import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../views/home-page.vue'
import login from '../views/login.vue'
import boardDetails from '../views/board-details.vue'
import userProfile from '../views/user-profile.vue'
import board from '../views/board.vue'
import chart from '../cmps/chart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: homePage
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/board',
    name: 'board',
    component: board
  },
  {
    path: '/board/:boardId',
    name: 'board-details',
    component: boardDetails,
    children: [
      {
          path: 'chart',
          component: chart
      },
      // {
      //     path: '',
      //     component: 
      // },       
  ]
  },
  {
    path: '/profile',
    name: 'user-profile',
    component: userProfile
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
