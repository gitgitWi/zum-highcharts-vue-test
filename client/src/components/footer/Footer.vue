<template>
  <footer>
    <div>
      <a
        href="https://github.com/gitgitWi/zum-highcharts-vue-test"
        target="blank"
      >
        <git-hub-icon />
        <span> https://github.com/gitgitWi/zum-highcharts-vue-test </span>
      </a>
    </div>
    <div>
      <a
        href="https://www.notion.so/zuminternet/treemap-ac78f4a59e574f6eb4c9e8589435125d"
        target="blank"
      >
        <notion-icon />
        <span> 국내/해외 메코차트 구현 </span>
      </a>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";
import GitHubIcon from "./GitHubIcon.vue";
import NotionIcon from "./NotionIcon.vue";

export default Vue.extend({
  components: {
    GitHubIcon,
    NotionIcon,
  },
});
</script>

<style lang="scss" scoped>
footer {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    padding: 3px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: darkgray;
  }

  span {
    padding-left: 5px;
  }
}
</style>
