import { ChartPointStock, Options } from "@/components/highcharts/types";
import {
  borderColor,
  MAX_SAFE_INTEGER,
  MIN_SAFE_INTEGER,
} from "@/components/highcharts/constants";
import {
  getFontSize,
  getStockGainHtml,
  getStockNameHtml,
} from "@/components/highcharts/utils";
import { KrMapOptionBuilder } from "./KrOptionBuilder";

const { min } = Math;

/**
 * @see {https://api.highcharts.com/highcharts/}
 */
export const getChartOptions = (
  data: any[],
  mainColor = borderColor
): Options => ({
  title: {
    text: "",
  },

  subtitle: {
    text: "",
  },

  chart: {
    type: "treemap",
    backgroundColor: mainColor,
    spacing: [30, 60, 30, 60],
  },

  /**
   * Treemap Series
   * @see {https://api.highcharts.com/highcharts/series.treemap}
   */
  series: [
    {
      type: "treemap",
      data,

      animation: {
        duration: 0,
      },
      allowTraversingTree: true,
      animationLimit: 200,
      levelIsConstant: true,

      label: {
        onArea: false,
      },

      borderWidth: 10,
      borderColor: mainColor,

      levels: [
        {
          level: 1,
          layoutAlgorithm: "squarified",
          layoutStartingDirection: "horizontal",
          dataLabels: {
            enabled: true,
            crop: true,
            defer: false,
            useHTML: true,
            align: "left",
            allowOverlap: true,
            style: {
              textOverflow: "ellipsis",
            },

            inside: true,
            z: 20,
            padding: 3,
            verticalAlign: "top",
            backgroundColor: mainColor,

            formatter() {
              const {
                shapeArgs: {
                  width = MAX_SAFE_INTEGER,
                  height = MAX_SAFE_INTEGER,
                },
              } = this.point as ChartPointStock;
              const fontSize = getFontSize(min(width, height));
              if (fontSize <= 0) return ``;
              return `<span class="sector-label ${
                mainColor === borderColor ? "black-theme" : "white-theme"
              }" style="font-size: ${fontSize}px">${this.key}</span>`;
            },
          },
          borderColor: mainColor,
          borderWidth: 10,
        },
        {
          level: 2,
          layoutAlgorithm: "squarified",
          layoutStartingDirection: "horizontal",
          dataLabels: {
            enabled: true,
            defer: true,
            useHTML: true,
            crop: true,
            style: {
              textAlign: "center",
              textOverflow: "hidden",
            },
            z: 10,
            formatter() {
              /** @description 신규상장주인 경우 시가총액 데이터 없음 */
              if (!(this.point as ChartPointStock)?.shapeArgs) return ``;

              const {
                gains = 0,
                shapeArgs: {
                  width = MAX_SAFE_INTEGER,
                  height = MAX_SAFE_INTEGER,
                },
              } = this.point as ChartPointStock;

              const pointSize = min(width, height);

              const infos: string[] = [];
              infos.push(getStockNameHtml(this.key ?? "", pointSize));
              infos.push(getStockGainHtml(gains, pointSize));
              return infos.join(`<br />`);
            },
          },
          borderWidth: 1,
        },
      ], // series.levels

      point: {
        events: {
          click() {
            // @ts-ignore
            if (!this?.parent as unknown) return;
            alert(this.name);
          },
        },
      }, // series.point

      traverseUpButton: {
        position: {
          y: 10,
        },
      },
    },
  ], // series

  plotOptions: {
    series: {
      cursor: "pointer",
    },
  },

  tooltip: {
    enabled: false,
  },
});

export const globalOptions: Options = {
  boost: {
    enabled: true,
    useGPUTranslations: true,
  },

  data: {
    dateFormat: "YYYY/mm/dd",
  },

  /** 공유/다운로드 버튼 */
  exporting: {
    buttons: {
      contextButton: {
        enabled: true,
      },
    },
  },

  responsive: {
    rules: [
      {
        condition: {},
        chartOptions: {},
      },
    ],
  },
};

export const krMapOptionBuilder = new KrMapOptionBuilder();
