<template>
  <el-scrollbar class="tag-scroll">
    <div ref="tagRef" class="tag-list">
      <router-link
        v-for="tag in viewTags"
        :key="tag.fullPath"
        :class="{
          tag: true,
          active: isActive(tag),
          affix: tag.meta.affix
        }"
        :to="tag"
        @contextmenu.prevent="openMenu($event, tag)"
      >
        <el-tag
          :closable="!tag.meta.affix"
          :effect="isActive(tag) ? 'dark' : 'plain'"
          @close.prevent="closeTag(tag)"
        >
          {{ tag.meta.title }}
        </el-tag>
      </router-link>
    </div>
  </el-scrollbar>

  <el-dropdown ref="menuRef" class="menu" :teleported="false">
    <div
      :style="{
        left: menuOptions.position.left + 'px',
        top: menuOptions.position.top + 'px',
        position: 'fixed'
      }"
    />
    <template #dropdown>
      <el-dropdown-menu class="menu-list">
        <el-dropdown-item @click="refresh(currentTag!)"><i-ep-refresh />刷新</el-dropdown-item>
        <el-dropdown-item divided @click="closeTag(currentTag!)">
          <i-ep-close />关闭标签
        </el-dropdown-item>
        <el-dropdown-item @click="closeOther(currentTag!)">
          <i-ep-folder-delete />关闭其他标签
        </el-dropdown-item>
        <el-dropdown-item divided @click="fullScreenTag(currentTag!)">
          <i-ep-full-screen />全屏当前标签
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import Sortable from 'sortablejs'
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, onMounted, nextTick } from 'vue'
import { type ViewTag, useGlobalStore } from '@/stores'
import { type DropdownInstance, ElScrollbar } from 'element-plus'
import { fullScreen } from '@/utils'

const props = defineProps(['contentRef'])
const route = useRoute()
const router = useRouter()
const tagRef = ref<HTMLElement>()
const menuRef = ref<DropdownInstance>()
const currentTag = ref<ViewTag>()
const menuOptions = reactive({
  visible: false,
  position: {
    left: 0,
    top: 0
  }
})
const global = useGlobalStore()
const viewTags = global.viewTags

onMounted(() => {
  Sortable.create(tagRef.value, {
    draggable: 'a',
    filter: '.affix',
    animation: 300,
    onEnd: (e: any) => {
      const { oldIndex, newIndex } = e
      ;[viewTags[oldIndex], viewTags[newIndex]] = [viewTags[newIndex], viewTags[oldIndex]]
    }
  })
})
const isActive = (r: ViewTag) => r.fullPath === route.fullPath
// 右键打开菜单
const openMenu = (e: MouseEvent, tag: ViewTag) => {
  const { clientX: x, clientY: y } = e
  currentTag.value = tag
  menuOptions.position = {
    left: x + 100,
    top: y + 1
  }
  nextTick(() => {
    menuRef?.value?.handleOpen()
  })
}
// 刷新标签
const refresh = (tag: ViewTag) => {
  tag.isRefreshing = global.isRefreshing = true
  nextTick(() => {
    tag.isRefreshing = global.isRefreshing = false
    isActive(tag) ? router.replace(tag) : router.push(tag)
  })
}
// 关闭某个标签
const closeTag = (tag: ViewTag) => {
  const i = viewTags.findIndex((item) => item === tag)
  if (isActive(tag)) {
    const isLast = i === viewTags.length - 1
    const to = isLast ? viewTags[viewTags.length - 2] : viewTags[i + 1]
    router.push(to)
  }
  viewTags.splice(i, 1)
}
// 关闭其他标签
const closeOther = (tag: ViewTag) => {
  global.resetViewTags()
  route.name !== 'home' && viewTags.push(tag)
  !isActive(tag) && router.push(tag)
}
// 全屏标签页
const fullScreenTag = (tag: ViewTag) => {
  !isActive(tag) && router.push(tag)
  fullScreen(props.contentRef)
}
</script>

<style lang="scss" scoped>
.tag-scroll {
  height: auto;
}

.tag-list {
  display: flex;
  height: 35px;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;

  .tag {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 10px;
    font-size: 12px;
    line-height: 35px;
    color: #999;
    text-decoration: none;
    cursor: pointer;
    border-right: 1px solid #e6e6e6;

    &:hover {
      background-color: var(--el-color-primary-light-9);
    }
  }
}

.menu {
  :deep(.menu-list) {
    width: 200px;
  }

  :deep(svg) {
    margin-right: 10px;
  }

  :deep(.el-dropdown__popper.el-popper .el-popper__arrow::before) {
    display: none;
  }
}
</style>
