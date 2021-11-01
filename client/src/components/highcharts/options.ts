import { ChartPointStock, Options } from "@/components/highcharts/types";
import { borderColor } from "@/components/highcharts/constants";
import {
  getLogoHtml,
  getStockGainHtml,
  getStockNameHtml,
} from "@/components/highcharts/utils";

const { MAX_SAFE_INTEGER } = Number;

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
    // text: "[SubTitle] Treemap Chart Test",
  },

  chart: {
    type: "treemap",
    zoomType: "xy",
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
      animationLimit: 300,
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
          // layoutAlgorithm: "sliceAndDice",
          layoutStartingDirection: "horizontal",
          dataLabels: {
            enabled: true,
            crop: false,
            defer: false,
            useHTML: true,
            align: "left",
            allowOverlap: false,
            style: {
              backgroundColor: mainColor,

              textOverflow: "ellipsis",
            },
            inside: true,
            padding: 5,
            verticalAlign: "top",
            backgroundColor: mainColor,

            formatter() {
              const {
                shapeArgs: {
                  width = MAX_SAFE_INTEGER,
                  height = MAX_SAFE_INTEGER,
                },
              } = this.point as ChartPointStock;
              const relativeSize = Math.min(width, height) * 0.07;

              return `<span class="sector-label ${
                mainColor === borderColor ? "black-theme" : "white-theme"
              }" style="font-size: ${relativeSize}px">${this.key}</span>`;
            },
          },
          borderColor: mainColor,
          borderWidth: 10,
        },
        {
          level: 2,
          layoutAlgorithm: "squarified",
          // layoutAlgorithm: "sliceAndDice",
          // layoutAlgorithm: "stripes",
          // layoutAlgorithm: "strip",
          layoutStartingDirection: "horizontal",
          dataLabels: {
            enabled: true,
            defer: true,
            useHTML: true,
            crop: true,
            style: {
              textAlign: "center",
            },
            formatter() {
              /** @description 신규상장주인 경우 시가총액 데이터 없음 */
              if (!(this.point as ChartPointStock)?.shapeArgs) return ``;

              const {
                gains = 0,
                logoSrc,
                shapeArgs: {
                  width = MAX_SAFE_INTEGER,
                  height = MAX_SAFE_INTEGER,
                },
              } = this.point as ChartPointStock;

              const relativeSize = Math.min(width, height);

              const infos: string[] = [];
              if (logoSrc) infos.push(getLogoHtml(logoSrc, relativeSize));
              infos.push(getStockNameHtml(this.key ?? "", relativeSize));
              infos.push(getStockGainHtml(gains, relativeSize));
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
          // y: -35,
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
        condition: {
          maxWidth: 1200,
          minHeight: 600,
        },
        chartOptions: {},
      },
    ],
  },
};
