import type api from '@/api'
import type { InjectionKey } from 'vue'

export const apiInjectionKey = Symbol() as InjectionKey<ReturnType<typeof api>>
