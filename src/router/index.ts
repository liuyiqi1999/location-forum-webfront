import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from 'vuex';

// 路由信息
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/user/login/index.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/user/register/index.vue'),
  },
  {
    path: '/user_info',
    name: 'UserInfo',
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('@/views/user/info/index.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/index.vue'),
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: () => import('@/views/post/index.vue'),
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('@/views/notice/index.vue'),
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path: '/',
    name: 'index',
    component: () => import('@/components/HelloWorld.vue'),
  },
];

// 导出路由
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// beforeEach:每次做路由跳转之前都会执行这个操作。
router.beforeEach((to, from, next) => {
  // to and from are Route Object,
  // to:跳转的时候想要跳转的页面的信息
  // from :指从哪里跳过来的信息
  // next() must be called to resolve the hook}
  // 中间:继续执行的方法

  /** 判断是否登录 */
  if (!to.meta.requireAuth || localStorage.getItem('token') != '') {
    next();
  } else {
    // 如果没有登录，就跳到登录页面
    next({
      name: 'Login',
    });
  }
});
export default router;
