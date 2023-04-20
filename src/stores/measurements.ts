import { Api } from '@/api'
import data from '@/data'
import type { Measurements } from '@/interfaces/measurements.interface'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

export const useMeasurementsStore = defineStore('measurements', () => {
  const measurements = ref([] as Measurements)

  async function fetchMeasurements() {
    // we could use this to fetch from an API
    // measurements.value = await Api.measurements.getAll()

    measurements.value = [...data.measurements]
  }

  onMounted(async () => await fetchMeasurements())

  return {
    measurements,
    fetchMeasurements
  }
})
