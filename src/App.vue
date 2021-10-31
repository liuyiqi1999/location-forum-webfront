<script setup lang="ts">
import { NMessageProvider } from 'naive-ui';
import NavigationBar from './components/common/navigation-bar.vue';
</script>

<template>
  <n-message-provider>
    <navigation-bar />
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
