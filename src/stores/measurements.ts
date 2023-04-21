import { Api } from '@/api'
import type { Measurements } from '@/interfaces/measurements.interface'
import { onMounted, ref } from 'vue'
import { createLoadableStore } from './utils/createLoadableStore'

const storeFactory = (context: ReturnType<ReturnType<typeof createLoadableStore>>) => {
  const measurements = ref([] as Measurements)

  async function fetchMeasurements() {
    await context.withLoading(async () => {
      measurements.value = await Api.measurements.getAll()
    })
    // we could use this to fetch from a local file
    // measurements.value = [...data.measurements]
  }

  onMounted(async () => await fetchMeasurements())

  return {
    measurements,
    fetchMeasurements
  }
}

export const useMeasurementsStore =
  createLoadableStore<ReturnType<typeof storeFactory>>('measurements', storeFactory)
