<template>
  <n-card v-for="(rank, rankIndex) in ranks" :title="rank.title" class="rank-card">
    <template #header-extra>
      <n-icon @click="isShow[rankIndex] = !isShow[rankIndex]">
        <up-icon v-if="isShow[rankIndex]"></up-icon>
        <down-icon v-else></down-icon>
      </n-icon>
    </template>
    <n-empty v-if="rank.prop?.length===0" description="暂无帖子"></n-empty>
    <n-thing v-else v-for="(result, resultIndex) in rank.prop" :key="resultIndex">
      <div v-if="isShow[rankIndex] || resultIndex < 3">
        <n-space justify="space-between">
          <span class="title">
            <span
              v-if="resultIndex === 0"
              >🥇</span
            >
            <span
              v-else-if="resultIndex === 1"
              >🥈</span
            >
            <span
              v-else-if="resultIndex === 2"
              >🥉</span
            >
            {{ result.title }}</span
          >
          <span class="sub">浏览量：{{ result.viewTime }}</span>
        </n-space>
        <n-space>
          <n-tag
            v-for="tag in result.tags"
            :key="tag"
            size="small"
            round
            type="success"
          >
            {{ tag.name }}
          </n-tag>
        </n-space>
        <n-divider v-if="resultIndex !== rank.prop.length - 1" />
      </div>
    </n-thing>
  </n-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { RankApi, GetLocationApi } from '@/api';
import { useMessage } from 'naive-ui';
import { ChevronUp as UpIcon, ChevronDown as DownIcon } from '@vicons/carbon';
const message = useMessage();

type result = {
  title: String;
  tags: {
    id: number;
    name: String;
  };
  viewTime: number;
};

const allRank = ref<result[]>();
const locationRank = ref<result[]>();
const initAllRank = async () => {
  const { data } = await RankApi.getAllRank();
  if (data.code === 200) {
    allRank.value = data.data;
  } else {
    message.error(`获取总热榜失败：${data.message}`);
  }
};
const initLocationRank = async () => {
  GetLocationApi.getLocationData();
  const locationData = JSON.parse(localStorage.getItem('address') || '');
  const { data } = await RankApi.getLocationRank(
    locationData.longitude,
    locationData.latitude
  );
  if (data.code === 200) {
    locationRank.value = data.data;
  } else {
    message.error(`获取附近热榜失败：${data.message}`);
  }
};
onMounted(async () => {
  await initAllRank();
  await initLocationRank();
});

const ranks = ref([
  {
    title: '总热榜',
    prop: allRank,
  },
  {
    title: '附近热榜(10km)',
    prop: locationRank,
  },
]);

const isShow = ref([false, false]);
</script>

<style>
.title {
  font-size: 16px;
  font-weight: bold;
}
.sub {
  font-size: 12px;
  color: gray;
}
.rank-card:not(:first-of-type) {
    margin-top: 20px;
}
</style>
