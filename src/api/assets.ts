import type { ClientGet, ClientPatch, ClientPost } from '@/helpers/http'
import type { Asset, Assets } from '@/interfaces/asset.interface'

export const assets = (get: ClientGet, post: ClientPost, patch: ClientPatch) => ({
  async getAll(filters?: {}): Promise<Assets> {
    try {
      const response = await get<Assets>('/642d8b98ace6f33a22053cab', filters)
      return response?.parsedBody as Assets
    } catch (error) {
      throw new Error(error as unknown as string)
    }
  },

  async getSingle(id: number, filters?: {}): Promise<Asset> {
    try {
      const response = await this.getAll(filters)
      return response.filter((data) => data.id == id)[0] as Asset
    } catch (error) {
      throw new Error(error as unknown as string)
    }
  }
})
