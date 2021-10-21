<template>
  <div id="app">
    <h3>금융줌 메코차트 테스트</h3>
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
  margin-top: 60px;
}
</style>
