import type { ClientGet, ClientPatch, ClientPost } from '@/helpers/http'
import type { Measurement, Measurements } from '@/interfaces/measurements.interface'

export const measurements = (get: ClientGet, post: ClientPost, patch: ClientPatch) => ({
  async getAll(filters?: {}): Promise<Measurements> {
    try {
      const response = await get<Measurements>('/642c6042c0e7653a059db721', filters)
      return response?.parsedBody as Measurements
    } catch (error) {
      throw new Error(error as unknown as string)
    }
  },

  async getSingle(id: number, filters?: {}): Promise<Measurement> {
    try {
      const response = await this.getAll(filters)
      return response.filter((data) => data.assetId == id)[0] as Measurement
    } catch (error) {
      throw new Error(error as unknown as string)
    }
  }
})
