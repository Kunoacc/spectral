import { Api } from '@/api'
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

    assets.value = []
    assets.value.push(
      ...[
        {
          id: 0,
          name: 'Asset 0',
          parentId: undefined
        },
        {
          id: 1,
          name: 'Asset 1',
          parentId: undefined
        },
        {
          id: 2,
          name: 'Asset 2',
          parentId: 1
        },
        {
          id: 3,
          name: 'Asset 3',
          parentId: 1
        },
        {
          id: 4,
          name: 'Asset 4',
          parentId: 3
        }
      ]
    )
  }

  onMounted(async () => await fetchAssets())

  return {
    assets,
    fetchAssets,
    selectedAsset,
    setSelectedAsset
  }
})
