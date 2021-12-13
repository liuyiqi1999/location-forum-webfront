<template>
  <div class="container">
    <n-tabs type="segment">
      <n-tab-pane name="question" tab="发起的帖子"
        ><UserQuestion />
      </n-tab-pane>
      <n-tab-pane name="answer" tab="回答的帖子"><UserAnswer /></n-tab-pane>
    </n-tabs>
  </div>
</template>
<script lang="ts" setup>
import UserQuestion from './user-question.vue';
import UserAnswer from './user-answer.vue';
</script>
<style scoped>
.container {
  margin: 20px auto;
  width: 80%;
}
</style>
