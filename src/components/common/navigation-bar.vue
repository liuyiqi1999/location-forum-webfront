<template>
  <div style="padding-top: 20px; box-shadow: 2px 2px 8px rgb(206, 202, 202)">
    <n-grid>
      <n-gi span="16">
        <div class="forum">同城论坛</div>
      </n-gi>
      <n-gi span="2" v-if="isLogin">
        <div>
          <n-space :size="24" align="center">
            <n-icon size="30" color="#A6A6A6">
              <search-icon></search-icon>
            </n-icon>
          </n-space>
        </div>
      </n-gi>
      <n-gi span="2" v-if="isLogin">
        <div>
          <n-space :size="24" align="center">
            <n-badge :value="messageNum" :max="15">
              <n-icon size="30" color="#A6A6A6">
                <message-icon></message-icon>
              </n-icon>
            </n-badge>
          </n-space>
        </div>
      </n-gi>
      <n-gi span="2" v-if="isLogin">
        <div>
          <n-space style="margin-top: -12px">
            <n-dropdown
              @select="handleSelect"
              trigger="hover"
              :options="userOptions"
            >
              <n-avatar
                circle
                :size="45"
                src="https://gitee.com/zqh1024/typora_img/raw/master/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20211030182351.jpg"
              />
            </n-dropdown>
          </n-space>
        </div>
      </n-gi>
      <n-gi span="2" v-if="!isLogin">
        <div>
          <n-button type="success" ghost @click="goLogin">登录</n-button>
        </div>
      </n-gi>
    </n-grid>
    <!-- 更新密码 -->
    <n-modal v-model:show="showUpdateModal" preset="dialog" title="更新密码">
      <div>
        <n-input-group style="margin: 10px 0px">
          <n-input-group-label style="width: 20%"> 密码： </n-input-group-label>
          <n-input v-model:value="newPassword" />
        </n-input-group>
      </div>
      <template #action>
        <div>
          <n-button @click="updateUserPassword"> 确认 </n-button>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, h, ref, watch } from 'vue';
import {
  NIcon,
  NButton,
  NGrid,
  NSpace,
  NBadge,
  NAvatar,
  NGi,
  NDropdown,
  NModal,
  NInput,
  NInputGroup,
  NInputGroupLabel,
  useMessage,
} from 'naive-ui';
import { RouterLink, useRouter } from 'vue-router';
import {
  NotificationsOutline as MessageIcon,
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  SearchSharp as SearchIcon,
} from '@vicons/ionicons5';
import { useStore } from 'vuex';
import { UserApi } from '@/api';

// 新消息的数量
const messageNum = ref(4);
const renderIcon = (icon: any, color: string) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon, { color: color }),
    });
  };
};
// 导航栏的颜色
const barColor = ref('#18A058');
const userOptions = [
  {
    label: '个人主页',
    key: 'userInfo',
    icon: renderIcon(UserIcon, barColor.value),
  },
  {
    label: '修改密码',
    key: 'updatePassword',
    icon: renderIcon(EditIcon, barColor.value),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutIcon, barColor.value),
  },
];

const store = useStore();
const isLogin = ref(store.getters.getUsername != '');
// 监听store数据，判断用户是否登录
watch(
  () => store.getters.getUsername,
  (val, old) => {
    isLogin.value = val != '';
  }
);

const showUpdateModal = ref(false);
const newPassword = ref('');

const handleSelect = (key: any) => {
  if (key == 'logout') {
    store.commit('clear');
    goLogin();
  } else if (key == 'userInfo') {
    if (store.getters.getUserRole == 0) {
      router.push({
        name: 'UserInfo',
      });
    } else {
      // todo：后面更新到管理员界面
      router.push({
        name: 'UserInfo',
      });
    }
  } else {
    // 修改密码,展示修改界面
    showUpdateModal.value = true;
  }
  console.log(key);
};
const message = useMessage();
const updateUserPassword = async () => {
  await UserApi.updateUserInfo(
    store.getters.getUserId,
    '',
    '',
    newPassword.value
  );
  message.success('更新密码成功');
  showUpdateModal.value = false;
};
const router = useRouter();
const goLogin = () => {
  router.push({
    name: 'Login',
  });
};
</script>

<style lang="scss" scoped>
// 导航栏的主题色
$barColor: v-bind(barColor);
.forum {
  padding-left: 20px;
  margin-top: -10px;
  font-size: 35px;
  color: $barColor;
  font-weight: bolder;
}
</style>
