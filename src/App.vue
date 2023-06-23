
<template>
  <div>
      <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useGlobalStore} from '@/stores/global'

const store = useGlobalStore()
const resizeFn = () => {
  store.isMobile = document.body.clientWidth < 992
}
resizeFn()
onMounted(() => {
  window.addEventListener('resize', resizeFn)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeFn)
})
</script>

<style scoped>
</style>
