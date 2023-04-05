export interface Measurement {
  assetId: number
  measurements: Map<any, any> | Record<string, any>
}

export interface Measurements extends Array<Measurement> {}
