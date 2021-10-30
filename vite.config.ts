import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}
export default defineConfig({
  plugins: [vue()],
  // 这里是将src目录配置别名为 @ 方便在项目中导入src目录下的文件
  resolve: {
    alias: {
      "@": pathResolve("src"),
    }
  },
})
