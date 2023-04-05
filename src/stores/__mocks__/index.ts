import { vi } from 'vitest'

export const measurementsStoreMock = {
  measurements: []
}

export const assetStoreMock = {
  assets: [],
  selectedAsset: null
}

export const appStateStoreMock: {} = {
  isLoading: vi.fn(() => false)
}
