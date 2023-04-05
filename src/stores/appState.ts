import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStateStore = defineStore('appState', () => {
  const isDrawerOpen = ref(false);
  const loadingModules = ref([] as string[]);


  function isLoading(module: string) {
    return loadingModules.value.includes(module);
  }

  return {
    isDrawerOpen,
    loadingModules,
    isLoading
  }
})