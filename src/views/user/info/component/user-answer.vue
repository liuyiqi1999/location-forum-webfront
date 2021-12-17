<template>
  <div>
    <div v-if="!dataList">
      <n-empty description="快去回答问题吧">
        <template #icon>
          <n-icon>
            <system-icon />
          </n-icon>
        </template>
      </n-empty>
    </div>
    <div
      v-for="question in dataList"
      :key="question.id"
      style="margin-bottom: 10px"
    >
      <n-card hoverable>
        <div class="content-text">
          {{ question.title }}
        </div>

        <template #footer>
          <div>
            <div>
              <n-space>
                <n-tag
                  v-for="item in question.tags"
                  :key="item.id"
                  type="success"
                  round
                >
                  {{ item.name }}
                </n-tag>
              </n-space>
            </div>
            <div style="color: grey; font-size: 16px; margin-top: 7px">
              <span> 🔥 浏览量：{{ question.viewTime }} </span>
              <span> 🌏 位置：{{ question.address }} </span>
              <span> 📅 创建时间：{{ question.createTime }} </span>
              <span @click="goToPost(question.id)" style="margin-left: 15px"
                ><n-button text> 🚀 查看详情 </n-button>
              </span>
            </div>
          </div>
        </template>
      </n-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { AirplaneOutline as SystemIcon } from '@vicons/ionicons5';
import { onMounted } from 'vue';
import { IQuestion } from '@/entity';
import { ref } from 'vue';
import { PostApi } from '@/api';
import { useStore } from 'vuex';
import { CommonUtil } from '@/utils';
import { useRouter } from 'vue-router';
const store = useStore();
let userId = store.getters.getUserId;
const dataList = ref<IQuestion[]>([]);
onMounted(async () => {
  const { data } = await PostApi.getUserAnswers(userId);
  let newData = data.data;
  for (let item of newData) {
    item.address =
      (item.province ?? '') +
      (item.city ?? '') +
      (item.district ?? '') +
      (item.street ?? '');

    item.createTime = CommonUtil.formatTime(item.createTime);
  }

  dataList.value = newData;
});
const router = useRouter();
const goToPost = (id: number) => {
  router.push({ name: 'Post', params: { id: id } });
};
</script>
<style scoped>
.content-text {
  margin-top: 10px;
  font-size: 20px;
  font-weight: bolder;
}
</style>
