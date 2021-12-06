<template>
  <div style="margin-bottom: 60px">
    <div v-for="item in dataList" :key="item.id" class="box">
      <answer :data="item"> </answer>
    </div>
    <n-card class="box2">
      <n-empty v-if="dataList.length == 0" description="快来做第一个答主吧">
        <template #icon>
          <n-icon>
            <system-icon />
          </n-icon>
        </template>
      </n-empty>
      <div style="text-align: center" v-else-if="loadFinished">
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
import { AirplaneOutline as SystemIcon } from '@vicons/ionicons5';

const loadFinished = ref(false);
// 每次请求的数量
const size = ref(10);
const page = ref(0);
const dataList = ref<IAnswer[]>([]);
const props = defineProps({
  id: String,
});
const isLoading = ref(false);

onMounted(async () => {
  window.addEventListener('scroll', onReachBottom);
  isLoading.value = true;
  await updateData();
  isLoading.value = false;
});
const updateData = async () => {
  const { data } = await PostApi.getAnswerByPage(
    Number(props.id),
    page.value,
    size.value
  );
  page.value += 1;
  const newData = data.data;
  if (newData.length < size.value) {
    loadFinished.value = true;
  }
  for (let item of newData) {
    item.createTime = CommonUtil.formatTime(item.createTime);
    item.address =
      (item.province ?? '') +
      (item.city ?? '') +
      (item.district ?? '') +
      (item.street ?? '');
    for (let comment of item.replySet) {
      comment.createTime = CommonUtil.formatTime(comment.createTime);
      comment.address =
        (comment.province ?? '') +
        (comment.city ?? '') +
        (comment.district ?? '') +
        (comment.street ?? '');
    }
  }

  dataList.value = dataList.value.concat(...newData);
  console.log(
    '当前页数： ',
    page.value,
    '当前数据长度： ',
    dataList.value.length
  );
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
    100;
  // 触底加载
  console.log('bottomOfWindow ', isBottom);
  if (!isLoading.value && isBottom && !loadFinished.value) {
    isLoading.value = true;
    await updateData();
    isLoading.value = false;
  }
};
</script>
<style scoped>
.box {
  margin: 20px auto 0;
  width: 80%;
  background-color: white;
}
.box2 {
  margin: 0 auto;
  width: 80%;
  background-color: white;
}
</style>
