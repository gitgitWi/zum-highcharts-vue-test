<template>
  <div id="chart-wrapper">
    <highcharts
      id="container"
      :options="chartOptions"
      :deep-copy-on-update="true"
    />
    <category-tab @click-button="tabButtonClickHandler" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import usDummy from "$assets/us-dummy.json";

import { TreemapSector } from "@/components/highcharts/types";
import { getChartOptions } from "@/components/highcharts/options";
import { refineSectorData } from "@/components/highcharts/utils";

import CategoryTab from "./CategoryTab.vue";
import { blueColorMap, greenColorMap } from "./constants";

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
    this.loadChartData();
  },

  methods: {
    async loadChartData(): Promise<void> {
      const data = refineSectorData(usDummy.sectors as TreemapSector[], {
        colorMap: this.colorMap,
      });
      this.chartOptions = getChartOptions(data);
    },

    tabButtonClickHandler(dataKey: string) {
      /** @todo */
      this.colorMap = dataKey.includes("Blue") ? blueColorMap : greenColorMap;
      this.loadChartData();
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
