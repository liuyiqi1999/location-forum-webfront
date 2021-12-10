import { createRouter, createWebHistory } from 'vue-router';
import { myStore } from '@/store/index';
import { useMessage } from 'naive-ui';

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
    name: 'Search',
    component: () => import('@/views/search/index.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/index.vue'),
  },
  {
    path: '/hot',
    name: 'Rank',
    component: () => import('@/views/rank/index.vue'),
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
  const store = myStore();
  /** 判断是否登录 */
  if (!to.meta.requireAuth || store.getters.Username != '') {
    // 如果要登录管理员界面，必须有管理员资格
    if (to.name != 'Admin' || store.getters.getUserRole == 0) {
      next();
    } else {
      next({
        name: 'Search',
      });
    }
  } else {
    // 如果没有登录，就跳到登录页面
    next({
      name: 'Login',
    });
  }
});
export default router;
