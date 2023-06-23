<template>
  <template v-for="{ path, meta, children } in navMenus" :key="path">
    <!-- 有子路由 -->
    <el-sub-menu v-if="hasChildren({ children, meta })" :index="path">
      <template #title>
        <el-icon>
          <component :is="meta?.icon" v-if="meta?.icon" class="menu-icon" />
          <i-ep-menu v-else />
        </el-icon>
        <span class="menu-title">{{ meta?.title }}</span>
      </template>
      <!-- 递归渲染 -->
      <nav-menu :nav-menus="children" />
    </el-sub-menu>

    <!-- 无子路由 -->
    <el-menu-item v-else :index="path">
      <el-icon>
        <component :is="meta?.icon" v-if="meta?.icon" class="menu-icon" />
        <i-ep-menu v-else />
      </el-icon>
      <span class="menu-title">{{ meta?.title }}</span>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import type { RouteRecordRaw as RRR } from 'vue-router'
defineProps(['navMenus'])
const hasChildren = (item: Pick<RRR, 'children' | 'meta'>) =>
  item.children && item.children.every((item2: RRR) => !item2.meta?.hidden)
</script>
<style lang="scss" scoped>
.menu-title {
  margin-left: 10px;
}

.menu-icon {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
