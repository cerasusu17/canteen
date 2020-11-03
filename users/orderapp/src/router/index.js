import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginView from '../views/Login.vue'
import homepage from '../views/homepage.vue'
import orderform from '../views/orderform.vue'
import pay from '../views/pay.vue'



Vue.use(VueRouter)

const routes = [

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: LoginView
  },

  {
    path: '/',
    name: 'homepage',
    component: homepage
  },
  {
    path: '/orderform',
    name: 'orderform',
    component: orderform
  },
  {
    path: '/pay',
    name: 'pay',
    component: pay
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
