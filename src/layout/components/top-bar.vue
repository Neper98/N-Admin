<template>
  <div class="topbar">
    <div class="topbar__icon--collapse" :class="{ collapse }" @click="toggleCollapse">
      <i-ep-Expand v-if="collapse" />
      <i-ep-Fold v-else />
    </div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <transition-group name="breadcrumb" mode="out-in">
        <template v-for="{ meta, path, name } in breadList" :key="path">
          <el-breadcrumb-item v-if="name">
            {{ meta.title }}
          </el-breadcrumb-item>
        </template>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGlobalStore } from '@/stores'
import { ArrowRight } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'

const route = useRoute()
const breadList = computed(() => route.matched)
const { collapse } = storeToRefs(useGlobalStore())

// 切换侧边栏
const toggleCollapse = () => {
  collapse.value = !collapse.value
}
</script>

<style lang="scss" scoped>
.topbar {
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #ebeef5;
}

.topbar__icon--collapse {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  cursor: pointer;

  &:hover {
    background-image: linear-gradient(90deg, var(--el-color-primary-light-9), transparent);
  }

  &.collapse:hover {
    background-image: linear-gradient(-90deg, var(--el-color-primary-light-9), transparent);
  }
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
