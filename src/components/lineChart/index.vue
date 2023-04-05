<script lang="ts" setup>
import { Chart, registerables } from 'chart.js'
import { defineChartComponent } from 'vue-chart-3'
import { LineWithLineController, LineWithLineElement } from './lineWithLine'
import type { ChartData, ChartOptions } from 'chart.js'

Chart.register(LineWithLineController, LineWithLineElement, ...registerables)

const props = defineProps<{
  chartData: ChartData<'lineWithLine'>
  chartOptions: ChartOptions<'line'>
}>()

const LineWithLineChart = defineChartComponent('LineWithLineChart', 'lineWithLine')
const { chartData, chartOptions } = toRefs(props)
</script>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'CustomLineChart'
})
</script>

<template>
  <LineWithLineChart :chart-data="chartData" :options="chartOptions"></LineWithLineChart>
</template>
