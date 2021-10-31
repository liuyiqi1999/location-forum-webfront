<template>
  <div style="padding-top: 20px; box-shadow: 2px 2px 8px rgb(206, 202, 202)">
    <n-grid>
      <n-gi span="16">
        <div class="forum">同城论坛</div>
      </n-gi>
      <n-gi span="2">
        <div>
          <n-space :size="24" align="center">
            <n-icon size="30" color="#A6A6A6">
              <search-icon></search-icon>
            </n-icon>
          </n-space>
        </div>
      </n-gi>
      <n-gi span="2">
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
      <n-gi span="2">
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
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, h, ref } from 'vue';
import {
  NIcon,
  NButton,
  NGrid,
  NSpace,
  NBadge,
  NAvatar,
  NGi,
  NDropdown,
} from 'naive-ui';
import { RouterLink } from 'vue-router';
import {
  NotificationsOutline as MessageIcon,
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  SearchSharp as SearchIcon,
} from '@vicons/ionicons5';
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
const handleSelect = (key: any) => {
  console.log(key);
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
