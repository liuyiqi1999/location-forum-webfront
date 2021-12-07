<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {
  NTable,
  NSpace,
  NButton,
  NTabPane,
  NTabs,
  NPagination,
} from 'naive-ui';
import { ReportSolutionApi } from '@/api';
import { useStore } from 'vuex';

const res = ref<Array<any>>();
const currentPage = ref<number>(1);
const totalPage = ref<number>(0);
const currentResType = ref<number>(0);
const store = useStore();

const solveReport = async (operation: number, id: number) => {
  const userId = store.getters.getUserId;
  var solutionResult = await ReportSolutionApi.solveReport(
    operation,
    userId,
    currentResType.value,
    id
  );
  const _res = await ReportSolutionApi.getReported(
    currentPage.value - 1,
    10,
    userId,
    currentResType.value
  );
  switch (currentResType.value) {
    case 0:
      res.value = _res.data.data.questions;
      break;
    case 1:
      res.value = _res.data.data.answers;
      break;
    case 2:
      res.value = _res.data.data.comments;
      break;
  }
  console.log(solutionResult);
};

const getList = async (page: number, type: number) => {
  currentPage.value = page;
  currentResType.value = type;
  const userId = store.getters.getUserId;
  const _res = await ReportSolutionApi.getReported(
    currentPage.value - 1,
    10,
    userId,
    currentResType.value
  );
  switch (currentResType.value) {
    case 0:
      res.value = _res.data.data.questions;
      break;
    case 1:
      res.value = _res.data.data.answers;
      break;
    case 2:
      res.value = _res.data.data.comments;
      break;
  }
  totalPage.value = _res.data.data.totalPage;
  console.log(res.value);
};

const getAnotherPage = async (page: number) => {
  getList(page, currentResType.value);
};

onMounted(async () => {
  const userId = store.getters.getUserId;
  const _res = await ReportSolutionApi.getReported(0, 10, userId, 0);
  res.value = _res.data.data.questions;
  totalPage.value = _res.data.data.totalPage;
});
</script>

<template>
  <div>
    <n-tabs type="line" class="container">
      <n-tab-pane name="0" tab="查看问题" @click="getList(1, 0)"></n-tab-pane>
      <n-tab-pane name="1" tab="查看回答" @click="getList(1, 1)"></n-tab-pane>
      <n-tab-pane name="2" tab="查看回复" @click="getList(1, 2)"></n-tab-pane>
    </n-tabs>
    <n-space vertical class="container" style="padding-bottom: 100px">
      <n-table striped>
        <thead>
          <tr>
            <th style="width: 30%" v-if="currentResType == 0">问题</th>
            <th style="width: 0%" v-if="currentResType != 0"></th>
            <th style="width: 15%">作者</th>
            <th style="width: 35%">概览</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(target, index) in res" :key="index">
            <td>{{ target.title }}</td>
            <td>{{ target.ownerName }}</td>
            <td v-if="currentResType == 0">{{ target.content.content }}</td>
            <td v-if="currentResType != 0">{{ target.content }}</td>

            <td>
              <n-space>
                <n-button type="default">查看</n-button>
                <n-button type="success" @click="solveReport(1, target.id)"
                  >保留</n-button
                >
                <n-button type="error" @click="solveReport(0, target.id)"
                  >删除</n-button
                >
              </n-space>
            </td>
          </tr>
        </tbody>
      </n-table>
    </n-space>
    <n-pagination
      v-model:page="currentPage"
      :page-count="totalPage"
      style="float: right"
      :on-update:page="getAnotherPage"
      v-if="totalPage > 0"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 20px;
}
td {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
</style>
