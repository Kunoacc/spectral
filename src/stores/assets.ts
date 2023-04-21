import { Api } from '@/api'
import type { AssetTreeMeasurements } from '@/helpers/aggregateMeasurements'
import type { Assets } from '@/interfaces/asset.interface'
import { onMounted, ref } from 'vue'
import { createLoadableStore } from './utils/createLoadableStore'

const storeFactory = (context: ReturnType<ReturnType<typeof createLoadableStore>>) => {
  const assets = ref([] as Assets)

  const selectedAsset = ref(null as AssetTreeMeasurements | null)

  function setSelectedAsset(asset: AssetTreeMeasurements | null) {
    selectedAsset.value = asset
  }

  async function fetchAssets() {
    await context.withLoading(async () => {
      assets.value = await Api.assets.getAll()
    })

    // we could use this to fetch from a local file
    // assets.value = [...data.assets]
  }

  onMounted(async () => await fetchAssets())

  return {
    assets,
    fetchAssets,
    selectedAsset,
    setSelectedAsset
  }
}

export const useAssetsStore =
  createLoadableStore<ReturnType<typeof storeFactory>>('assets', storeFactory)