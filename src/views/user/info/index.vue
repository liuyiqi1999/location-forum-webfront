<script setup lang="ts">
import UserInfo from './component/user-info.vue';
import UserActivity from './component/user-activity.vue';
</script>

<template>
  <div class="container">
    <user-info class="box"></user-info>
    <user-activity></user-activity>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: auto;
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
