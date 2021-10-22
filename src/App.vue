<template>
  <div id="app">
    <h1>ZUM 국내/해외증시 MAP 테스트</h1>
    <treemap-chart />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { TreemapChart } from "./components";

export default Vue.extend({
  name: "App",
  components: {
    TreemapChart,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  place-items: center;
}
</style>
