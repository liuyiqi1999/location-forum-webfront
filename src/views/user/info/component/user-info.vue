<template>
  <div>
    <n-spin :show="showLoading">
      <!-- 用户信息 -->
      <!-- <div class="user-background"> -->
      <div class="user-background">
        <h1
          style="
            color: rgb(161, 157, 157);
            padding-left: 25px;
            margin-bottom: -10px;
          "
        >
          个人主页
        </h1>
        <div style="display: inline-block">
          <n-image
            style="border-radius: 100%"
            width="170"
            src="https://gitee.com/zqh1024/typora_img/raw/master/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20211030182351.jpg"
          />
          <!-- <n-avatar
            circle
            :size="170"
            src="https://gitee.com/zqh1024/typora_img/raw/master/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20211030182351.jpg"
          /> -->
        </div>
        <div class="user-info">
          <div class="info-item">
            <!-- color="#6A5ACD" -->
            <n-icon size="30" class="user-info-icon">
              <user-icon></user-icon>
            </n-icon>
            <span class="user-info-text"> 用户名： {{ user.username }} </span>
          </div>
          <div class="info-item">
            <!-- color="#2E8B57" -->
            <n-icon size="30" class="user-info-icon">
              <mail-icon></mail-icon>
            </n-icon>
            <span class="user-info-text"> 邮箱：{{ user.mail }} </span>
          </div>
          <div class="info-item">
            <!-- color="#8B4513" -->
            <n-icon size="30" class="user-info-icon">
              <signature-icon />
            </n-icon>
            <span class="user-info-text">
              签名：{{
                user.signature ? user.signature : '该用户很懒，啥都没写'
              }}
            </span>

            <n-space style="float: right">
              <n-button type="primary" @click="showModal = true">
                <template #icon>
                  <n-icon>
                    <edit-icon />
                  </n-icon>
                </template>
                编辑个人资料</n-button
              >
            </n-space>
          </div>
          <div></div>
        </div>
      </div>

      <!-- 更新个人资料的模态框 -->
      <n-modal v-model:show="showModal" preset="dialog" title="更新个人资料">
        <div>
          <n-input-group style="margin: 10px 0px">
            <n-input-group-label style="width: 20%">
              邮箱:
            </n-input-group-label>
            <n-input v-model:value="newMail" />
          </n-input-group>
          <n-input-group>
            <n-input-group-label style="width: 20%">
              签名:
            </n-input-group-label>
            <n-input v-model:value="newSignature" />
          </n-input-group>
        </div>
        <template #action>
          <div>
            <n-button @click="updateUserInfo"> 确认 </n-button>
          </div>
        </template>
      </n-modal>
    </n-spin>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useMessage } from 'naive-ui';
import {
  MailOpenOutline as MailIcon,
  ColorPaletteOutline as SignatureIcon,
  LogoOctocat as UserIcon,
  ColorWandOutline as EditIcon,
} from '@vicons/ionicons5';
import { useStore } from 'vuex';
import { UserApi } from '@/api';
const message = useMessage();
const user = reactive({
  username: '',
  pw: '',
  mail: '',
  signature: '',
  id: 0,
});
const store = useStore();
const initUser = async () => {
  const id = String(store.getters.getUserId);
  const { data } = await UserApi.getUserInfo(id);
  return data.data;
};

const newMail = ref();
const newSignature = ref();
// 显示加载进度
const showLoading = ref(false);
onMounted(async () => {
  // 更新用户信息
  showLoading.value = true;
  const originUser = await initUser();
  user.mail = originUser.mail;
  user.signature = originUser.signature;
  user.username = originUser.username;
  user.id = originUser.id;
  newMail.value = user.mail;
  newSignature.value = user.signature;
  showLoading.value = false;
});
const showModal = ref<boolean>(false);

const updateUserInfo = async () => {
  showLoading.value = true;
  const res = await UserApi.updateUserInfo(
    user.id,
    newMail.value,
    newSignature.value
  );
  const data = res.data.data;
  user.mail = data.mail;
  user.signature = data.signature;
  message.success('更新成功');
  showModal.value = false;
  showLoading.value = false;
};
</script>

<style lang="scss" scoped>
.user-info-text {
  margin-bottom: 10px;
  margin-left: 10px;
  vertical-align: middle;
  // color: #a6a6a6;
}
.info-item {
  margin-top: 35px;
}
.user-info-icon {
  vertical-align: middle;
}
.user-info {
  display: inline-block;
  width: 70%;
  margin-left: 50px;
}
.user-background {
  box-shadow: 2px 2px 8px rgb(206, 202, 202);
  // https://help.finereport.com/uploads/20200228/1582900628303953.gif
  // http://img.pptjia.com/image/20190921/7ca4eedc3a90a6f80ba36924a8668969.JPG

  // background-image: url('http://www.dnzhuti.com/uploads/allimg/160520/95-160520113115.jpg');
  // background-size: 100% 170%;
  // background-size: cover;
  padding-left: 15px;
  padding-bottom: 20px;
}
</style>
