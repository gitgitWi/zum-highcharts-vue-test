import { VueType } from "@/types";

export { HighchartsVue } from "@/components/highcharts/config";

// export { Highcharts } from "./HighCharts";
export const TreemapChart = (): Promise<VueType> =>
  import("./TreemapChart.vue");
