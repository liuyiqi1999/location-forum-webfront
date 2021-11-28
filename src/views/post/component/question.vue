<template>
  <n-card hoverable>
    <n-space>
      <n-tag v-for="item in question.tags" :key="item.id" type="success" round>
        {{ item.name }}
      </n-tag>
    </n-space>
    <n-thing>
      <div class="content-text">
        {{ question.title }}
      </div>
      <div>
        {{ question.content?.content }}
      </div>
      <template #footer>
        <div style="color: grey">
          <span class="footer-text"> 🔥 浏览量：{{ question.viewTime }}</span>
          <span class="footer-text"> 🌏 位置：{{ question.address }}</span>
          <span class="footer-text"> 🦸‍♂️ 提问者：{{ question.ownerName }}</span>
          <span class="footer-text">
            📅 创建时间：{{ question.createTime }}</span
          >
        </div>
      </template>
      <template #action>
        <n-space justify="end">
          <n-button size="small" ghost> 🏷️ 分享 </n-button>
          <n-button size="small" ghost> ✏️ 回答 </n-button>

          <n-dropdown
            trigger="hover"
            @select="handleSelect"
            :options="questionOptions"
            :show-arrow="true"
            >...</n-dropdown
          >
        </n-space>
      </template>
    </n-thing>
  </n-card>
</template>
<script lang="ts"></script>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { PostApi } from '@/api';
import { IQuestion } from '@/entity';
import { CommonUtil } from '@/utils';

const props = defineProps({
  id: String,
});

const question = ref({} as IQuestion);
const initQuestion = async () => {
  const { data } = await PostApi.getQuestion(props.id ?? '');
  let result = data.data;
  result.address =
    (result.province ?? '') +
    (result.city ?? '') +
    (result.district ?? '') +
    (result.street ?? '');

  result.createTime = CommonUtil.formatTime(result.createTime);
  question.value = result;

  console.log('props ', props);

  console.log('question', question.value);
};
onMounted(async () => {
  await initQuestion();
  console.log('onMounted');
});

const handleSelect = () => {
  console.log(111);
};
const questionOptions = [
  {
    key: 'report',
    label: '举报',
  },
];
</script>

<style lang="scss" scoped>
.footer-text {
  font-size: 15px;
  vertical-align: text-bottom;
  margin-right: 15px;
  color: grey;
}
.content-text {
  margin-top: 10px;
  font-size: 20px;
}
</style>
