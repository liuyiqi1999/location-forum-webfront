<template>
  <div>
    <n-card v-for="(result, index) in res" :key="index" class="res">
      {{ result.title }}
      <n-tag
        v-for="tag in result.tags"
        :key="tag"
        size="small"
        round
        type="success"
      >
        {{ tag }}
      </n-tag>
      <p style="float:right">浏览量：{{result.viewTime}}</p>
    </n-card>
  </div>
</template>


<script lang="ts" setup>
import { inject ,ref } from 'vue';
import { NCard, NTag } from 'naive-ui';
const res = inject('res') as any;
</script>


<style lang="scss" scoped>
.res {
  border-radius: 0;
  padding: 0;
}
</style>