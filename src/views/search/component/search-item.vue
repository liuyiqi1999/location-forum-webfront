<template>
  <div>
    <n-collapse accordion default-expanded-names="1">
      <n-collapse-item title="关键词搜索" name="1">
        <n-input-group class="keyword-input">
          <n-input v-model:value="keyword" />
          <n-button type="primary" @click="search(KEYWORD)">搜索</n-button>
        </n-input-group>
      </n-collapse-item>
      <n-collapse-item title="TAG搜索" name="2">
        <n-input-group class="tag-input">
          <n-input v-model:value="keyword_for_tag" />
          <n-button type="primary" @click="getTags()">搜索tag</n-button>
        </n-input-group>
        <n-button type="primary" class="tag-auto">热门tag</n-button>
        <div class="tag-candidates">
          <n-space>
            <n-tag
              v-for="(tag, index) in tag_candidates"
              :key="index"
              size="small"
              round
              type="success"
              @click="handleChoose(index)"
            >
              {{ tag }}
            </n-tag>
          </n-space>
        </div>
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
          <n-button type="primary" class="search-by-tags" @click="search(TAGS)">
            以这些tag进行搜索
          </n-button>
        </div>
      </n-collapse-item>
      <n-collapse-item title="作者搜索" name="3">
        <n-input-group class="keyword-input">
          <n-input v-model:value="author" />
          <n-button type="primary" @click="search(AUTHOR)">搜索</n-button>
        </n-input-group>
      </n-collapse-item>
      <n-collapse-item title="地理位置搜索" name="4">
        <div class="map-container">
          <baidu-map @selected-field="getSelectedField"></baidu-map>
        </div>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>


<script lang="ts" setup>
import {
  NInput,
  NButton,
  NInputGroup,
  NSpace,
  NTag,
  NCollapse,
  NCollapseItem,
} from 'naive-ui';
import { ref } from 'vue';
import BaiduMap from './baidu-map.vue';
import { SearchApi } from '@/api';

const KEYWORD = 0;
const TAGS = 1;
const AUTHOR = 2;
const LOCATION = 3;
const ADDRESS = 4;

const field = ref();
const tags = ref(['do', 'da', 'de', 'di']);
const tag_candidates = ref(['egg', 'eggmarket', 'eggplant']);
const search_res = ref();
const keyword = ref();
const keyword_for_tag = ref();
const author = ref();

const handleClose = (index: number) => {
  console.log(index);
  for (let i = index; i < tags.value.length; i++)
    tags.value[i] = tags.value[i + 1];
  tags.value.pop();
};

const handleChoose = (index: number) => {
  console.log(index);
  tags.value.push(tag_candidates.value[index]);
  for (let i = index; i < tag_candidates.value.length; i++)
    tag_candidates.value[i] = tag_candidates.value[i + 1];
  tag_candidates.value.pop();
};

const emit = defineEmits(['gotRes']);

const getSelectedField = (param: any) => {
  if (param) {
    field.value = param.value;
    search(LOCATION);
  } else field.value = 'no input';
};

const getTags = async () => {
  const res = await SearchApi.getTags(keyword_for_tag.value);
  tag_candidates.value = res.data.data;
};

const search = async (type: number) => {
  switch (type) {
    case KEYWORD:
      const res_keyword = await SearchApi.searchKeyword(keyword.value);
      search_res.value = res_keyword.data.data;
      break;
    case TAGS:
      const res_tags = await SearchApi.searchTags(tags.value);
      search_res.value = res_tags.data.data;
      break;
    case AUTHOR:
      const res_author = await SearchApi.searchAuthor(author.value);
      search_res.value = res_author.data.data;
      break;
    case LOCATION:
      const res_location = await SearchApi.searchLocation(
        field.value.longitude,
        field.value.latitude,
        field.value.radius
      );
      search_res.value = res_location.data.data;
      break;
    case ADDRESS:
      break;
  }
  emit('gotRes', search_res.value);
};
</script>


<style lang="scss" scoped>
.keyword-input {
  width: 70%;
  margin-left: 15%;
  margin-right: 15%;
}
.tag-input {
  width: 60%;
  margin-left: 15%;
  margin-top: 1%;
}
.tag-auto {
  margin-left: 1%;
}
.tags,
.tag-candidates {
  margin-top: 0.5%;
  margin-left: 15%;
  margin-right: 15%;
  padding: 1%;
  border-radius: 10px;
}
.tags {
  background-color: #0000000a;
}
.search-by-tags {
  margin: 1%;
  margin-left: 77%;
}
.map-container {
  margin-top: 5%;
}
</style>