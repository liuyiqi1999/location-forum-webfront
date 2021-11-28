import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {
  // create naive ui
  create,
  // component
  NButton,
  NThing,
  NIcon,
  NEmpty,
  NDropdown,
  NSpace,
  NTag,
  NAvatar,
  NTabPane,
  NTabs,
  NCard,
  NGrid,
  NGridItem,
  NGi,
  NLayout,
  NInput,
  NInputGroup,
  NModal,
  NInputGroupLabel,
  NSpin,
  NImage,
} from 'naive-ui';
const naive = create({
  components: [
    NButton,
    NThing,
    NIcon,
    NEmpty,
    NDropdown,
    NSpace,
    NTag,
    NAvatar,
    NTabPane,
    NTabs,
    NCard,
    NGrid,
    NGridItem,
    NGi,
    NLayout,
    NInput,
    NInputGroup,
    NModal,
    NInputGroupLabel,
    NSpin,
    NImage,
  ],
});
const app = createApp(App);
app.use(router);
app.use(store);
app.use(naive);
app.mount('#app');
