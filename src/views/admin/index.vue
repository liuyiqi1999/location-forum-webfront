<script lang="ts" setup>
import ReportSolution from './component/report-solution.vue';
</script>

<template>
  <div class="container">
    <report-solution class="box"></report-solution>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: auto;
  width: 100%;
  min-height: 100%;
  // height: 100% !important;
  height: auto !important;
  background-color: rgb(246, 246, 246);
  padding-top: 1px;
}
.box {
  margin: 20px auto;
  width: 80%;
  background-color: white;
}
</style>
