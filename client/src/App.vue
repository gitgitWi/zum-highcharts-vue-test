<template>
  <div id="app">
    <header-wrapper />
    <treemap-chart />
    <footer-wrapper />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { TreemapChart, HeaderWrapper, FooterWrapper } from "./components";

export default Vue.extend({
  name: "App",
  components: {
    HeaderWrapper,
    TreemapChart,
    FooterWrapper,
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
