interface Asset {
  id: number;
  name: string;
  parentId: number;
}

export interface Assets extends Array<Asset> { }

export interface AssetTree {
  id: number;
  name: string;
  children: AssetTree[];
  parentId?: number | null;
  isChild?: boolean;
}