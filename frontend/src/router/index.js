import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignIn.vue')
  
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue')
  },
  {
    path: '/wall',
    name: 'wall',
    component: () => import(/* webpackChunkName: "about" */ '../views/Wall.vue')
  },
  {
    path: '/userProfil',
    name: 'userProfil',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserProfil.vue')
  },
  {
    path: '/singleMessage',
    name: 'singleMessage',
    component: () => import(/* webpackChunkName: "about" */ '../views/SingleMessage.vue')
  
  }
  /*{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ /*'../views/About.vue')
  }*/

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
