import { defineStore } from "pinia";
import { ref } from "vue";

export function createLoadableStore<T>(storeId: string, storeFactory: (arg: any) => T) {
  return defineStore(storeId, () => {
    const loading = ref(false);

    // this function triggers the loading state update and returns the result of the original function
    async function withLoading(fn: (...args: any) => Promise<any>, ...args: any[]) {
      loading.value = true;
      try {
        // @ts-ignore
        return await fn.apply(this, args);
      } finally {
        loading.value = false;
      }
    }

    return {
      ...storeFactory({ loading, withLoading }),
      loading,
      withLoading
    }
  })
}

export type CreateLoadableStore<T> = Pick<T, Exclude<keyof T, "loading" | "withLoading">> & ReturnType<ReturnType<typeof createLoadableStore<T>>>;