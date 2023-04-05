import { describe, it, expect, vi, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import SidebarMenu from '../sidebarMenu.vue'
import SidebarMenuItems from '../sidebarMenuItems.vue'
import { Menu } from 'ant-design-vue';
import { nextTick } from 'vue';

describe('SidebarMenu', () => {
  const mockRouter = {
    push: vi.fn(),
  };

  const mountSidebarMenu = () => {
    return mount(SidebarMenu, {
      global: {
        provide: {
          router: mockRouter,
        },
        stubs: {
          SidebarMenuItems,
          LayoutSider: true,
          Spin: true,
        },
        components: {
          Menu,
        },
      },
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the "Menu does not have items" message when menuItems is empty', async () => {
    const wrapper = mountSidebarMenu();
    await nextTick();
    expect(wrapper.text()).toContain('Menu does not have items');
  });

  it('renders the menu items when menuItems is not empty', async () => {
    const wrapper = mountSidebarMenu();

    await wrapper.setData({
      menuItems: {
        children: [
          {
            id: 1,
            name: 'Item 1',
            children: [],
          },
        ],
      },
    });
    await nextTick();
    expect(wrapper.text()).toContain('Item 1');
  });

  it('calls router.push with the correct route when a menu item is clicked', async () => {
    const wrapper = mountSidebarMenu();
    await wrapper.setData({
      menuItems: {
        children: [
          {
            id: 1,
            name: 'Item 1',
            children: [],
          },
        ],
      },
    });

    await nextTick();
    wrapper.findComponent(Menu).vm.$emit('click', { key: 1 });

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/assets/1');
  });
});
