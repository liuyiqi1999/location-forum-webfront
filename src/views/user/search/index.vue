<script setup lang="ts">
import SearchItem from './component/search-item.vue';
import InputArea from '../../../components/common/input-area.vue'
import SearchReuslt from './component/search-result.vue';

const handleInput = (event: string) => {
  console.log(event)
}
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
.input-area {
  margin-top: 30px;
}
</style>