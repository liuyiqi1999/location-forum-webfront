<script lang="ts">
export default {
    name: 'LoginCard'
}
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import { PersonAddSharp as RegisterIcon } from '@vicons/ionicons5';
import {
  NCard,
  NForm,
  NFormItem,
  NInput,
  NButton,
  NIcon,
} from 'naive-ui';
import { useMessage } from 'naive-ui';
import { loginReq } from '../../../../api/user';

const loginForm = ref({
  username: '',
  password: '',
});
const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
};
const loginFormRef = ref<any>(null);
const message = useMessage();

const login = (e: any) => {
  e.preventDefault();
  loginFormRef.value.validate((errors: any) => {
    if (!errors) {
      loginReq({identification: loginForm.value.username, password: loginForm.value.password}).then(res => {
        message.success('登录成功');
      })
    } else {
      message.error('验证失败');
    }
  });
};

const goRegister = () => {
  router.push({
    name: "Register"
  })
}
</script>

<template>
  <n-card class="login-card" title="登录">
    <template #header-extra>
      <n-button class="link-button" @click="goRegister">
        <template #icon>
          <n-icon>
            <register-icon />
          </n-icon>
        </template>
        注册
      </n-button>
    </template>
    <n-form :model="loginForm" ref="loginFormRef" :rules="rules" label-placement="left">
      <n-form-item path="username" label="用户名">
        <n-input
          v-model:value="loginForm.username"
          @keydown.enter.prevent
          placeholder="请输入用户名"
        />
      </n-form-item>
      <n-form-item path="password" label="密码">
        <n-input
          v-model:value="loginForm.password"
          type="password"
          @keydown.enter.prevent
          placeholder="请输入密码"
        />
      </n-form-item>
    </n-form>
    <template #action>
      <div class="button-group">
        <n-button class="button" type="primary" @click="login" round
          >登陆</n-button
        >
      </div>
    </template>
  </n-card>
</template>


<style lang="scss" scoped>
.login-card {
  width: 30%;
  min-width: 350px;
  margin: 100px auto;
  .button-group {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .button:not(:first-of-type) {
      margin-left: 10px;
    }
  }
  .link-button {
    color: grey;
  }
}
</style>
