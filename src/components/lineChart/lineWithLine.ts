import { LineController, LineElement } from 'chart.js'
import type { LineControllerDatasetOptions, LineOptions, LineProps, PointProps } from 'chart.js'

// Define new chart type dataset interface
export interface LineWithLineControllerDatasetOptions extends LineControllerDatasetOptions {}

// Define new chart type data point interface
export interface LineWithLineDataPoint extends PointProps {}

// Define new chart type properties
export interface LineWithLineProps extends LineProps {}

// Define new chart type options
export interface LineWithLineOptions extends LineOptions {}

// Define new chart type element
export class LineWithLineElement extends LineElement {}

// Define Chart Controller for new chart type
export class LineWithLineController extends LineController {
  draw(): void {
    super.draw()
    const self = this
    if (self?.chart?.tooltip?.active && self.chart.tooltip.getActiveElements().length) {
      const tooltipLeft = self.chart.tooltip.getActiveElements()[0].element.x
      const chartBottom = self.chart.chartArea.bottom
      const chartTop = self?.chart?.legend?.top
      const context = self.chart.ctx

      context.save()
      context.beginPath()
      context.setLineDash([4, 4])
      context.moveTo(tooltipLeft, chartTop as number)
      context.lineTo(tooltipLeft, chartBottom)
      context.lineWidth = 2
      context.strokeStyle = '#ccc'
      context.stroke()
      context.restore()
    }
  }
}

// Define chart controller settings for new chart type
LineWithLineController.defaults = LineController.defaults

// Define chart controller settings for new chart type
LineWithLineController.id = 'lineWithLine'
