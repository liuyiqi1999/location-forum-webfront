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
        <div v-if="!answer.isDeleted" v-html="answer.content"></div>
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
            <n-button size="small" ghost @click="showAnswerInputArea = true"> ✏️ 回答 </n-button>
            <n-dropdown
              trigger="hover"
              @select="handleSelect"
              :options="answerOptions"
              :show-arrow="true"
              >...</n-dropdown
            >
          </n-space>
          <n-space justify="end">
            <n-card class="input-area" v-if="showAnswerInputArea">
              <input-area @input="handleInput" />
              <template #action>
                <n-space class="actions" justify="end">
                  <n-button class="reply-button" @click="showAnswerInputArea = false">取消</n-button>
                  <n-button class="reply-button" type="primary" @click="handleSubmitComment">回答</n-button>
                </n-space>
              </template>
            </n-card>
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
                <div v-else v-html="comment.content"></div>
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
import InputArea from '../../../components/common/input-area.vue';
import {useStore} from 'vuex';
import {GetLocationApi, PostApi} from '@/api';
import {useMessage} from 'naive-ui';
import {useRoute} from 'vue-router';
const route = useRoute();
const message = useMessage();
const store = useStore();

const props = defineProps({
  data: Object,
});
const showComment = ref(false);
const showAnswerInputArea = ref(false);
const answer: IAnswer = props.data as IAnswer;
console.log('answer ', answer);

const handleSelect = () => {
  console.log(111);
};
const editingComment = ref ('')
const handleInput = (event: string) => {
  editingComment.value = event;
}
const answerOptions = [
  {
    key: 'report',
    label: '举报',
  },
];

const handleSubmitComment = async () => {
  const ownerId = store.getters.getUserId;
  GetLocationApi.getLocationData();
  const locationData = JSON.parse(localStorage.getItem('address') || '');
  const id = route.params.id;
  const { data } = await PostApi.postComment({
    post_id: id ?? 0,
    owner_id: ownerId,
    block_id: answer.id,
    content: editingComment.value,
    ...locationData,
  });
  if (data.code === 200) {
    message.success('评论成功');
    showAnswerInputArea.value = false;
    location.reload();
  } else {
    message.error(`评论失败：${data.message}`);
  }
}
</script>
<style lang="scss" scoped>
.text-grey {
  color: gray;
}
.font-bolder {
  font-weight: bolder;
}
.input-area {
  width: 700px;
  margin-top: 30px;
}
</style>
