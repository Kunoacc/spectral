<script lang="ts" setup>
import { Menu, LayoutSider, Spin } from 'ant-design-vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Key } from 'ant-design-vue/lib/_util/type'
import type { AssetTreeMeasurements } from '@/helpers/aggregateMeasurements'
import SidebarMenuItems from '../SidebarMenuItems/SidebarMenuItems.vue'
import { useMeasurementsStore } from '@/stores/measurements'
import { combineAssetsAndMeasurements } from '@/helpers/aggregateMeasurements'
import { useAssetsStore } from '@/stores/assets'
import { useComputedLoadingState } from '@/composables/useComputedLoadingState' 
import { storeToRefs } from 'pinia'

const measurementsStore = useMeasurementsStore()
const { measurements } = storeToRefs(measurementsStore)

const assetStore = useAssetsStore()
const { assets } = storeToRefs(assetStore)

const { push } = useRouter()

const { isLoading } = useComputedLoadingState([
  useMeasurementsStore, useAssetsStore
])

const menuItems = computed(() =>
  combineAssetsAndMeasurements(assets.value, measurements.value)
)

const selectedMenuItem = computed(() => {
  if (!assetStore.selectedAsset) return []
  return [assetStore.selectedAsset.id as number]
})

const handleMenuItemClick = ({ key }: any) => {
  push(`/assets/${key}`)
}

const handleSubMenuItemClick = (e: MouseEvent, key: Key) => {
  if (key !== assetStore.selectedAsset?.id) push(`/assets/${key}`)
}
</script>

<style lang="scss">
.light {
  background: #fff;
}
</style>

<template>
  <Spin :spinning="isLoading">
    <LayoutSider>
      <div v-if="!menuItems?.children?.length" class="light">
        <p>Menu does not have items</p>
      </div>
      <Menu
        v-else
        mode="inline"
        theme="light"
        @click="handleMenuItemClick"
        :selectedKeys="selectedMenuItem"
      >
        <SidebarMenuItems
          :submenuClickHandler="handleSubMenuItemClick"
          :items="(menuItems.children as AssetTreeMeasurements[])"
        ></SidebarMenuItems>
      </Menu>
    </LayoutSider>
  </Spin>
</template>
