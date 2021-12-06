<script setup lang="ts">
import { NoticeApi } from '@/api';
import { INotice } from '@/entity';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import NoMessage from './no-message.vue';
const store = useStore();
let userId = store.getters.getUserId;
const dataList = ref<INotice[]>([]);
onMounted(async () => {
  const { data } = await NoticeApi.getReadMessage(userId);
  dataList.value = data.data;
});
</script>

<template>
  <div>
    <n-thing v-for="item in dataList" :key="item" style="margin-bottom: 10px">
      <n-card hoverable>
        <div v-if="item.blockId">
          📌 {{ item.respondent }} 评论了您在
          <router-link :to="{ name: 'Post', params: { id: item.postId } }">{{
            item.postTitle
          }}</router-link>
          问题下的回答
        </div>
        <div v-else>
          📌 {{ item.respondent }} 回答了您提出的
          <router-link :to="{ name: 'Post', params: { id: item.postId } }">{{
            item.postTitle
          }}</router-link>
          问题
        </div>
      </n-card>
    </n-thing>
    <NoMessage v-if="!dataList"></NoMessage>
  </div>
</template>

<style scoped></style>
