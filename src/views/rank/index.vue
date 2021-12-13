<script lang="ts" setup>
import WordCloud from './component/word-cloud.vue';
import Hot from './component/hot.vue';
</script>
<template>
  <div id="container">
    <WordCloud style="margin: 20px atuo"></WordCloud>
    <Hot style="margin: 20px auto; width: 80%"></Hot>
  </div>
</template>

<style lang="scss" scoped>
#container {
  margin: auto;
  width: 100%;
  min-height: 100%;
  height: auto !important;
  background-color: rgb(246, 246, 246);
  padding-top: 1px;
}
</style>
