<template>
  <div id="chart-wrapper">
    <category-tab
      :current-category.sync="currentDataKey"
      @click-button="tabButtonClickHandler"
    />
    <highcharts
      id="container"
      :options="chartOptions"
      :deep-copy-on-update="true"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { dummyDataMap, categoryKeys } from "@/components/highcharts/constants";
import { getChartOptions } from "@/components/highcharts/options";
import { refineSectorData } from "@/components/highcharts/utils";

import CategoryTab from "./CategoryTab.vue";

export default Vue.extend({
  name: "TreemapChart",

  components: { CategoryTab },

  data(): Record<string, unknown> {
    return {
      chartOptions: {},
      currentDataKey: `US-Green`,
    };
  },

  async mounted() {
    this.loadChartData();
  },

  methods: {
    async loadChartData(): Promise<void> {
      const dataKey = this.currentDataKey as string;
      const category =
        categoryKeys.find((key) => dataKey.toLowerCase().includes(key)) ?? `us`;

      // @ts-ignore
      const data = refineSectorData(await dummyDataMap[category], { dataKey });

      this.chartOptions = getChartOptions(data);
    },

    tabButtonClickHandler(dataKey: string) {
      this.currentDataKey = dataKey;
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
