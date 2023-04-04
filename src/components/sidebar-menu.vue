<script lang="ts" setup>
import { convertToNested } from '@/helpers/convertToNested';
import type { Assets } from '@/interfaces/asset.interface';
import { Menu, LayoutSider, Spin } from 'ant-design-vue'
import { computed, toRefs } from 'vue';
import SidebarMenuItems from './sidebar-menu-items.vue';

const props = defineProps<{
  loading: boolean,
  items: Assets
}>()

const { loading, items } = toRefs(props)
const menuItems = computed(() => convertToNested(items.value))
</script>

<style lang="scss">
.light {
  background: #fff;
}
</style>

<template>
  <Spin :spinning="loading">
    <LayoutSider>
      <div v-if="!menuItems?.children?.length" class="light">
        <p>Menu does not have items</p>
      </div>
      <Menu v-else mode="inline" theme="light" :defaultSelectedKeys="menuItems.children[0].id" :defaultOpenKeys="menuItems.children[0].id">
        <SidebarMenuItems :items="menuItems.children"></SidebarMenuItems>
      </Menu>
    </LayoutSider>
  </Spin>
</template>