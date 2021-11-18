<script setup lang="ts">
import SearchItem from './component/search-item.vue';
// import SearchReuslt from './component/search-result.vue';
</script>

<template>
  <div class="container">
    <search-item></search-item>
    <search-reuslt></search-reuslt>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: auto;
  margin-top :100px;
  width: 60%;
  height: 100%;
}

</style>