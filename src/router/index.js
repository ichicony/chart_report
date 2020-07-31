import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Line',
    component: () => import(/* webpackChunkName: "about" */ '../views/charts/line.vue')
  },
  {
    path: '/zg_lc',
    name: 'Zg_LC',
    component: () => import('../views/charts/zg-lcavg.vue')
  },
  {
    path: '/zgdb',
    name: 'Zgdb',
    component: () => import('../views/charts/zgdb.vue')
  },
  {
    path: '/mix',
    name: 'Mix',
    component: () => import(/* webpackChunkName: "about" */ '../views/charts/mix-chart.vue')
  },
  {
    path: '/keyboard',
    name: 'Keyboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/charts/keyboard.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
