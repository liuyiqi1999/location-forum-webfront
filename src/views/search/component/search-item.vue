<template>
  <div>
    <n-tabs type="line">
      <n-tab-pane name="3" tab="地理位置搜索"
        ><div class="map-container">
          <baidu-map @selected-field="getSelectedField"></baidu-map></div
      ></n-tab-pane>
      <n-tab-pane name="0" tab="关键词搜索"
        ><n-input-group class="keyword-input">
          <n-input v-model:value="keyword" />
          <n-button type="primary" @click="search(KEYWORD)">搜索</n-button>
        </n-input-group></n-tab-pane
      >
      <n-tab-pane name="1" tab="TAG搜索">
        <div class="tags">
          <div style="width:75%;display:inline-block">
            <n-dynamic-tags v-model:value="tags" />
          </div>
          <n-button type="primary" class="search-by-tags" @click="search(TAGS)">
            以这些tag进行搜索
          </n-button>
        </div>
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
              {{tag.name}}
            </n-tag>
          </n-space>
        </div>
      </n-tab-pane>
      <n-tab-pane name="2" tab="作者搜索"
        ><n-input-group class="keyword-input">
          <n-input v-model:value="author" />
          <n-button type="primary" @click="search(AUTHOR)">搜索</n-button>
        </n-input-group></n-tab-pane
      >
    </n-tabs>
  </div>
</template>


<script lang="ts" setup>
import {
  NInput,
  NButton,
  NInputGroup,
  NSpace,
  NTag,
  NTabs,
  NTabPane,
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
const tags = ref<any[]>([]);
const tag_candidates = ref<any[]>([]);
const search_res = ref();
const keyword = ref();
const keyword_for_tag = ref();
const author = ref();
const currentSearchingInfo = ref({
  type: -1,
  content: {},
});

const handleChoose = (index: number) => {
  console.log(index);
  tags.value.push(tag_candidates.value[index].name);
  for (let i = index; i < tag_candidates.value.length; i++)
    tag_candidates.value[i] = tag_candidates.value[i + 1];
  tag_candidates.value.pop();
};

const emit = defineEmits(['startSearch']);

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
  currentSearchingInfo.value.type = type;
  switch (type) {
    case KEYWORD:
      const res_keyword = await SearchApi.searchKeyword(0, 10, keyword.value);
      search_res.value = res_keyword.data.data;
      currentSearchingInfo.value.content = { keyword: keyword.value };
      break;
    case TAGS:
      var tagDataString = JSON.stringify(tags.value);
      const res_tags = await SearchApi.searchTags(0, 10, tagDataString);
      search_res.value = res_tags.data.data;
      currentSearchingInfo.value.content = { tags: tagDataString };
      break;
    case AUTHOR:
      const res_author = await SearchApi.searchAuthor(0, 10, author.value);
      search_res.value = res_author.data.data;
      currentSearchingInfo.value.content = { author: author.value };
      break;
    case LOCATION:
      const res_location = await SearchApi.searchLocation(
        0,
        10,
        field.value.longitude,
        field.value.latitude,
        field.value.radius
      );
      search_res.value = res_location.data.data;
      currentSearchingInfo.value.content = {
        longityde: field.value.longitude,
        latitude: field.value.latitude,
        radius: field.value.radius,
      };
      break;
    case ADDRESS:
      break;
  }
  emit('startSearch', {
    search_res: search_res.value,
    search_info: currentSearchingInfo.value,
  });
  console.log(search_res.value);
};
</script>


<style lang="scss" scoped>
.keyword-input {
}
.tag-input {
  margin-top: 2%;
  width: 90%;
}
.tag-auto {
  margin-left: 1%;
}
.tags,
.tag-candidates {
  margin-top: 0.5%;

  padding: 1%;
  border-radius: 10px;
}
.tags {
  background-color: #00000009;
}
.search-by-tags {
  margin: 1%;
  margin-top:-3px;
  float: right;
}
.map-container {
  margin-top: 1%;
}
</style>