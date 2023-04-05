import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SidebarMenu from '../SidebarMenu.vue'
import SidebarMenuItems from '../SidebarMenuItems.vue'
import { Menu, Spin, LayoutSider } from 'ant-design-vue'
import { nextTick } from 'vue'
import { assetStoreMock, measurementsStoreMock } from '@/stores/__mocks__'

const useRouterMock = {
  push: vi.fn()
}

describe('SidebarMenu', () => {
  vi.mock('vue-router', () => ({
    useRouter: () => useRouterMock
  }))

  vi.mock('@/stores/measurements', () => ({
    useMeasurementsStore: () => measurementsStoreMock
  }))

  vi.mock('@/stores/assets', () => ({
    useAssetsStore: () => assetStoreMock
  }))

  const mountSidebarMenu = () => {
    return mount(SidebarMenu, {
      global: {
        components: {
          Menu,
          SidebarMenuItems,
          LayoutSider,
          Spin
        }
      }
    })
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the "Menu does not have items" message when menuItems is empty', async () => {
    const wrapper = mountSidebarMenu()
    await nextTick()
    expect(wrapper.text()).toContain('Menu does not have items')
  })

  it('renders the menu items when menuItems is not empty', async () => {
    const wrapper = mountSidebarMenu()
    const vm = wrapper.vm as any
    vm.assetStore.assets.push({
      id: 0,
      name: 'Item 1',
      parentId: undefined
    })
    await nextTick()
    expect(wrapper.text()).toContain('Item 1')
  })

  it('calls router.push with the correct route when a menu item is clicked', async () => {
    const wrapper = mountSidebarMenu()
    const vm = wrapper.vm as any
    vm.assetStore.assets.push({
      id: 0,
      name: 'Item 1',
      parentId: undefined
    })
    await nextTick()
    wrapper.findComponent(Menu).vm.$emit('click', { key: 1 })
    expect(useRouterMock.push).toHaveBeenCalledTimes(1)
    expect(useRouterMock.push).toHaveBeenCalledWith('/assets/1')
  })
})
