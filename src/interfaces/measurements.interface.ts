export interface Measurement {
  assetId: number;
  measurements: Map<any, any>
}

export interface Measurements extends Array<Measurement> { }