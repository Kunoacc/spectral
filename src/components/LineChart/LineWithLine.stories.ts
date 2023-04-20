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
      fill: false,
      backgroundColor: 'transparent',
      pointRadius: 2,
      showLine: true,
      tension: 0.4,
      spanGaps: true
    },
  ],
};

const defaultChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxis: {
      grid: {
        drawBorder: false,
        display: false
      },
      ticks: {
        maxTicksLimit: 10,
        minRotation: 30,
        maxRotation: 30,
        padding: 8,
        autoSkip: false
      }
    },
    yAxis: {
      ticks: {
        padding: 6
      },
    }
   },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true,
      mode: 'index',
      intersect: false
    }
  }
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