<template>
  <div>
    <n-list>
      <n-list-item v-for="(result, index) in search_res" :key="index">
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
  </div>
</template>


<script lang="ts" setup>
import { inject, ref } from 'vue';
import { NCard, NTag, NList, NListItem } from 'naive-ui';
const search_res = inject('search_res') as any;

</script>


<style lang="scss" scoped>
.question-whole {
  padding-left:4%;
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