import {
  DataLabelsOptions,
  PlotTreemapLevelsOptions,
} from "@/components/highcharts/types";
import { TreemapOptionBuilder } from "./AbstractOptionBuilder";

export class CommonMapOptionBuilder extends TreemapOptionBuilder {
  constructor() {
    super();
  }

  protected setCommonOptions(): this {
    this.setChartOption({
      type: "treemap",
      zoomType: "xy",
    })
      .setAxisOption({
        xAxis: {
          zoomEnabled: true,
        },
        yAxis: {
          zoomEnabled: true,
          visible: true,
        },
      })
      .setDefaultSeriesOptions()
      .setSeriesOptions({
        animation: { duration: 10 },
        allowTraversingTree: true,
        animationLimit: 300,
        levelIsConstant: true,
        clip: true,
        label: { onArea: true },
        borderWidth: 10,
        traverseUpButton: {
          position: { y: 10 },
        },
      })
      .setLevelOptions({ ...this.getCommonLevelOptions(), level: 1 })
      .setLevelOptions({ ...this.getCommonLevelOptions(), level: 2 })
      .setSeriesPointEventOptions({
        click() {
          // @ts-ignore
          if (!this?.parent as unknown) return;
          alert(`${this.name}, ${this.category}`);
        },

        mouseOver() {
          // @ts-ignore
          if (!this?.parent as unknown) return;
          console.log(`MouseOver Event__`);
          console.log(this);
        },
      });

    return this;
  }

  protected getCommonLevelOptions(): PlotTreemapLevelsOptions {
    return {
      layoutAlgorithm: "squarified",
      layoutStartingDirection: "horizontal",
    };
  }

  protected getCommonLabelOption(): DataLabelsOptions {
    return {
      enabled: true,
      crop: true,
      useHTML: true,
      allowOverlap: true,
      style: { textOverflow: "ellipsis" },
      inside: true,
    };
  }

  protected getSectorLabelOption(): DataLabelsOptions {
    return {};
  }

  protected getStockLabelOption(): DataLabelsOptions {
    return {};
  }
}
