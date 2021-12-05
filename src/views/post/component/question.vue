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
      <div v-html="question.content?.content">
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
          <n-button size="small" ghost @click="showAnswerModal=true">
            ✏️ 回答
          </n-button>
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
    <n-modal
      style="width: 900px;"
      v-model:show="showAnswerModal"
      preset="card"
      title="回复帖子"
      size="medium"
      :bordered="false"
    >
      <n-card class="box input-area">
        <input-area @input="handleInput" />
        <template #action>
          <n-space justify="end">
            <n-button class="reply-button" type="primary" @click="handleSubmitAnswer">回答</n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal>
  </n-card>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { PostApi, GetLocationApi } from '@/api';
import { IQuestion } from '@/entity';
import { CommonUtil } from '@/utils';
import InputArea from '@/components/common/input-area.vue';
import { useStore } from 'vuex';
import { useMessage } from 'naive-ui';
const message = useMessage();
const store = useStore();
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

const showAnswerModal = ref(false);
const editingAnswer = ref('');
const handleInput = (e: any) => {
  editingAnswer.value = e;
};
const handleSubmitAnswer = async () => {
  const ownerId = store.getters.getUserId;
  GetLocationApi.getLocationData();
  const locationData = JSON.parse(localStorage.getItem('address') || '');
  const { data } = await PostApi.postAnswer({
    post_id: props.id ?? 0,
    owner_id: ownerId,
    content: editingAnswer.value,
    ...locationData,
  });
  if (data.code === 200) {
    message.success('回复成功');
    showAnswerModal.value = false;
    location.reload();
  } else {
    message.error(`回复失败：${data.message}`);
  }
}
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
