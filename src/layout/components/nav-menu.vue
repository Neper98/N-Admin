<template>
  <template v-for="navMenu in navMenus" :key="navMenu.path">
    <!-- 有子路由 -->
    <el-sub-menu v-if="hasChildren(navMenu)" :index="navMenu.path">
      <template #title>
        <el-icon>
          <component class="menu-icon" v-if="navMenu.meta.icon" :is="navMenu.meta.icon" />
          <i-ep-menu v-else />
        </el-icon>
        <span class="menu-title">{{ navMenu.meta.title }}</span>
      </template>
      <!-- 递归渲染 -->
      <nav-menu :navMenus="navMenu.children" />
    </el-sub-menu>

    <!-- 无子路由 -->
    <el-menu-item v-else :index="navMenu.path">
      <el-icon>
        <component class="menu-icon" v-if="navMenu.meta.icon" :is="navMenu.meta.icon" />
        <i-ep-menu v-else />
      </el-icon>
      <span class="menu-title">{{ navMenu.meta.title }}</span>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import type { RouteRecordRaw as RRR } from 'vue-router'
defineProps(['navMenus'])
const hasChildren = (item: RRR) =>
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
