<script setup lang="ts">
import UserInfo from './component/user-info.vue';
import UserActivity from './component/user-activity.vue';
</script>

<template>
  <div class="container">
    <user-info></user-info>
    <user-activity></user-activity>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 80%;
  height: 100%;
}
</style>
