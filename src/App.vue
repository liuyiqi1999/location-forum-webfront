<script setup lang="ts">
import { NMessageProvider } from 'naive-ui';
</script>

<template>
  <n-message-provider>
    <router-view />
  </n-message-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
