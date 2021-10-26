<template>
  <div id="chart-wrapper">
    <category-tab @click-button="tabButtonClickHandler" />
    <highcharts
      id="container"
      :options="chartOptions"
      :deep-copy-on-update="true"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { TreemapSector } from "@/components/highcharts/types";
import { colorMapReg, categoryReg } from "@/components/highcharts/constants";
import { getChartOptions } from "@/components/highcharts/options";
import { refineSectorData } from "@/components/highcharts/utils";

import CategoryTab from "./CategoryTab.vue";
import { blueColorMap, greenColorMap } from "./constants";

const dummyDataMap = {
  us: import("$assets/us-dummy.json").then(({ sectors }) => sectors),
  kospi: import("$assets/kospi-dummy.json").then(({ sectors }) => sectors),
  kosdaq: import("$assets/kosdaq-dummy.json").then(({ sectors }) => sectors),
};

export default Vue.extend({
  name: "TreemapChart",

  components: { CategoryTab },

  data(): Record<string, unknown> {
    return {
      chartOptions: {},
      colorMap: blueColorMap,
    };
  },

  async mounted(): Promise<void> {
    dummyDataMap.us.then((data) => this.loadChartData(data as TreemapSector[]));
  },

  methods: {
    async loadChartData(apiData: TreemapSector[]): Promise<void> {
      const data = refineSectorData(apiData, {
        colorMap: this.colorMap,
      });
      this.chartOptions = getChartOptions(data);
    },

    tabButtonClickHandler(dataKey: string) {
      this.colorMap =
        dataKey.match(colorMapReg)?.[0].toLowerCase() === "blue"
          ? blueColorMap
          : greenColorMap;

      const [category] = dataKey.match(categoryReg) ?? [];

      // @ts-ignore
      dummyDataMap[category.toLowerCase()]
        // @ts-ignore
        ?.then((data) => this.loadChartData(data as TreemapSector[]))
        .catch(console.error);
    },
  },
});
</script>

<style lang="scss" scoped>
#chart-wrapper {
  width: 100%;
  min-width: 600px;
  max-width: 1800px;
  height: max-content;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
}

#container {
  width: 100%;
  max-width: 1600px;
  height: 900px;
}
</style>
