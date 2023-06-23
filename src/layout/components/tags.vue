<template>
  <div>
    <el-scrollbar>
      <div ref="tagRef" class="tag-list">
        <router-link
          v-for="tag in viewTags"
          :class="{
            tag: true,
            active: isActive(tag),
            affix: tag.meta.affix,
          }"
          :to="tag"
          :key="tag.fullPath"
          @contextmenu.prevent="openMenu($event, tag)"
        >
        <el-tag :closable="!tag.meta.affix" @close.prevent="closeTag(tag)" :effect="isActive(tag) ? 'dark' : 'plain'">
          {{ tag.meta.title }}
        </el-tag>
        </router-link>
      </div>
    </el-scrollbar>
  </div>

  <el-dropdown ref="menuRef" class="menu" :teleported="false">
    <div
      :style="{
        left: menuOptions.position.left + 'px',
        top: menuOptions.position.top + 'px',
        position: 'fixed',
      }"
    />
    <template #dropdown>
      <el-dropdown-menu class="menu-list">
        <el-dropdown-item><i-ep-refresh class="ii" />刷新</el-dropdown-item>
        <el-dropdown-item @click="closeTag(currentTag)" divided>
          <i-ep-close />关闭标签
        </el-dropdown-item>
        <el-dropdown-item @click="closeOther(currentTag)"
          ><i-ep-folder-delete />关闭其他标签</el-dropdown-item
        >
        <el-dropdown-item @click="fullScreenTag(currentTag)" divided
          ><i-ep-full-screen />全屏当前标签</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import Sortable from 'sortablejs'
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useGlobalStore } from '@/stores'
import type { RouteLocationNormalizedLoaded as RN } from 'vue-router'
import { type DropdownInstance, ElScrollbar } from 'element-plus'
import { fullScreen } from '@/utils'

const props = defineProps(['contentRef'])
const route = useRoute()
const router = useRouter()
const tagRef = ref()
const menuRef = ref<DropdownInstance>()
const menuOptions = reactive({
  visible: false,
  position: {
    left: 0,
    top: 0,
  },
})
const global = useGlobalStore()
const viewTags = global.viewTags
const currentTag = ref()

onMounted(() => {
  Sortable.create(tagRef.value, {
    draggable: 'a',
    filter: '.affix',
    animation: 300,
    onEnd: (e: any) => {
      const { oldIndex, newIndex } = e
      ;[viewTags[oldIndex], viewTags[newIndex]] = [viewTags[newIndex], viewTags[oldIndex]]
    },
  })
})
const isActive = (r: RN) => r.fullPath === route.fullPath
// 右键打开菜单
const openMenu = (e: MouseEvent , tag: RN) => {
  const { clientX: x, clientY: y } = e
  currentTag.value = tag
  menuOptions.position = {
    left: x + 1,
    top: y + 1,
  }
  nextTick(() => {
    menuRef?.value?.handleOpen()
  })
}
// 关闭某个标签
const closeTag = (tag: RN) => {
  const i = viewTags.findIndex((item) => item === tag)
  if (isActive(tag)) {
    const isLast = i === viewTags.length - 1
    const to = isLast ? viewTags[viewTags.length - 2] : viewTags[i + 1]
    router.push(to)
  }
  viewTags.splice(i, 1)
}
// 关闭其他标签
const closeOther = (tag: RN) => {
  global.resetViewTags()
  route.name !== 'home' && viewTags.push(tag)
  !isActive(tag) && router.push(tag)
}
// 全屏标签页
const fullScreenTag = (tag: RN) => {
  !isActive(tag) && router.push(tag)
  fullScreen(props.contentRef)
}
</script>

<style lang="scss" scoped>
.tag-list {
  display: flex;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  height: 35px;

  .tag {
    cursor: pointer;
    display: flex;
    padding: 0 10px;
    height: 100%;
    color: #999;
    text-decoration: none;
    justify-content: center;
    align-items: center;
    line-height: 35px;
    font-size: 12px;
    flex-shrink: 0;

    &:hover {
      background-color: var(--el-color-primary-light-9);
    }
  }

  // .active {
  //   color: #fff;
  //   background-color: var(--el-color-primary) !important;
  // }

 
}
.menu {
  :deep(.menu-list){
    width: 250px;
  }
  :deep(svg) {
    margin-right: 10px;
  }
}
</style>
