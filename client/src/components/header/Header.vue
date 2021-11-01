<template>
  <header>
    <a href="https://zum-test.web.app"><h1>ZUM 국내/해외증시 MAP 테스트</h1></a>
    <span id="last-build">
      last build at <b>{{ lastBuild }}</b>
    </span>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Header",

  data() {
    return {
      lastBuild: process.env.VUE_APP_LAST_BUILD,
    };
  },
});
</script>

<style lang="scss" scoped>
header {
  margin-bottom: 15px;
}

a {
  text-decoration: none;
  color: rgb(27, 82, 237);

  h1 {
    font-weight: 500;
  }

  :hover {
    font-weight: 900;
    transition-property: font-weight;
    transition-duration: 100ms;
  }
}

#last-build {
  height: max-content;
  margin: 5px;

  font-size: 16px;
  font-style: italic;
}
</style>
