<template>
  <div>
    <n-input-group class="keyword-input">
      <n-input />
      <n-button type="primary">搜索</n-button>
    </n-input-group>
    <n-input-group class="tag-input">
      <n-input />
      <n-button type="primary">搜索tag</n-button>
    </n-input-group>
    <n-button type="primary" class="tag-auto">热门tag</n-button>
    <div class="tags">
      <n-space>
        <n-tag
          v-for="(tag, index) in tags"
          :key="index"
          size="small"
          round
          type="success"
          closable
          @close="handleClose(index)"
        >
          {{ tag }}
        </n-tag>
      </n-space>
    </div>
    <div>
      <!-- 测试用的记得删了 -->
      {{ field }}
    </div>
    <div class="map-container">
      <baidu-map @selected-field="getSelectedField"></baidu-map>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { NInput, NButton, NInputGroup, NSpace, NTag } from 'naive-ui';
import { ref } from 'vue';
import BaiduMap from './baidu-map.vue';
const field = ref();
const tags = ref(['do', 'da', 'de', 'di']);
const handleClose = (index: number) => {
  console.log(index);
  for (let i = index; i < tags.value.length; i++)
    tags.value[i] = tags.value[i + 1];
  tags.value.pop();
};

const getSelectedField = (param: any) => {
  if (param) field.value = param.value;
  else field.value = "no input";
};
</script>


<style lang="scss" scoped>
.keyword-input {
  width: 60%;
}
.tag-input {
  width: 25%;
  margin-left: 5%;
}
.tag-auto {
  margin-left: 1%;
}
.tags {
  margin-top: 1%;
}
.map-container {
  margin-top: 5%;
}
</style>