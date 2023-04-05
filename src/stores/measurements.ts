import { Api } from '@/api'
import type { Measurements } from '@/interfaces/measurements.interface'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

export const useMeasurementsStore = defineStore('measurements', () => {
  const measurements = ref([] as Measurements)

  async function fetchMeasurements() {
    // we could use this to fetch from an API
    // measurements.value = await Api.measurements.getAll()

    measurements.value = [
      {
        assetId: 0,
        measurements: {
          '2020-01-01T00:00:00.000Z': 156,
          '2020-02-01T00:00:00.000Z': 123,
          '2020-03-01T00:00:00.000Z': 128,
          '2020-04-01T00:00:00.000Z': 159,
          '2020-05-01T00:00:00.000Z': 178,
          '2020-06-01T00:00:00.000Z': 290,
          '2020-07-01T00:00:00.000Z': 276,
          '2020-08-01T00:00:00.000Z': 250,
          '2020-09-01T00:00:00.000Z': 156,
          '2020-10-01T00:00:00.000Z': 176,
          '2020-11-01T00:00:00.000Z': 134,
          '2020-12-01T00:00:00.000Z': 111
        }
      },
      {
        assetId: 2,
        measurements: {
          '2020-01-01T00:00:00.000Z': 141,
          '2020-02-01T00:00:00.000Z': 125,
          '2020-03-01T00:00:00.000Z': 113,
          '2020-04-01T00:00:00.000Z': 151,
          '2020-05-01T00:00:00.000Z': 107,
          '2020-06-01T00:00:00.000Z': 116,
          '2020-07-01T00:00:00.000Z': 125,
          '2020-08-01T00:00:00.000Z': 146,
          '2020-09-01T00:00:00.000Z': 101,
          '2020-10-01T00:00:00.000Z': 126,
          '2020-11-01T00:00:00.000Z': 151,
          '2020-12-01T00:00:00.000Z': 148
        }
      },
      {
        assetId: 4,
        measurements: {
          '2020-01-01T00:00:00.000Z': 142,
          '2020-02-01T00:00:00.000Z': 164,
          '2020-03-01T00:00:00.000Z': 112,
          '2020-04-01T00:00:00.000Z': 114,
          '2020-05-01T00:00:00.000Z': 170,
          '2020-06-01T00:00:00.000Z': 130,
          '2020-07-01T00:00:00.000Z': 132,
          '2020-08-01T00:00:00.000Z': 129,
          '2020-09-01T00:00:00.000Z': 157,
          '2020-10-01T00:00:00.000Z': 128,
          '2020-11-01T00:00:00.000Z': 110,
          '2020-12-01T00:00:00.000Z': 168
        }
      }
    ]
  }

  onMounted(async () => await fetchMeasurements())

  return {
    measurements,
    fetchMeasurements
  }
})
