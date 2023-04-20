import LineWithLine from './index.vue';
import type { StoryObj, Meta } from '@storybook/vue3';
import type { ChartData, ChartOptions } from 'chart.js';

const defaultChartData: ChartData<'lineWithLine'> = {
  labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [12, 19, 3, 5],
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
    },
  ],
};

const defaultChartOptions: ChartOptions<'line'> = {
  responsive: true,
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
    },
  },
};

const meta: Meta<typeof LineWithLine> = {
  title: 'Components/LineWithLine',
  component: LineWithLine,
  argTypes: {
    chartData: {
      control: 'object',
      defaultValue: defaultChartData,
    },
    chartOptions: {
      control: 'object',
      defaultValue: defaultChartOptions,
    },
  },
};

export default meta;

export const Default: StoryObj<typeof LineWithLine> = {
  args: {
    chartData: defaultChartData,
    chartOptions: defaultChartOptions,
  },
};