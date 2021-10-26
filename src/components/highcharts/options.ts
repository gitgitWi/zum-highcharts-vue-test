import { Options, TreemapStock } from "@/components/highcharts/types";
import { borderColor } from "@/components/highcharts/constants";
import {
  getLogoHtml,
  getStockGainHtml,
  getStockNameHtml,
} from "@/components/highcharts/utils";

/**
 * @see {https://api.highcharts.com/highcharts/}
 */
export const getChartOptions = (data: any[]): Options => ({
  title: {
    text: "[Title] US Stock Market Map",
  },

  subtitle: {
    text: "[SubTitle] Treemap Chart Test",
  },

  chart: {
    type: "treemap",
    /**
     * @todo
     * CSS 사용해 커스텀하는 경우 true로 변경하고 모든 스타일 직접 지정해야 함
     */
    // styledMode: true,
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
      borderColor,

      levels: [
        {
          level: 1,
          // layoutAlgorithm: "squarified",
          layoutAlgorithm: "sliceAndDice",
          layoutStartingDirection: "horizontal",
          dataLabels: {
            enabled: true,
            crop: false,
            defer: false,
            useHTML: true,
            align: "left",
            allowOverlap: false,
            style: {
              backgroundColor: borderColor,
              fontSize: "16px",
              fontWeight: "900",
              textOverflow: "ellipsis",
            },
            inside: false,
            padding: 5,
            verticalAlign: "top",
            backgroundColor: borderColor,
          },
          borderColor,
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
              const { MAX_SAFE_INTEGER } = Number;

              const {
                gains = 0,
                logoSrc,
                // @ts-ignore
                shapeArgs: {
                  width = MAX_SAFE_INTEGER,
                  height = MAX_SAFE_INTEGER,
                },
              } = this.point as unknown as TreemapStock;
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

      tooltip: {
        followPointer: true,
        pointFormatter() {
          const header = `<span style="font-weight: bold; font-style: italic;">${this.name}</span>`;
          const infos: string[] = [header];

          const { value = 0, gains = 0 } = this as unknown as TreemapStock;
          if (value) infos.push(`market cap: $${value.toLocaleString()}`);
          if (gains) infos.push(`gains: ${gains.toFixed(2)}%`);
          return infos.join(`<br />`);
        },
      }, // series.tooltip

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
});

export const globalOptions: Options = {
  boost: {
    enabled: true,
    useGPUTranslations: true,
  },

  data: {
    dateFormat: "YYYY/mm/dd",
  },

  time: {
    /** Moment.js 잇어야 */
    // timezone: 'Asia/Seoul',
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
