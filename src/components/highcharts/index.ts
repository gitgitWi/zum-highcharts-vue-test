import { VueType } from "../../types";

export { Highcharts } from "./HighCharts";
export const TreemapChart = (): Promise<VueType> =>
  import("./TreemapChart.vue");
