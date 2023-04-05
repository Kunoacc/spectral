import { LineWithLineControllerDatasetOptions } from './lineWithLine'

declare module 'chart.js' {
  export interface ChartTypeRegistry {
    lineWithLine: {
      chartOptions: CoreChartOptions<'lineWithLine'>
      datasetOptions: LineWithLineControllerDatasetOptions
      defaultDataPoint: number[]
      parsedDataType: number[]
      scales: never
    }
  }
}

export {}
