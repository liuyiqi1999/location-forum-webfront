<script setup lang="ts">
import SearchItem from './component/search-item.vue';
import SearchReuslt from './component/search-result.vue';
import InputArea from '../../components/common/input-area.vue';
import Rank from './component/rank.vue';
import { provide, ref } from 'vue';
import { useStore } from 'vuex';
import { useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';
const router = useRouter();
const message = useMessage();
const store = useStore();
import { GetLocationApi, PostApi } from '@/api';

const search_res = ref(
  {
    result:[],
    totalpage:-1
  }
);
const search_info = ref();
provide('search_res', search_res);
provide('search_info', search_info);

const startSearch = (param: any) => {
  search_res.value = param.search_res;
  search_info.value = param.search_info;
};

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
    });
  } else {
    message.error(`发帖失败：${data.message}`);
  }
};
</script>

<template>
  <div class="container">
    <n-grid x-gap="30" :cols="4">
      <n-gi :span="3">
        <n-space vertical>
          <search-item @start-search="startSearch" class="box"></search-item>
          <search-reuslt class="box" style="padding-bottom:40px"></search-reuslt>
          <n-card class="input-area" >
            <n-space align="center" style="margin-bottom: 20px">
              <span>标题</span>
              <n-input
                v-model:value="title"
                @keydown.enter.prevent
                placeholder="请输入标题"
              />
            </n-space>
            <n-space align="center" style="margin-bottom: 20px">
              <span>标签</span>
              <n-dynamic-tags v-model:value="tagsList" />
            </n-space>
            <input-area @input="handleInput" />
            <template #action>
              <n-space justify="end">
                <n-button
                  class="reply-button"
                  type="primary"
                  @click="handleSubmitQuestion"
                  >发帖</n-button
                >
              </n-space>
            </template>
          </n-card>
        </n-space>
      </n-gi>
      <n-gi :span="1">
        <n-space vertical class="rank">
          <rank />
        </n-space>
      </n-gi>
    </n-grid>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: auto;
  width: 100%;
  min-height: 100%;
  height: auto !important;
  background-color: rgb(246, 246, 246);
  padding-top: 1px;
  padding-bottom: 400px;
}
.box ,.input-area{
  margin: 20px auto;
  width: 80%;
  background-color: white;
  padding:1%;
}

.rank{
  margin: 20px auto;
  margin-left: -15%;
  width:80%;
  padding: 0;
  background: none;
}
</style>
