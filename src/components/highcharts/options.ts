import { Options } from "highcharts";

import { TreemapSector } from "../../types";

/**
 * @see {https://api.highcharts.com/highcharts/}
 */
export const getChartOptions = (data: TreemapSector[]): Options => ({
  title: {
    text: "NASDAQ Market Map",
  },

  subtitle: {
    text: "Treemap Chart Test",
  },

  /**
   * @see {https://api.highcharts.com/highcharts/colorAxis}
   */
  chart: {
    /**
     * @todo
     * CSS 사용해 커스텀하는 경우 true로 변경하고 모든 스타일 직접 지정해야 함
     */
    styledMode: false,
  },

  // 등락율에 따른 색상
  colorAxis: {
    minColor: "red",
    // min: -100,
    maxColor: "blue",
    // max: 100,
    // showInLegend: false,
  },

  /**
   * Treemap Series
   * @see {https://api.highcharts.com/highcharts/series.treemap}
   */
  series: [
    {
      type: "treemap",
      layoutAlgorithm: "squarified",

      data,

      allowTraversingTree: true,
      animationLimit: 300,
      levelIsConstant: false,

      levels: [
        {
          level: 1,
          dataLabels: {
            enabled: true,
            defer: false,

            align: "center",
            verticalAlign: "top",
            style: {
              textOutline: "1px solid black",
              fontSize: "14px",
            },
          },
          borderColor: "#AAA",
          borderWidth: 3,
        },
        {
          level: 2,
          dataLabels: {
            enabled: true,
            defer: true,

            /** 종목별 썸네일 사용 */
            useHTML: true,

            crop: true,

            /** @todo `styledMode: true` 인 경우 사용가능 */
            // className: 'thumbnail',
          },
          borderWidth: 1,
        },
      ], // levels
    }, // series.opions
  ], // series
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

  /** 공유/다운로드 버튼 없앰 */
  exporting: {
    buttons: {
      contextButton: {
        enabled: false,
      },
    },
  },

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 1200,
          minHeight: 600,
          // maxHeight: 500,
        },
        chartOptions: {},
      },
    ],
  },
};
