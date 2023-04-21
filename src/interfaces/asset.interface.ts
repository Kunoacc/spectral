export interface Asset {
  id: number
  name: string
  parentId: number | undefined | null
}

export interface Assets extends Array<Asset> {}

export interface AssetTree {
  id: number
  name: string
  children: AssetTree[]
  parentId?: number | undefined | null
  isChild?: boolean
}
