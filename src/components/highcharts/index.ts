import { VueType } from "@/types";

export { HighchartsVue } from "@/components/highcharts/config";

export const TreemapChart = (): Promise<VueType> =>
  import("./TreemapChart.vue");
