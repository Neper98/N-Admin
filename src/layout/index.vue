<template>
  <el-container class="container">
    <!-- 顶部 -->
    <el-header class="container__header">
      <!-- 顶部左侧 -->
      <router-link class="container_header--left" to="/">
        <img class="logo" :src="logo" />
        <span class="title-name">N-Admin</span>
      </router-link>
      <!-- 顶部右侧 -->
      <div class="container__header--right">
        <el-icon @click="fs" class="icon-fullScreen"><i-ep-FullScreen /></el-icon>
        <el-dropdown trigger="click" @command="handler">
          <div>
            <el-avatar :size="30" class="avatar"></el-avatar>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item divided command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边菜单 -->
      <!-- 移动端侧边栏 -->
      <div v-if="isMobile">
        <div class="icon-menu" @click="toggleDrawer"><i-ep-Menu /></div>
        <el-drawer :size="240" v-model="visible" direction="ltr" :with-header="false">
          <div class="side--mobile">
            <el-header class="side__header--mobile">
              <img class="logo" :src="logo" />
              <span class="title-name">N-Admin</span>
            </el-header>
            <el-scrollbar>
              <el-menu
                router
                :default-active="route.fullPath"
                background-color="#212d3d"
                text-color="#fff"
                active-text-color="#409EFF"
              >
                <nav-menu :navMenus="menu" />
              </el-menu>
            </el-scrollbar>
          </div>
        </el-drawer>
      </div>
      <!-- PC端侧边栏 -->
      <el-aside class="container__side" v-else :class="{ collapse }">
        <el-scrollbar>
          <el-menu router :collapse="collapse" :default-active="route.fullPath">
            <nav-menu :navMenus="menu" />
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <!-- 主体部分 -->
      <el-main class="container_main">
        <!-- 面包屑 -->
        <topbar v-if="!isMobile" />
        <!-- 多标签 -->
        <Tags v-if="!isMobile" :contentRef="contentRef" />
        <!-- 内容部分 -->
        <div class="contaier__content" ref="contentRef">
          <router-view v-slot="{ Component }">
            <keep-alive :include="keepAliveComponents">
              <component :is="Component" :key="$route.fullPath" />
            </keep-alive>
          </router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import NavMenu from './components/nav-menu.vue'
import Tags from './components/tags.vue'
import Topbar from './components/topbar.vue'
import logo from '@/assets/logo.png'
import { useGlobalStore } from '@/stores/global'
import { storeToRefs } from 'pinia'
import { menu } from '@/router'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { fullScreen } from '@/utils'

const route = useRoute()
const contentRef = ref()
const { isMobile, collapse, viewTags } = storeToRefs(useGlobalStore())
const visible = ref<boolean>(false)
console.log(viewTags.value[0])

const keepAliveComponents = computed(
  () =>
    viewTags.value
      .map((tag) => tag.matched[tag.matched.length - 1].components?.default.name)
      .filter((i) => !!i) as string[],
)
console.log(keepAliveComponents.value)
const toggleDrawer = () => {
  visible.value = !visible.value
}
const fs = () => {
  fullScreen(document.documentElement)
}

const handler = (type) => {
  console.log(type)
}
</script>
<style src="./style.scss" scoped />