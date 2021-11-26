<script lang="ts" setup>
import Question from './component/question.vue';
import AnswerList from './component/answer-list.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const props = defineProps({
  id: String,
});
const route = useRoute();
let param = route.params.id ? route.query.id : props.id;
console.log('帖子id为 ', param);
const id = ref(param);
</script>
<template>
  <div class="container">
    <question :id="id" class="box"></question>
    <answer-list :id="id" class="box"></answer-list>
  </div>
</template>

<style lang="scss" scoped>
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
}
</style>
