# 关于本项目

本项目基于 Vue3.2 和 TypeScript，利用了 [SFC 语法](https://v3.cn.vuejs.org/api/sfc-script-setup.html#%E5%9F%BA%E6%9C%AC%E8%AF%AD%E6%B3%95)。同时使用 [Vite](https://vitejs.cn/) 优化了开发与构建的体验。组件库方面，使用支持 Vue3 的 [Naive UI](https://www.naiveui.com/)。

# 开发配置

快速开始：

```
npm i
npm run dev
```

建议配置：

- 使用 VSCode 开发
- 使用 ESlint、Prettier 插件用于格式化代码（项目目录中已配置 .eslintrc.js，.prettierrc.js）
- 使用 Volar 插件用于提升 Vue3 代码开发体验（如果你正在使用 Vetur，请暂时禁用以防冲突）

# Git SOP

进行任何功能点开发时，请确保从 master 分支先拉一个全新的子分支，形如 feature/lyq-xxxxxx，并在此分支上开发。一般一个分支只开发一个功能点。

某分支上的功能点开发完成后，请在 Github 上提出一个由当前分支（如 feature/lyq-xxxxxx）到 master 分支的 Pull Request。经过 Code Review 后，代码将被合并到 master 中。

**请勿直接在 master 上开发！**
**请勿直接在 master 上开发！**
**请勿直接在 master 上开发！**

## 分支名规范

(feature|bugfix)/[你的姓名首字母缩写]-[分支开发内容]

- feature：新功能
- bugfix：对 master 上 bug 的修复

## Commit Message 规范

(feat|fix|chore): [本次 commit 的内容]

- feat：新增功能
- fix：修复缺陷
- chore：小修改，不影响整体功能

## 注意

1. 请不要合并除 master 以外其他分支的代码，以防污染。
2. 请不要直接在 master 上开发，或向 master 分支 commit、push。
3. 进行任何开发前，请先确保你在自己创建的某个分支上。
4. 请不要随意删除分支。
