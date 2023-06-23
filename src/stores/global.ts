import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter, type RouteLocationNormalizedLoaded as RN } from 'vue-router'

interface ViewTag extends RN {
  fullPath: string
  scrollTop?: number
}

export const useGlobalStore = defineStore('global', () => {
  const router = useRouter()
  const home = router.resolve('/')
  const isMobile = ref<boolean>(false)
  const collapse = ref<boolean>(false)
  const viewTags = ref<ViewTag[]>([home])

  // 更新Tags的滚动状态
  const beforeEachTags = (to: RN, from: ViewTag) => {
    const fromTag = viewTags.value.find((i) => i.fullPath === from.fullPath)
    const isExist = viewTags.value.map((i) => i.fullPath).includes(to.fullPath)
    // TODO:判断当前跳转路由是否需要创建Tag
    const needCreateTag = (route: RN) => !['home', 'login'].includes(route.name as string)

    if (fromTag) {
      fromTag.scrollTop = from.scrollTop
    }
    if (!isExist && needCreateTag(to)) {
      viewTags.value.push(to)
    }
  }

  const resetViewTags = () => {
    viewTags.value.splice(0, viewTags.value.length, home)
  }

  return {
    isMobile,
    collapse,
    viewTags,
    beforeEachTags,
    resetViewTags
  }
})
