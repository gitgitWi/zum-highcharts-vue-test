import { Options, TreemapStock } from "@/components/highcharts/types";
import { borderColor } from "@/components/highcharts/constants";

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
          layoutAlgorithm: "sliceAndDice",
          dataLabels: {
            enabled: true,
            defer: false,
            useHTML: true,
            align: "center",
            allowOverlap: true,
            style: {
              width: 100,
              backgroundColor: borderColor,
              // textOutline: "1px solid black",
              fontSize: "16px",
              fontWeight: "bolder",
              textOverflow: "ellipsis",
            },
            verticalAlign: "top",
            backgroundColor: borderColor,
          },
          borderColor,
          borderWidth: 16,
        },
        {
          level: 2,
          layoutAlgorithm: "squarified",
          // layoutAlgorithm: "sliceAndDice",
          dataLabels: {
            enabled: true,
            defer: true,
            useHTML: true,
            crop: true,
            style: {
              textAlign: "center",
            },
            formatter: function () {
              const { gains = 0, logoSrc } = this
                .point as unknown as TreemapStock;
              const gainsColor =
                gains > 0 ? "blue" : gains === 0 ? "grey" : "red";
              const gainsFixed = gains.toFixed(2);

              return (
                (logoSrc
                  ? `<img src="${logoSrc}" loading="lazy" style="width: 70%; border-radius: 50%" ><br/>`
                  : "") +
                this.key +
                `<br /><span style="color: ${gainsColor};">${gainsFixed}%</span>`
              );
            },
          },
          borderWidth: 1,
        },
      ], // levels

      tooltip: {
        pointFormatter: function () {
          const header = `<span style="font-weight: bold; font-style: italic;">${this.name}</span>`;
          const infos: string[] = [header];

          const { value = 0, gains = 0 } = this as unknown as TreemapStock;
          if (value) infos.push(`market cap: $${value.toLocaleString()}`);
          if (gains) infos.push(`gains: ${gains.toFixed(2)}%`);
          return infos.join(`<br />`);
        },
      }, // series.tooltip
    },
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
        },
        chartOptions: {},
      },
    ],
  },
};
