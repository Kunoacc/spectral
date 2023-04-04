interface Measurement {
  assetId: number;
  measurements: Record<string, number>
}

export interface Measurements extends Array<Measurement> {}