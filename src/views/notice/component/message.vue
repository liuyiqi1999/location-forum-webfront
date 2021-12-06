<template>
  <n-layout has-sider>
    <n-layout-sider
      collapse-mode="transform"
      :collapsed-width="40"
      :width="150"
      show-trigger="arrow-circle"
      content-style="padding: 20px;"
      bordered
    >
      <n-space vertical size="large">
        <h3 class="space">💬 消息中心</h3>
        <n-button class="space" size="large" text @click="label = 'unRead'"
          >🔔 未读消息</n-button
        >
        <n-button class="space" size="large" text @click="label = 'read'">
          📨 已读消息</n-button
        >
        <n-button class="space" size="large" text @click="label = 'system'">
          🎯 系统消息</n-button
        >
      </n-space>
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
      <div v-if="label == 'unRead'">
        <UnreadMessage></UnreadMessage>
      </div>
      <div v-else-if="label == 'read'">
        <ReadMessage></ReadMessage>
      </div>
      <div v-else>
        <NoMessage></NoMessage>
      </div>
    </n-layout-content>
  </n-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import UnreadMessage from './unread-message.vue';
import ReadMessage from './read-message.vue';
import NoMessage from './no-message.vue';

const label = ref('unread');
</script>
<style scoped>
.space {
  margin-bottom: 15px;
}
</style>
