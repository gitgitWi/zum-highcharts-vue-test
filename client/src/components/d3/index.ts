import { VueType } from "@/types";

export const D3TreemapChart = (): Promise<VueType> =>
  import("./TreemapChart.vue");
