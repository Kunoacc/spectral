<script lang="ts" setup>
import LineChart from '@/components/lineChart/index.vue';
import { aggregateMeasurements, combineAssetsAndMeasurements, type AssetTreeMeasurements } from '@/helpers/aggregateMeasurements';
import { traverseData } from '@/helpers/traverseData';
import { useAssetsStore } from '@/stores/assets';
import { useMeasurementsStore } from '@/stores/measurements';
import type { ChartData } from 'chart.js';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

// const { params } = useRoute();
const assetsStore = useAssetsStore();
const measurementStore = useMeasurementsStore();

const defaultAssetIndex = 1;

const chartAxesConfig = ref({
  xAxis: {
    grid: {
      drawBorder: false,
      display: false,
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
      padding: 6,
    },
    scaleLabel: {
      display: true,
      labelString: "$ value",
    },
  }
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: { ...chartAxesConfig.value },
});

const chartData = ref({} as ChartData<'lineWithLine'>)

const assetAndMeaurements = computed(
  () =>
    combineAssetsAndMeasurements(assetsStore.assets, measurementStore.measurements)
);

const selectedAsset = computed(
  () => traverseData(assetAndMeaurements.value, defaultAssetIndex)
);

assetsStore.setSelectedAsset(selectedAsset.value);

const processedData = computed(() => aggregateMeasurements(selectedAsset?.value as AssetTreeMeasurements));

chartData.value = {
  labels: (Array.from(processedData.value?.keys()))?.map((value: any, index: number, array: any[]) => {
    const availableLabelSlots = 10;
    const labelSlot = Math.ceil(array.length / availableLabelSlots);
    if (index % labelSlot === 0 || index === 0) {
      return value;
    } else {
      ''
    }
  }),
  datasets: [
    {
      label: selectedAsset.value?.name,
      data: (Array.from(processedData.value?.values())),
      fill: false,
      borderWidth: 2,
      borderColor: '#FFBB00',
      backgroundColor: 'transparent',
      pointRadius: 0,
      showLine: false
    }
  ]
};
// @ts-ignore
chartOptions.value.scales.yAxis.ticks = () => {
  const max = Math.max(...chartData.value.datasets[0].data as number || [0]);
  const min = Math.min(...chartData.value.datasets[0].data as number || [0]);
  const step = (max - min) / 5;
  return {
    min: Math.ceil(min - step),
    max: Math.ceil(max + step),
    stepSize: Math.ceil(step),
  };
};
</script>

<template>
  <div>
    <LineChart :chart-data="chartData" :chart-options="chartOptions"/>
  </div>
</template>