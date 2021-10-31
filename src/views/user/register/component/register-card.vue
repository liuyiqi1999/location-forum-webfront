<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import {
    NCard,
    NForm,
    NFormItem,
    NInput,
    NButton,
    NIcon,
} from 'naive-ui';
import { useMessage } from 'naive-ui';
import { LogIn as LoginIcon } from '@vicons/ionicons5';

const registerForm = ref({
    username: '',
    password: '',
    reenteredPassword: '',
});
const rPasswordFormItemRef = ref<any>(null);
const rules = {
    username: [
        {
            required: true,
            message: '请输入用户名',
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
        },
    ],
    reenteredPassword: [
        {
            required: true,
            message: '请再次输入密码',
            trigger: ['input', 'blur']
        },
        {
            validator: (rule, value: string) => {
                return value === registerForm.value.password;
            },
            message: '两次密码输入不一致',
            trigger: ['blur', 'password-input']
        }
    ]
}
const handlePasswordInput = () => {
    if (registerForm.value.reenteredPassword) {
        rPasswordFormItemRef.value.validate({ trigger: 'password-input' })
    }
}

const goLogin = () => {
    router.push({
        name: 'Login'
    })
}

</script>

<template>
    <n-card class="login-card" title="注册">
        <template #header-extra>
            <n-button class="link-button" @click="goLogin">
                <template #icon>
                    <n-icon>
                        <login-icon />
                    </n-icon>
                </template>
                登录
            </n-button>
        </template>
        <n-form :model="registerForm" ref="registerFormRef" :rules="rules" label-placement="left" :label-width="80">
            <n-form-item path="username" label="用户名">
                <n-input
                    v-model:value="registerForm.username"
                    @keydown.enter.prevent
                    placeholder="请输入用户名"
                />
            </n-form-item>
            <n-form-item path="password" label="密码">
                <n-input
                    v-model:value="registerForm.password"
                    type="password"
                    @input="handlePasswordInput"
                    @keydown.enter.prevent
                    placeholder="请输入密码"
                />
            </n-form-item>
            <n-form-item first path="reenteredPassword" label="重复密码">
                <n-input
                    v-model:value="registerForm.reenteredPassword"
                    type="password"
                    :disabled="!registerForm.password"
                    @keydown.enter.prevent
                    placeholder="请再次输入密码"
                    ref="rPasswordFormItemRef"
                />
            </n-form-item>
        </n-form>
        <template #action>
            <div class="button-group">
                <n-button class="button" type="primary" @click="register" round>注册</n-button>
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
