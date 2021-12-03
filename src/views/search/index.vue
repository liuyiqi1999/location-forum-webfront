<script setup lang="ts">
import SearchItem from './component/search-item.vue';
import SearchReuslt from './component/search-result.vue';
// import CreateTopic from './component/create-topic.vue';
import { provide, ref } from 'vue';

const res = ref();
provide('res', res);

const gotRes = (param: any) => {
  res.value = param;
};

//测试用
res.value = [
  {
    id: 2,
    title: '程序员1怎么伪装才能不让别人看出自己菜？',
    author: '程序猎人',
    tags: ['程序员修养', '伪装', '程序猿生存必备', '1024开发者节'],
    createTime: '2021-11-18 17:27',
    isDeleted: false,
    viewTime: 1024,
  },
  {
    id: 3,
    title: '程序员2怎么伪装才能不让别人看出自己菜？',
    author: '程序猎人',
    tags: ['程序员修养', '伪装', '程序猿生存必备', '1024开发者节'],
    createTime: '2021-11-18 17:27',
    isDeleted: true,
    viewTime: 1024,
  },
  {
    id: 4,
    title: '程序员3怎么伪装才能不让别人看出自己菜？',
    author: '程序猎人',
    tags: ['程序员修养', '伪装', '程序猿生存必备', '1024开发者节'],
    createTime: '2021-11-18 17:27',
    isDeleted: false,
    viewTime: 1024,
  },
];
</script>

<template>
  <div class="container">
    <search-item @got-res="gotRes"></search-item>
    <search-reuslt></search-reuslt>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: auto;
  margin-top: 100px;
  width: 60%;
  height: 100%;
}
</style>