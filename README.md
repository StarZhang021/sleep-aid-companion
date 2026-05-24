# 🌙 熬夜自救指南

一个治愈型网页应用，帮助夜猫子们找到熬夜时的小确幸。

![Vue 3](https://img.shields.io/badge/Vue-3.4-brightgreen)
![Vite](https://img.shields.io/badge/Vite-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue)

## ✨ 功能特色

### 🎨 6 种艺术风格主题
- 🌌 **星空** - 经典深蓝星空，流星划过
- 🎨 **梵高星空** - 旋涡笔触感，深蓝紫色调
- 🌸 **莫奈花园** - 印象派柔和色彩，气泡漂浮
- 🤖 **赛博朋克** - 霓虹绿网格，科幻风格
- 🏮 **和风物语** - 樱花飘落，日式美学
- ✨ **极光之夜** - 极光波浪，冷色调梦幻

### ⏰ 智能倒计时
- 圆形进度条显示距离最佳入睡时间
- 支持自定义目标入睡时间
- 剩余 10 分钟时变橙色呼吸光晕
- 时间到时显示烟花动画和晚安提示

### 🎯 个性化方案
- 6 个预设熬夜原因（加班、追剧、emo、游戏、论文、刷手机）
- 支持自定义输入原因
- AI 生成治愈方案（Groq API / 本地 Mock）
- 方案包含：问候语、音乐处方、三件小事、安慰语、入睡技巧

### 💜 治愈小站
- **478 呼吸法** - 动画引导吸气、屏息、呼气
- **冥想计时** - 3/5/10 分钟冥想引导
- **睡前心语** - 20 条正念语录，支持收藏

### 📸 分享功能
- 生成精美分享图片
- 一键下载 PNG

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 配置环境变量（可选）

创建 `.env` 文件，添加 Groq API Key：

```
VITE_GROQ_API_KEY=your_api_key_here
```

如果没有 API Key，应用会自动使用本地 Mock 数据。

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 局域网访问

开发服务器已配置 `host: '0.0.0.0'`，同一 WiFi 下的设备可通过你的 IP 地址访问：

```
http://你的IP地址:3000
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

---

## 🌐 部署到 GitHub Pages

本项目已配置自动部署到 [GitHub Pages](https://pages.github.com/)，推送代码即可上线。

### 方式一：自动部署（推荐）

项目已包含 GitHub Actions 工作流，推送到 `main` 分支会自动构建并部署。

#### 第一步：创建 GitHub 仓库

1. 在 GitHub 上创建一个新仓库，命名为 **`sleep-aid-companion`**
   - 如果你使用了其他名称，请修改 `vite.config.js` 中的 `base` 路径
2. 不要勾选 "Add a README file"（本地已有）

#### 第二步：推送代码

```bash
# 初始化 Git 仓库（如果尚未初始化）
git init

# 添加所有文件
git add .

# 提交
git commit -m "feat: 睡眠辅助伴侣 - 初始版本"

# 设置主分支为 main
git branch -M main

# 添加远程仓库（替换为你的 GitHub 用户名）
git remote add origin https://github.com/你的用户名/sleep-aid-companion.git

# 推送
git push -u origin main
```

#### 第三步：启用 GitHub Pages

1. 进入仓库 → **Settings** → **Pages**
2. **Source** 选择 **GitHub Actions**（不是 "Deploy from a branch"）
3. 等待 Actions 工作流运行完成（约 1-2 分钟）

#### 第四步：访问你的网站

部署成功后，你的网站地址为：

```
https://你的用户名.github.io/sleep-aid-companion/
```

### 方式二：手动部署

如果你想手动部署（不使用 GitHub Actions）：

```bash
# 安装 gh-pages（已包含在 devDependencies 中）
npm install

# 构建并部署
npm run deploy
```

然后在仓库 Settings → Pages 中，将 Source 设为 **Deploy from a branch**，选择 `gh-pages` 分支。

### 自定义域名（可选）

如果你有自定义域名：

1. 修改 `vite.config.js` 中的 `base` 为 `'/'`
2. 在仓库根目录创建 `public/CNAME` 文件，内容为你的域名（如 `example.com`）
3. 在域名提供商处配置 CNAME 记录指向 `你的用户名.github.io`
4. 在仓库 Settings → Pages → Custom domain 中填入你的域名

## 📁 项目结构

```
sleep-aid-companion/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── .gitignore
├── README.md
└── src/
    ├── main.js
    ├── App.vue
    ├── components/
    │   ├── StarryBackground.vue      # Canvas 星空背景
    │   ├── CountdownTimer.vue        # 倒计时组件
    │   ├── ReasonSelector.vue        # 原因选择器
    │   ├── AdviceCards.vue           # 建议卡片展示
    │   ├── ShareButton.vue           # 截图分享
    │   ├── ThemeSelector.vue         # 主题选择器
    │   ├── HealingHub.vue            # 治愈小站入口
    │   ├── BreathExercise.vue        # 呼吸练习
    │   ├── MeditationTimer.vue       # 冥想计时
    │   └── MindfulQuotes.vue         # 睡前心语
    ├── composables/
    │   ├── useSleepAdvice.js         # AI 调用 + Mock 降级
    │   ├── useCountdown.js           # 倒计时逻辑
    │   └── useTheme.js               # 主题管理
    └── utils/
        ├── starrySky.js              # Canvas 粒子系统
        └── mockData.js               # 本地 Mock 数据库
```

## 🛠️ 技术栈

- **前端框架**：Vue 3 + Vite
- **样式**：TailwindCSS（毛玻璃效果、深色主题）
- **动画**：Canvas 粒子系统、CSS 动画
- **AI 调用**：Groq API（Mixtral 模型）/ 本地 Mock
- **截图**：html2canvas

## 📱 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 许可证

MIT License

## 🙏 致谢

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Groq](https://groq.com/)

---

> 晚安，你赢了时间 🌙
