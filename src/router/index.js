import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CodesView from '../views/CodesView.vue'
import TestStylesView from '../views/TestStylesView.vue'
import NewLibView from '../views/NewLibView.vue'
import LastLibView from '../views/LastLibView.vue'
// import TaskerView from '../views/TaskerView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/tasker',
  //   name: 'tasker',
  //   component: TaskerView
  // },
  {
    path: '/Codes',
    name: 'Codes',
    component: CodesView
  },
  {
    path: '/newlib',
    name: 'NewLib',
    component: NewLibView
  },
  {
    path: '/lastlib',
    name: 'LastLib',
    component: LastLibView
  },
  {
    path: '/teststyles',
    name: 'TestStyles',
    component: TestStylesView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
