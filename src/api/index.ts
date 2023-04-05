import type { ClientGet, ClientPatch, ClientPost } from '@/helpers/http'
import { get as GetMethod, post as PostMethod, patch as PatchMethod } from '@/helpers/http'
import { assets } from './assets'
import { measurements } from './measurements'

const api = (
  get: ClientGet = GetMethod,
  post: ClientPost = PostMethod,
  patch: ClientPatch = PatchMethod
) => ({
  assets: { ...assets(get, post, patch) },
  measurements: { ...measurements(get, post, patch) }
})

export default api

export const Api = api()
