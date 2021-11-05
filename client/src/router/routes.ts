import { RouteConfig } from "vue-router";

import { TreemapChart, D3TreemapChart } from "@/components";

export const routes: RouteConfig[] = [
  { path: "/", name: "TreemapChart", component: TreemapChart },
  { path: "/d3", name: "D3TreemapChart", component: D3TreemapChart },
];
