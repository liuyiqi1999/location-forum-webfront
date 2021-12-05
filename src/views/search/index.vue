<script setup lang="ts">
import SearchItem from './component/search-item.vue';
import SearchReuslt from './component/search-result.vue';
import InputArea from '../../components/common/input-area.vue';
import { provide, ref } from 'vue';
import { useStore } from 'vuex';
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
const router = useRouter();
const message = useMessage();
const store = useStore();
import { GetLocationApi, PostApi } from '@/api';

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

const editingQuestion = ref('');
const title = ref('');
const tagsList = ref<string[]>();
const handleInput = (e: string) => {
  editingQuestion.value = e;
};
const handleSubmitQuestion = async () => {
  const ownerId = store.getters.getUserId;
  GetLocationApi.getLocationData();
  const locationData = JSON.parse(localStorage.getItem('address') || '');
  const { data } = await PostApi.postQuestion({
    title: title.value,
    content: editingQuestion.value,
    owner_id: ownerId,
    tagsList: tagsList.value,
    ...locationData,
  });
  if (data.code === 200) {
    const id = data.data;
    message.success('发帖成功');
    router.push({
      path: `/post/${id}`,
    })
  } else {
    message.error(`发帖失败：${data.message}`);
  }
};
</script>

<template>
  <div class="container">
    <n-space vertical>
      <search-item @got-res="gotRes"></search-item>
      <search-reuslt></search-reuslt>
      <n-card class="input-area" style="margin-top: 50px">
          <n-space align="center" style="margin-bottom: 20px;">
            <span>标题</span>
            <n-input
              v-model:value="title"
              @keydown.enter.prevent
              placeholder="请输入标题"
            />
          </n-space>
          <n-space align="center" style="margin-bottom: 20px;">
            <span>标签</span>
            <n-dynamic-tags v-model:value="tagsList" />
          </n-space>
        <input-area @input="handleInput" />
        <template #action>
          <n-space justify="end">
            <n-button class="reply-button" type="primary" @click="handleSubmitQuestion">发帖</n-button>
          </n-space>
        </template>
      </n-card>
    </n-space>
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
