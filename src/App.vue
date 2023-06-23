<template>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useGlobalStore } from '@/stores'
import { throttle } from 'lodash';

const store = useGlobalStore()
const resizeFn = throttle(() => {
  store.isMobile = document.body.clientWidth < 992
},500)
onMounted(() => {
  resizeFn()
  window.addEventListener('resize', resizeFn)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeFn)
})
</script>

<style scoped></style>
