<template>
  <div>
    <n-list>
      <n-list-item v-for="(result, index) in search_res.result" :key="index">
        <div class="question-whole">
          <div class="question-title">
            {{ result.title }}
          </div>
          <div class="question-location">
            <p
              v-if="
                !(
                  !result.province &&
                  !result.city &&
                  !result.district &&
                  !result.street
                )
              "
            >
              {{ result.province }}&nbsp;{{ result.city }}&nbsp;{{
                result.district
              }}&nbsp;{{ result.street }}
            </p>

            <p
              v-if="
                !result.province &&
                !result.city &&
                !result.district &&
                !result.street
              "
            >
              暂无位置信息
            </p>
          </div>
          &nbsp; &nbsp; &nbsp;
          <div class="question-author">作者：{{ result.ownerName }}</div>
          &nbsp; &nbsp; &nbsp;
          <div class="question-viewTime">浏览量:{{ result.viewTime }}</div>
          <div class="question-tags">
            <div
              v-for="(tag, index) in result.tags"
              :key="index"
              class="question-tag"
            >
              <n-tag v-if="index <= 3" type="success" round size="small"
                >{{ tag.name }}
              </n-tag>
            </div>
          </div>
        </div>
      </n-list-item>
    </n-list>
    <n-pagination
      v-model:page="pageNum"
      :page-count="search_res.totalPage"
      style="float: right"
      :on-update:page="getAnotherPage"
      v-if="search_res.totalPage > 0"
    />
  </div>
</template>


<script lang="ts" setup>
import { inject, ref } from 'vue';
import { NCard, NTag, NList, NListItem, NPagination } from 'naive-ui';
import { SearchApi } from '@/api';

const search_res = inject('search_res') as any;
const search_info = inject('search_info') as any;
const pageNum = ref(1);

const getAnotherPage = async (page: number) => {
  console.log(page);
  switch (search_info.value.type) {
    case 0:
      const res_keyword = await SearchApi.searchKeyword(
        page - 1,
        10,
        search_info.value.content.keyword
      );
      search_res.value = res_keyword.data.data;
      break;
    case 1:
      const res_tags = await SearchApi.searchTags(
        page - 1,
        10,
        search_info.value.content.tags
      );
      search_res.value = res_tags.data.data;
      break;
    case 2:
      const res_author = await SearchApi.searchAuthor(
        page - 1,
        10,
        search_info.value.content.author
      );
      search_res.value = res_author.data.data;
      break;
    case 3:
      const res_location = await SearchApi.searchLocation(
        page - 1,
        10,
        search_info.value.content.longitude,
        search_info.value.content.latitude,
        search_info.value.content.radius
      );
      search_res.value = res_location.data.data;
      break;
    case 4:
      break;
  }
  console.log(search_res.value);
  pageNum.value = page;
};
</script>


<style lang="scss" scoped>
.question-whole {
  padding-left: 4%;
  width: 100%;
}
.question-title {
  font-size: 175%;
  font-weight: bolder;
  max-width: 40%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.question-author {
  max-width: 20%;
}
.question-tags {
  margin-left: 2%;
  margin-top: 0.2%;
  max-width: 40%;
  display: inline-block;
  white-space: nowrap;
  vertical-align: top;
}
.question-tag {
  display: inline-block;
  margin-left: 1%;
}
.question-location,
.question-author,
.question-viewTime {
  margin-top: 0.2%;
  font-size: 30%;
  font-weight: lighter;
  display: inline-block;
}
</style>