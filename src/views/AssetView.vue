<script lang="ts" setup>
import LineChart from '@/components/LineChart/index.vue'
import {
  aggregateMeasurements,
  combineAssetsAndMeasurements,
  type AssetTreeMeasurements
} from '@/helpers/aggregateMeasurements'
import { traverseData } from '@/helpers/traverseData'
import { useAppStateStore } from '@/stores/appState'
import { useAssetsStore } from '@/stores/assets'
import { useMeasurementsStore } from '@/stores/measurements'
import type { ChartData } from 'chart.js'
import { computed, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'

const route = useRoute()
const assetsStore = useAssetsStore()
const measurementStore = useMeasurementsStore()
const appStateStore = useAppStateStore()

const defaultAssetIndex = ref(parseInt(route.params?.id as string) || 0)

const chartAxesConfig = ref({
  xAxis: {
    grid: {
      drawBorder: false,
      display: false
    },
    ticks: {
      maxTicksLimit: 10,
      minRotation: 30,
      maxRotation: 30,
      padding: 8,
      autoSkip: false
    }
  },
  yAxis: {
    ticks: {
      padding: 6
    },
    scaleLabel: {
      display: false
    }
  }
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: { ...chartAxesConfig.value },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true,
      mode: 'index',
      intersect: false,
      callbacks: {
        label: (context: any) => {
          return `${context.dataset.label}: ${context.formattedValue}`
        }
      }
    }
  }
})

// combine assets and measurements into a single object
const assetAndMeaurements = computed(() =>
  combineAssetsAndMeasurements(assetsStore.assets, measurementStore.measurements)
)

// traverse the combined object to get the selected asset
const selectedAsset = computed(() =>
  traverseData(assetAndMeaurements.value, defaultAssetIndex.value)
)

// aggregate measurements for the selected asset
const processedData = computed(() =>
  aggregateMeasurements(selectedAsset?.value as AssetTreeMeasurements)
)

// set chart labels with bounds of the largest and smallest numbers in data and 10 steps
const chartData = computed(
  () =>
    ({
      labels: Array.from(processedData.value?.keys())?.map(
        (value: any, index: number, array: any[]) => {
          const availableLabelSlots = 10
          const labelSlot = Math.ceil(array.length / availableLabelSlots)
          if (index % labelSlot === 0 || index === 0) {
            return value
          } else {
            ;('')
          }
        }
      ),
      datasets: [
        {
          label: selectedAsset.value?.name,
          data: Array.from(processedData.value?.values()),
          fill: false,
          borderWidth: 2,
          borderColor: appStateStore.completePalette.primaryColor,
          backgroundColor: 'transparent',
          pointRadius: 2,
          showLine: true,
          tension: 0.4,
          spanGaps: true
        }
      ]
    } as ChartData<'lineWithLine'>)
)

// set chart y-axis ticks with bounds of the largest and smallest numbers in data and 5 steps
// @ts-ignore
chartOptions.value.scales.yAxis.ticks = () => {
  const max = Math.max(...((chartData.value.datasets[0].data as unknown as number[]) || [0]))
  const min = Math.min(...((chartData.value.datasets[0].data as unknown as number[]) || [0]))
  const step = (max - min) / 5
  return {
    min: Math.ceil(min - step),
    max: Math.ceil(max + step),
    stepSize: Math.ceil(step)
  }
}

// watch route id and fetch assets, measurements, and set default asset index to trigger recalculation
watch(
  () => route.params.id,
  async (newId) => {
    await assetsStore.fetchAssets()
    await measurementStore.fetchMeasurements()
    defaultAssetIndex.value = parseInt(newId as string) || 0
  }
)

// watch selected asset and set it in the store
watch(
  () => selectedAsset.value,
  (newAsset) => {
    if (newAsset) {
      assetsStore.setSelectedAsset(newAsset)
    }
  },
  { immediate: true }
)

// reset selected asset before leaving the route
onBeforeRouteLeave(() => {
  assetsStore.setSelectedAsset(null)
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 0 1rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: left;
}

.page-chart {
  width: 100%;
  height: 100%;
}

.page-chart-helper {
  font-size: 0.75rem;
  text-align: center;
  margin-top: 0.5rem;
  color: #666;
  align-self: center;
  padding: 1rem 0;
}
</style>

<template>
  <div class="container">
    <h2 class="page-title">{{ selectedAsset?.name }}</h2>
    <LineChart :chart-data="chartData" :chart-options="chartOptions" class="page-chart" />
    <small
      class="page-chart-helper"
      v-if="!selectedAsset?.measurements.size && selectedAsset?.children.length"
    >
      This chart has no data, instead the sum of it's children is used
    </small>
  </div>
</template>
