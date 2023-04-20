import { Api } from '@/api'
import data from '@/data'
import type { AssetTreeMeasurements } from '@/helpers/aggregateMeasurements'
import type { Assets } from '@/interfaces/asset.interface'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

export const useAssetsStore = defineStore('assets', () => {
  const assets = ref([] as Assets)

  const selectedAsset = ref(null as AssetTreeMeasurements | null)

  function setSelectedAsset(asset: AssetTreeMeasurements | null) {
    selectedAsset.value = asset
  }

  async function fetchAssets() {
    // we could use this to fetch from an API
    // assets.value = await Api.assets.getAll()

    assets.value = [...data.assets]
  }

  onMounted(async () => await fetchAssets())

  return {
    assets,
    fetchAssets,
    selectedAsset,
    setSelectedAsset
  }
})
