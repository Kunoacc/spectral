import type { AssetTreeMeasurements } from '@/helpers/aggregateMeasurements';
import SidebarMenuItems from './SidebarMenuItems.vue';
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

const meta: Meta<typeof SidebarMenuItems> = {
  title: 'Components/SidebarMenuItems',
  component: SidebarMenuItems,
  argTypes: {
    items: {
      control: 'object',
      defaultValue: defaultItemsTree
    },
    submenuClickHandler: {
      action: 'submenuClickHandler',
    },
  },
}

export default meta;


export const Default: StoryObj<typeof SidebarMenuItems> = {
  args: {
    items: defaultItemsTree,
  }
};