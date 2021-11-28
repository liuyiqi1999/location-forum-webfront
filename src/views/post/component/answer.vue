<template>
  <div>
    <n-card hoverable>
      <n-thing>
        <template #avatar>
          <n-avatar round style="background-color: white">
            <n-icon color="rgb(255, 214, 121)">
              <answer-icon></answer-icon>
            </n-icon>
          </n-avatar>
        </template>
        <template #header>
          <div class="font-bolder">
            {{ answer.ownerName }}
          </div></template
        >
        <template #description>
          <div class="text-grey">⏳ 创建于 {{ answer.createTime }}</div>
        </template>
        <div v-if="!answer.isDeleted">{{ answer.content }}</div>
        <n-empty v-else description="该回答因违反论坛规范而被删除"></n-empty>

        <template #footer>
          <n-space justify="end">
            <n-button size="small" ghost @click="showComment = !showComment">
              <span v-if="!showComment"
                >💬 {{ answer.replySet.length }}条评论
              </span>
              <span v-else>💬 收起评论 </span>
            </n-button>
            <n-button size="small" ghost> 🏷️ 分享 </n-button>
            <n-button size="small" ghost> ✏️ 回答 </n-button>

            <n-dropdown
              trigger="hover"
              @select="handleSelect"
              :options="answerOptions"
              :show-arrow="true"
              >...</n-dropdown
            >
          </n-space>
        </template>
        <template #action>
          <!-- 评论列表 -->
          <div style="margin-left: 40px" v-if="showComment">
            <div
              class="font-bolder"
              style="font-size: 20px; padding-left: 30px"
            >
              {{ answer.replySet.length }}条评论
            </div>
            <n-card
              hoverable
              v-for="comment in answer.replySet"
              :key="comment.id"
            >
              <n-thing content-indented>
                <template #avatar>
                  <n-avatar round style="background-color: white">
                    <n-icon color="rgb(0, 153, 188)">
                      <comment-icon></comment-icon>
                    </n-icon>
                  </n-avatar>
                </template>
                <template #header>
                  <div class="font-bolder">
                    {{ comment.ownerName }}
                  </div>
                </template>
                <template #description>
                  <div class="text-grey">
                    ⏳ 创建于 {{ comment.createTime }}
                  </div>
                </template>

                <n-empty
                  v-if="comment.isDeleted"
                  description="该评论因违反论坛规范而被删除"
                ></n-empty>
                <div v-else>{{ comment.content }}</div>
                <template #action>
                  <n-space justify="end">
                    <n-dropdown
                      trigger="hover"
                      @select="handleSelect"
                      :options="answerOptions"
                      :show-arrow="true"
                      >...</n-dropdown
                    >
                  </n-space>
                </template>
              </n-thing>
            </n-card>
          </div>
        </template>
      </n-thing>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
import { IAnswer } from '@/entity';
import { ref } from 'vue';
import {
  BulbSharp as AnswerIcon,
  LogoDocker as CommentIcon,
} from '@vicons/ionicons5';
const props = defineProps({
  data: Object,
});
const showComment = ref(false);
const answer: IAnswer = props.data as IAnswer;
console.log('answer ', answer);

const handleSelect = () => {
  console.log(111);
};
const answerOptions = [
  {
    key: 'report',
    label: '举报',
  },
];
</script>
<style lang="scss" scoped>
.text-grey {
  color: gray;
}
.font-bolder {
  font-weight: bolder;
}
</style>
