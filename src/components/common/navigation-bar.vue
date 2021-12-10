<template>
  <div style="padding-top: 20px">
    <n-grid>
      <n-gi offset="2" span="12">
        <img
          class="icon"
          @click="goToName('Search')"
          width="170"
          src="https://gitee.com/zqh1024/typora_img/raw/master/bg1.png"
        />
      </n-gi>
      <n-gi span="8">
        <n-space justify="space-around">
          <!-- 热榜 -->
          <n-popover trigger="hover">
            <template #trigger>
              <n-button text @click="goToName('Rank')">
                <n-icon size="30"> <hot-icon></hot-icon> </n-icon
              ></n-button>
            </template>
            <span>热榜</span>
          </n-popover>

          <!-- 搜索 -->
          <n-popover trigger="hover">
            <template #trigger>
              <n-button text @click="goToName('Search')">
                <n-icon size="30"> <search-icon></search-icon> </n-icon
              ></n-button>
            </template>
            <span>搜索</span>
          </n-popover>

          <!-- 通知页面 -->
          <n-popover trigger="hover">
            <template #trigger>
              <n-button v-if="isLogin" text @click="goToName('Message')">
                <n-badge :value="messageNum" :max="100" color="green">
                  <n-icon size="30" color="grey">
                    <message-icon></message-icon>
                  </n-icon> </n-badge
              ></n-button>
            </template>
            <span>通知</span>
          </n-popover>

          <!-- 个人中心下拉列表 -->
          <n-button v-if="isLogin" text>
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
          </n-button>

          <!-- 登录按钮 -->
          <n-button
            v-if="!isLogin"
            size="large"
            type="success"
            ghost
            @click="goLogin"
            >登录</n-button
          >
        </n-space>
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
import { defineComponent, h, onMounted, onUnmounted, ref, watch } from 'vue';
import { NAvatar, NIcon, useMessage, useNotification } from 'naive-ui';
import { RouterLink, useRouter } from 'vue-router';
import {
  NotificationsOutline as MessageIcon,
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  SearchSharp as SearchIcon,
  Aperture as HotIcon,
} from '@vicons/ionicons5';
import { useStore } from 'vuex';
import { NoticeApi, UserApi } from '@/api';

// 新消息的数量
const messageNum = ref(0);
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
const isLogin = ref(
  store.getters.getUserInfo && JSON.stringify(store.getters.getUserInfo) != '{}'
);
// 监听store数据，判断用户是否登录
watch(
  () => store.getters.getUsername,
  async (val, old) => {
    console.log(val, old);
    isLogin.value =
      store.getters.getUserInfo &&
      JSON.stringify(store.getters.getUserInfo) != '{}';
    if (isLogin.value) {
      await updateMessageNum(store.getters.getUserId);
    }
  }
);
onMounted(async () => {
  if (isLogin.value) {
    await updateMessageNum(store.getters.getUserId);
  }
});
const message = useMessage();
let timer: any;
const updateMessageNum = async (id: number) => {
  console.log(' updateMessageNum id', id);
  if (isLogin.value && store.getters.getUserId) {
    const { data } = await NoticeApi.getUnreadMessageNum(id);
    let num = data.data;
    console.log('num', num);

    if (num > messageNum.value) {
      message.info(`您已收到 ${num - messageNum.value} 个新消息`);
      messageNum.value = num;
    }
    // timer = setInterval(() => {
    //   setTimeout(updateMessageNum, 60 * 1000, id);
    // }, 60 * 1000);
    // await updateMessageNum(id);
  }
};
const showUpdateModal = ref(false);
const newPassword = ref('');
const handleSelect = (key: any) => {
  if (key == 'logout') {
    store.commit('clear');
    goLogin();
  } else if (key == 'userInfo') {
    if (store.getters.getUserRole == 1) {
      router.push({
        name: 'UserInfo',
      });
    } else {
      // todo：后面更新到管理员界面
      router.push({
        name: 'Admin',
      });
    }
  } else {
    // 修改密码,展示修改界面
    showUpdateModal.value = true;
  }
  console.log(key);
};

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
const goToName = (name: string) => {
  router.push({
    name: name,
  });
};

//清除计时器
onUnmounted(() => {
  clearInterval(timer);
});
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
.icon {
  cursor: pointer;
}
</style>
