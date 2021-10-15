import { createRouter, createWebHistory } from "vue-router";

// 路由信息
const routes = [
    {
        path: "/login",
        name: "Login",
        component:  () => import('../views/user/login/index.vue'),
    },
    {
        path: "/register",
        name: "Register",
        component:  () => import('../views/user/register/index.vue'),
    },
];

// 导出路由
export default createRouter({
    history: createWebHistory(),
    routes
});

