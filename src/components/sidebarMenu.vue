<script lang="ts" setup>
import { Menu, LayoutSider, Spin } from 'ant-design-vue'
import { computed } from 'vue';
import SidebarMenuItems from './sidebarMenuItems.vue';
import { useMeasurementsStore } from '@/stores/measurements';
import { useAppStateStore } from '@/stores/appState';
import type { AssetTreeMeasurements } from '@/helpers/aggregateMeasurements';
import { combineAssetsAndMeasurements } from '@/helpers/aggregateMeasurements';
import { useAssetsStore } from '@/stores/assets';


const measurementsStore = useMeasurementsStore()
const assetStore = useAssetsStore()
const appStateStore = useAppStateStore()
const menuItems = computed(() =>
  combineAssetsAndMeasurements(assetStore.assets, measurementsStore.measurements)
)
</script>

<style lang="scss">
.light {
  background: #fff;
}
</style>

<template>
  <Spin :spinning="appStateStore.isLoading('SidebarMenu')">
    <LayoutSider>
      <div v-if="!menuItems?.children?.length" class="light">
        <p>Menu does not have items</p>
      </div>
      <Menu v-else mode="inline" theme="light" 
        :defaultSelectedKeys="menuItems.children[0].id" 
        :defaultOpenKeys="menuItems.children[0].id">
        <SidebarMenuItems :items="(menuItems.children as AssetTreeMeasurements[])"></SidebarMenuItems>
      </Menu>
    </LayoutSider>
  </Spin>
</template>