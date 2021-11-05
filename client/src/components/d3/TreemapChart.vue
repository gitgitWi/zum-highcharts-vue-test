<template>
  <section>
    <h2>D3 TreemapChart</h2>
    <svg id="d3-chart" :width="size.w" :height="size.h"></svg>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import d3 from "d3";

export default Vue.extend({
  name: "D3TreemapChart",

  data() {
    return {
      size: {
        w: 1200,
        h: 600,
      },
      zoom: {},
    };
  },

  methods: {
    getData() {
      return import("../../assets/us-dummy.json");
    },

    getTreemap() {
      return;
    },
  },
});
</script>

<style lang="scss" scoped>
#d3-chart {
  //
}
</style>
