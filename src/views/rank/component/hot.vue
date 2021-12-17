<template>
  <n-tabs type="segment">
    <n-tab-pane
      v-for="rank in ranks"
      :key="rank.title"
      :name="rank.title"
      :tab="rank.title"
    >
      <n-thing
        v-for="(result, resultIndex) in rank.prop"
        :key="resultIndex"
        style="margin-bottom: 10px"
      >
        <n-card hoverable>
          <n-space justify="space-between">
            <span class="title">
              <n-button v-if="resultIndex === 0" circle>🥇 </n-button>
              <n-button v-else-if="resultIndex === 1" circle>🥈 </n-button>
              <n-button v-else-if="resultIndex === 2" circle>🥉 </n-button>
              {{ result.title }}
            </span>

            <span class="sub">🔥 浏览量：{{ result.viewTime }}</span>
          </n-space>
          <n-space style="font-size: 15px">
            <span v-for="(tag, tagIndex) in result.tags" :key="tag.name">
              <!-- 只展示前三个标签 -->
              <n-tag v-if="tagIndex < 3" size="small" round type="success">
                {{ tag.name }}
              </n-tag>
            </span>

            <span text style="color: grey; margin-top: 7px"
              >🌏 位置：{{ result.address }}</span
            >
            <n-button text @click="goToPost(result.id)">🚀 查看详情</n-button>
          </n-space>
        </n-card>
      </n-thing>
    </n-tab-pane>
  </n-tabs>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { RankApi, GetLocationApi } from '@/api';
import { useMessage } from 'naive-ui';
import { ChevronUp as UpIcon, ChevronDown as DownIcon } from '@vicons/carbon';
import { AirplaneOutline as SystemIcon } from '@vicons/ionicons5';
import { CommonUtil } from '@/utils';
import { IQuestion } from '@/entity';
import { useRouter } from 'vue-router';
const message = useMessage();

const allRank = ref<IQuestion[]>();
const locationRank = ref<IQuestion[]>();
const initAllRank = async () => {
  const { data } = await RankApi.getAllRank();
  if (data.code === 200) {
    allRank.value = buildAddress(data.data);
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
    locationRank.value = buildAddress(data.data);
  } else {
    message.error(`获取附近热榜失败：${data.message}`);
  }
};
// 构造地址
const buildAddress = (data: any) => {
  let newData = data;
  for (let item of newData) {
    item.address =
      (item.province ?? '') +
      (item.city ?? '') +
      (item.district ?? '') +
      (item.street ?? '');

    item.createTime = CommonUtil.formatTime(item.createTime);
  }
  return newData;
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

const router = useRouter();
const goToPost = (id: number) => {
  router.push({ name: 'Post', params: { id: id } });
};
</script>

<style>
.title {
  font-size: 17px;
  font-weight: bold;
}
.sub {
  font-size: 15px;
  color: gray;
}
.rank-card:not(:first-of-type) {
  margin-top: 20px;
}
</style>
