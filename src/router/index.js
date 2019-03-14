import Vue from 'vue'
import Router from 'vue-router'
import { Toast } from 'vant'

Vue.use(Router)
var routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/index')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/index')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/views/product/index')
  }
]

const router = new Router({
  mode: 'history',
  routes: routes
})
router.afterEach(() => {
  Toast.loading({
    mask: true,
    forbidClick: true,
    duration: 500,
    message: '加载中...'
  })
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
