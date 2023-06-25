import { createRouter, createWebHistory, type RouteRecordRaw as RRR } from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import Page404 from '@/views/404/index.vue'
import menu11 from '@/views/menu1/menu11/index.vue'
import menu12 from '@/views/menu1/menu12/index.vue'
import menu21 from '@/views/menu2/menu21/index.vue'
import menu22 from '@/views/menu2/menu22/index.vue'
import login from '@/views/login/index.vue'

import home from '@/views/home/index.vue'
import layout from '@/layout/index.vue'
import { useGlobalStore } from '@/stores'
import { Delete } from '@element-plus/icons-vue'

// 左侧菜单路由
export const menu: RRR[] = [
  {
    path: '/m1',
    name: 'm1',
    meta: {
      title: '菜单一',
      icon: Delete
    },
    children: [
      {
        path: '/m1/m11',
        name: 'm1m11',
        component: menu11,
        meta: {
          title: '菜单一/1'
        }
      },
      {
        path: '/m1/m12',
        name: 'm1m12',
        component: menu12,
        meta: {
          title: '菜单一/2'
        }
      }
    ]
  },
  {
    path: '/m2',
    name: 'm2',
    meta: {
      title: '菜单二'
    },
    children: [
      {
        path: '/m2/m21',
        name: 'm2m21',
        component: menu21,
        meta: {
          title: '菜单二/1'
        }
      },
      {
        path: '/m2/m22',
        name: 'm2m22',
        component: menu22,
        meta: {
          title: '菜单二/2'
        }
      }
    ]
  }
]

// 首页路由
export const homeMenu: RRR = {
  path: '/',
  name: 'home',
  component: home,
  meta: {
    title: '首页',
    affix: true
  }
}

// 全部路由表
const routes: RRR[] = [
  {
    path: '/',
    component: layout,
    children: [homeMenu, ...menu]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/:pathMatch(.*)*',
    component: Page404
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  nprogress.start()
  const global = useGlobalStore()
  // 标签页处理
  global.beforeEachTags(to, from)
  next()
})

router.afterEach(() => {
  nprogress.done()
})

router.onError(() => {
  nprogress.done()
})

export default router
