import { ConfigProvider } from 'ant-design-vue'
import { defineStore } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { changeAntdTheme, generateThemeColor } from 'mini-dynamic-antd-theme'

export const useAppStateStore = defineStore('appState', () => {
  const activePalette = ref(null as (typeof colorPalettes.value)[number] | null)

  const colorPalettes = ref([
    {
      primaryColor: '#1890ff',
      errorColor: '#ff4d4f',
      warningColor: '#faad14',
      successColor: '#52c41a',
      infoColor: '#1890ff'
    },
    {
      primaryColor: '#1565C0',
      errorColor: '#C62828',
      warningColor: '#FF8F00',
      successColor: '#2E7D32',
      infoColor: '#0277BD'
    },
    {
      primaryColor: '#6A1B9A',
      errorColor: '#B71C1C',
      warningColor: '#FF6F00',
      successColor: '#1B5E20',
      infoColor: '#283593'
    },
    {
      primaryColor: '#F57F17',
      errorColor: '#D32F2F',
      warningColor: '#FFA000',
      successColor: '#388E3C',
      infoColor: '#0D47A1'
    },
    {
      primaryColor: '#00897B',
      errorColor: '#C2185B',
      warningColor: '#F57C00',
      successColor: '#689F38',
      infoColor: '#303F9F'
    }
  ])

  function setPalette(palette: number) {
    const paletteColors = colorPalettes.value[palette]
    ConfigProvider.config({
      theme: paletteColors
    })
    changeAntdTheme(paletteColors.primaryColor)
    activePalette.value = paletteColors
  }

  const completePalette = computed(() => ({
    ...activePalette.value,
    ...generateThemeColor(activePalette?.value?.primaryColor)
  }))

  onMounted(() => setPalette(0))

  return {
    setPalette,
    colorPalettes,
    activePalette,
    completePalette
  }
})
