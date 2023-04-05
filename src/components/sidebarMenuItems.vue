<script lang="ts" setup>
import type { AssetTreeMeasurements } from '@/helpers/aggregateMeasurements';
import { MenuItem, SubMenu } from 'ant-design-vue'
import { defineComponent, toRefs } from 'vue';

const props = defineProps<{
  items: AssetTreeMeasurements[]
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
    <SubMenu v-else :key="item.id + item.name" :title="item.name + ' Category'">
      <MenuItem :key="item.id">{{ item.name }}</MenuItem>
      <SidebarMenuItems :items="(item.children as AssetTreeMeasurements[])"></SidebarMenuItems>
    </SubMenu>
  </template>
</template>