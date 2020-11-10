import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LoginView from '../views/Login.vue'
import registeredView from '../views/registered.vue'
import orderlistView from '../views/orderlist.vue'
import menuView from '../views/menu.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path:"/registered",
    component:registeredView,
    meta:{
      isLogin:true
    }
  },
  {
    path:"/orderlist",
    component:orderlistView,
  },
  {
    path:"/menu",
    component:menuView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
