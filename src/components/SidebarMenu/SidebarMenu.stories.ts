import type { AssetTreeMeasurements } from '@/helpers/aggregateMeasurements';
import SidebarMenu from './SidebarMenu.vue';
import type { StoryObj, Meta } from '@storybook/vue3';

const defaultItemsTree: AssetTreeMeasurements[] = [
  {
    id: 1,
    name: 'Item 1',
    children: [],
    measurements: []
  },
  {
    id: 2,
    name: 'Item 2',
    measurements: [],
    children: [
      {
        id: 3,
        name: 'Sub Item 1',
        children: [],
      },
    ],
  },
];

const meta: Meta<typeof SidebarMenu> = {
  title: 'Components/SidebarMenu',
  component: SidebarMenu,
  argTypes: {
    menuItems: {
      control: 'object',
      defaultValue: defaultItemsTree
    },
  },
}

export default meta;


export const Default: StoryObj<typeof SidebarMenu> = {
  args: {
    menuItems: defaultItemsTree,
  }
};