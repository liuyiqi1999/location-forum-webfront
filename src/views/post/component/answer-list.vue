<template>
  <div style="margin-bottom: 60px">
    <div v-for="item in dataList" :key="item.id">
      <answer :data="item"> </answer>
    </div>
    <n-card>
      <div style="text-align: center" v-if="loadFinished">
        我也是有底线的o(*￣▽￣*)ブ
      </div>
    </n-card>
  </div>
</template>
<script lang="ts" setup>
import Answer from './answer.vue';
import { onMounted, onUnmounted } from '@vue/runtime-core';
import { ref } from 'vue';
import { IAnswer } from '@/entity';
import { PostApi } from '@/api';
import { CommonUtil } from '@/utils';

const loadFinished = ref(false);
// 每次请求的数量
const size = ref(10);
const page = ref(0);
const dataList = ref<IAnswer[]>([]);
const props = defineProps({
  id: String,
});

onMounted(async () => {
  window.addEventListener('scroll', onReachBottom);
  await updateData();
});
const updateData = async () => {
  const { data } = await PostApi.getAnswerByPage(
    Number(props.id),
    page.value,
    size.value
  );
  const newData = data.data;
  if (newData.length < size.value) {
    loadFinished.value = true;
  }
  for (let item of newData) {
    item.createTime = CommonUtil.formatTime(item.createTime);
    for (let comment of item.replySet) {
      comment.createTime = CommonUtil.formatTime(comment.createTime);
    }
  }
  page.value += 1;
  dataList.value = dataList.value.concat(...newData);
};
onUnmounted(() => {
  window.removeEventListener('scroll', onReachBottom, false);
});

const onReachBottom = async () => {
  // 如果差距超过200，则认为已经到达底部
  let isBottom =
    document.documentElement.offsetHeight -
      document.documentElement.scrollTop -
      window.innerHeight <=
    200;
  // 触底加载
  console.log('bottomOfWindow ', isBottom);
  if (isBottom && !loadFinished.value) {
    await updateData();
  }
};
</script>
