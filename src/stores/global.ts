import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter, type RouteLocationNormalizedLoaded as RN } from 'vue-router'

export interface ViewTag extends RN {
  fullPath: string
  scrollTop?: number
  isRefreshing?: boolean
}

export const useGlobalStore = defineStore('global', () => {
  const router = useRouter()
  const home = router.resolve('/')
  const isMobile = ref<boolean>(false)
  const collapse = ref<boolean>(false)
  const viewTags = ref<ViewTag[]>([home])
  const isRefreshing = ref<boolean>(false)

  // 进入新页面增添加标签页
  const beforeEachTags = (to: RN, from: RN) => {
    const fromTag = viewTags.value.find((i) => i.fullPath === from.fullPath)
    const isExist = viewTags.value.map((i) => i.fullPath).includes(to.fullPath)
    // TODO:判断当前跳转路由是否需要创建Tag
    const needCreateTag = (route: RN) => !['home', 'login'].includes(route.name as string)

    const contentRef = document.querySelector('.contaier__content')

    if (fromTag) {
      fromTag.scrollTop = contentRef?.scrollTop
    }
    if (!isExist && needCreateTag(to)) {
      viewTags.value.push(to)
    }
  }

  // 重置标签页
  const resetViewTags = () => {
    viewTags.value.splice(0, viewTags.value.length, home)
  }

  return {
    isMobile,
    collapse,
    viewTags,
    isRefreshing,
    beforeEachTags,
    resetViewTags
  }
})
