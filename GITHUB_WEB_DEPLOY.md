# 🚀 GitHub 网页端部署指南（免费）

> 本指南面向**只用 GitHub 网页界面**操作的用户，无需安装任何命令行工具。
> GitHub Pages 完全免费，无需付费。

---

## 📋 准备工作

你已经有一份打包好的上传文件：
```
D:/交大/0-个人资料/sleep-aid-companion-upload.zip (33KB)
```

先解压到一个你记得住的位置，比如桌面。

---

## 第一步：创建 GitHub 仓库

1. 打开浏览器，登录你的 GitHub 账号
2. 点击右上角 **"+"** → **"New repository"**
3. 填写信息：
   - **Repository name**: `sleep-aid-companion`
   - **Description**: `熬夜自救指南 - 治愈型网页应用`（可选）
   - **Public**（必须选 Public，GitHub Pages 免费版要求公开仓库）
   - ✅ **Add a README file**（**勾选这个！** 网页端上传需要仓库非空）
4. 点击 **"Create repository"**

---

## 第二步：上传项目文件

### 2.1 先上传主要文件夹和文件

1. 进入刚创建的仓库页面
2. 点击 **"Add file"** → **"Upload files"**
3. 打开你解压后的 `sleep-aid-companion-main` 文件夹
4. **选中以下文件和文件夹，直接拖拽到上传区域：**

```
拖拽这些内容（全部一起拖）：
├── .github/          ← 整个文件夹（含 Actions 配置）
├── public/           ← 整个文件夹
├── src/              ← 整个文件夹（核心代码）
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

> **提示**：在 Windows 资源管理器中，按住 `Ctrl` 可以多选文件和文件夹，然后一起拖到浏览器。

5. 等待文件上传完成（33KB，几秒钟就好）
6. 在底部 **"Commit changes"** 区域填写：
   - **Commit message**: `feat: 初始版本 - 熬夜自救指南`
7. 点击 **"Commit changes"** 绿色按钮

### 2.2 确认文件结构

上传完成后，回到仓库主页，确认目录结构如下：

```
sleep-aid-companion/
├── .github/
│   └── workflows/
│       └── deploy.yml      ← 自动部署配置
├── public/
│   └── .nojekyll
├── src/
│   ├── components/         ← 10个组件
│   ├── composables/        ← 3个组合式函数
│   ├── utils/              ← 工具模块
│   ├── App.vue
│   └── main.js
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

> ⚠️ 如果 `.github` 文件夹没有上传成功（隐藏文件夹有时会漏掉），看下面的 **"补救方案"**。

---

## 第三步：启用 GitHub Pages

1. 在仓库页面，点击 **"Settings"**（顶部标签栏）
2. 左侧菜单找到 **"Pages"**
3. 在 **"Source"** 部分：
   - 选择 **"GitHub Actions"**（不是 "Deploy from a branch"）
4. 无需保存，选择后自动生效

---

## 第四步：等待自动部署

1. 回到仓库主页，点击顶部 **"Actions"** 标签
2. 你会看到一个正在运行的工作流（黄色圆圈 = 运行中）
3. 等待 1-3 分钟，直到变成绿色 ✅
4. 点击进入该工作流，底部会显示部署链接

**部署成功后，你的网站地址是：**
```
https://你的用户名.github.io/sleep-aid-companion/
```

---

## 🔧 补救方案

### 如果 `.github` 文件夹没上传成功

GitHub 网页端有时不显示隐藏文件夹。如果 Actions 没有自动运行，手动创建：

1. 在仓库页面点击 **"Add file"** → **"Create new file"**
2. 在文件名输入框中输入：`.github/workflows/deploy.yml`
   - 输入 `/` 时 GitHub 会自动创建文件夹
3. 粘贴以下内容：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

4. 点击 **"Commit changes"**

### 如果部署失败

1. 点击 **"Actions"** 查看红色 ❌ 的工作流
2. 点进去看具体错误日志
3. 常见问题：
   - **仓库名不匹配**：确保仓库名是 `sleep-aid-companion`，否则需要修改 `vite.config.js` 中的 `base` 路径
   - **Node.js 版本问题**：Actions 配置中已指定 Node 20，一般不会出问题

---

## 🎉 完成！

部署成功后，任何人都可以通过链接访问你的「熬夜自救指南」：

```
https://你的用户名.github.io/sleep-aid-companion/
```

- ✅ 完全免费
- ✅ 自动 HTTPS
- ✅ 全球 CDN 加速
- ✅ 每次推送代码自动重新部署

---

## 📱 访问测试

部署后请测试：
- [ ] 电脑浏览器打开链接
- [ ] 手机浏览器打开链接
- [ ] 检查主题切换是否正常
- [ ] 检查倒计时是否正常
- [ ] 检查呼吸练习功能

---

**最后更新**：2026年5月24日
