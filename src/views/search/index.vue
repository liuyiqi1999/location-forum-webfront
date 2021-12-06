<script setup lang="ts">
import SearchItem from './component/search-item.vue';
import SearchReuslt from './component/search-result.vue';
// import CreateTopic from './component/create-topic.vue';
import { provide, ref } from 'vue';

const search_res = ref();
const search_info = ref();
provide('search_res', search_res);
provide('search_info', search_info);

const startSearch = (param: any) => {
  search_res.value = param.search_res;
  search_info.value = param.search_info;
};


</script>

<template>
  <div class="container">
    <search-item @start-search="startSearch" class="box"></search-item>
    <search-reuslt class="box"></search-reuslt>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: auto;
  width: 100%;
  min-height: 100%;
  height: auto;
  background-color: rgb(246, 246, 246);
  padding-top: 1px;
  padding-bottom: 400px;
}
.box {
  margin: 20px auto;
  width: 80%;
  background-color: white;
  padding:1%;
}
</style>