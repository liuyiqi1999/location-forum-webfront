<template>
  <div class="container">
    <Message class="box"></Message>
  </div>
</template>
<script lang="ts" setup>
import Message from './component/message.vue';
</script>
<style scoped>
.container {
  margin: auto;
  width: 100%;
  min-height: 100%;
  height: auto;
  background-color: rgb(246, 246, 246);
  padding-top: 1px;
}
.box {
  margin: 20px auto;
  width: 80%;
  background-color: white;
  height: 50%;
}
</style>
