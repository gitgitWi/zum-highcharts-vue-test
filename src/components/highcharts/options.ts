import { Options } from "@/types";

/**
 * @see {https://api.highcharts.com/highcharts/}
 */
export const getChartOptions = (data: Record<string, unknown>[]): Options => ({
  title: {
    text: "[Title] US Stock Market Map",
  },

  subtitle: {
    text: "[SubTitle] Treemap Chart Test",
  },

  /**
   * @see {https://api.highcharts.com/highcharts/colorAxis}
   */
  chart: {
    /**
     * @todo
     * CSS 사용해 커스텀하는 경우 true로 변경하고 모든 스타일 직접 지정해야 함
     */
    styledMode: true,
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
            useHTML: true,
            align: "center",
            // verticalAlign: "top",
            style: {
              // textOutline: "1px solid black",
              // fontSize: "16px",
            },
          },
          borderColor: "#AAA",
          borderWidth: 5,
        },
        {
          level: 2,
          dataLabels: {
            enabled: true,
            defer: true,
            useHTML: true,
            crop: true,
            style: {
              textAlign: "center",
            },

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
          // maxHeight: 500,
        },
        chartOptions: {},
      },
    ],
  },
};
