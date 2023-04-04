import {
  LineController,
  LineElement,
} from "chart.js";
import type { LineControllerDatasetOptions, LineOptions, LineProps, PointProps } from 'chart.js'

// Typing for Tooling
export interface LineWithLineControllerDatasetOptions
  extends LineControllerDatasetOptions { }

export interface LineWithLineDataPoint extends PointProps { }

export interface LineWithLineProps extends LineProps { }

export interface LineWithLineOptions extends LineOptions { }

// Define Chart Controller for new chart type
export class LineWithLineController extends LineController {

  draw(): void {
    super.draw();
    const self = this;
    if (
      self?.chart?.tooltip?.active &&
      self.chart.tooltip.getActiveElements().length
    ) {
      const tooltipLeft = self.chart.tooltip.getActiveElements()[0].element.x;
      const chartBottom = self.chart.chartArea.bottom;
      const chartTop = self?.chart?.legend?.top;
      const context = self.chart.ctx;

      context.save();
      context.beginPath();
      context.setLineDash([4, 4]);
      context.moveTo(tooltipLeft, chartTop as number);
      context.lineTo(tooltipLeft, chartBottom);
      context.strokeStyle = "#ccc";
      context.lineWidth = 1;
      context.stroke();
      context.restore();
    }
  }
}

// Define chart controller settings for new chart type
LineWithLineController.defaults = LineController.defaults;

LineWithLineController.id = "lineWithLine";

// Define new chart type element
export class LineWithLineElement extends LineElement { }
