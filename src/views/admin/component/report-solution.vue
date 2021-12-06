<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { NTable, NSpace, NButton } from 'naive-ui';
import { ReportSolutionApi } from '@/api';
import { useStore } from 'vuex';

const res = ref<Array<any>>();
const totalPage = ref<number>();
const store = useStore();

onMounted(async () => {
  const ownerId = store.getters.getUserId;
  const _res = await ReportSolutionApi.getReported(0, 10, ownerId, 0);
  res.value = _res.data.data.questions;
  totalPage.value = _res.data.data.totalPage;
});
</script>

<template>
  <div>
    <n-space vertical class="container">
      <n-table striped>
        <thead>
          <tr>
            <th class="c1">问题</th>
            <th class="c2">作者</th>
            <th class="c3">概览</th>
            <th class="c4">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(target, index) in res" :key="index">
            <td class="c1">{{ target.title }}</td>
            <td class="c2">{{ target.ownerName }}</td>
            <td class="c3">{{ target.content.content }}</td>
            <td class="c4">
              <n-space>
                <n-button type="default">查看</n-button>
                <n-button type="success">保留</n-button>
                <n-button type="error">删除</n-button>
              </n-space>
            </td>
          </tr>
        </tbody>
      </n-table>
    </n-space>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 20px;
}
</style>
