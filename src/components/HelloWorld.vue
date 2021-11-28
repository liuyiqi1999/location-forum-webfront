<script setup lang="ts">
import { ref } from 'vue';
import Post from '@/views/post/index.vue';

const count = ref(0);
</script>

<template>
  <div>
    <!-- 测试界面 -->
    <Post id="1"></Post>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
