<script lang="ts" setup>
import type { AssetTree } from '@/interfaces/asset.interface';
import { MenuItem, SubMenu } from 'ant-design-vue'
import { defineComponent, toRefs } from 'vue';

const props = defineProps<{
  items: AssetTree[]
}>()

const { items } = toRefs(props)
</script>

<script lang="ts">
export default defineComponent({
  name: 'SidebarMenuItems'
})
</script>

<style lang="scss"></style>

<template>
  <template v-for="item in items" :key="item.id">
    <MenuItem :key="item.id" v-if="!item.children.length">{{ item.name }}</MenuItem>
    <SubMenu v-else :key="item.id + item.name" :title="item.name">
      <SidebarMenuItems :items="item.children"></SidebarMenuItems>
    </SubMenu>
  </template>
</template>