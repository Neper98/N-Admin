<template>
  <div class="topbar">
    <i-ep-Fold class="topbar__icon--collapse" @click="toggleCollapse" />
    <el-breadcrumb :separator-icon="ArrowRight">
      <transition-group name="breadcrumb" mode="out-in">
        <template v-for="{ meta, path, name } in breadList" :key="path">
          <el-breadcrumb-item v-if="name">{{ meta.title }}</el-breadcrumb-item>
        </template>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGlobalStore } from '@/stores/global'
import { ArrowRight } from '@element-plus/icons-vue'

const route = useRoute()
const breadList = computed(() => route.matched)
const global = useGlobalStore()

const toggleCollapse = () => {
  global.collapse = !global.collapse
}
console.log(route.matched.map(item => item.components))
</script>

<style lang="scss" scoped>
.topbar {
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #ebeef5;
}
.topbar__icon--collapse {
  margin: 0 20px;
  cursor: pointer;
}
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.3s;
}
.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}
.breadcrumb-leave-active {
  position: absolute;
}
</style>
