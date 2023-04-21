import { computed } from 'vue'

// This is the function that we use to create a computed loading state
export function useComputedLoadingState(storeHooks: Array<any>) {
  const isLoading = computed(() => {
    return storeHooks.some((storeHook) => storeHook().loading)
  })

  return {
    isLoading
  }
}