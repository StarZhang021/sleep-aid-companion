# GitHub Pages 部署检查清单

## ✅ 部署前检查

### 1. 项目配置
- [x] `vite.config.js` 中 `base` 路径已设置为 `/sleep-aid-companion/`
- [x] `.github/workflows/deploy.yml` 已创建并配置正确
- [x] `package.json` 包含 `gh-pages` 依赖和 `deploy` 脚本
- [x] `.gitignore` 已配置，排除 `node_modules` 和 `dist`

### 2. 构建验证
- [x] `npm run build` 成功生成 `dist` 目录
- [x] `dist` 目录包含 `index.html` 和 `assets` 文件夹
- [x] 构建产物大小合理（约 300KB JS + 15KB CSS）

### 3. 功能验证
- [x] 开发服务器正常启动（`npm run dev`）
- [x] 所有页面和组件正常工作
- [x] 移动端响应式设计正常
- [x] 计时器功能正常
- [x] 主题切换功能正常

## 🚀 部署步骤

### 步骤 1：初始化 Git 仓库
```bash
cd "D:/交大/0-个人资料/sleep-aid-companion-main"
git init
git add .
git commit -m "feat: 睡眠辅助伴侣 - 初始版本"
git branch -M main
```

### 步骤 2：创建 GitHub 仓库
1. 访问 https://github.com/new
2. 仓库名称：`sleep-aid-companion`
3. 描述：`熬夜自救指南 - 一个治愈型网页应用`
4. 选择 Public
5. **不要**勾选 "Add a README file"
6. 点击 "Create repository"

### 步骤 3：推送代码
```bash
git remote add origin https://github.com/你的用户名/sleep-aid-companion.git
git push -u origin main
```

### 步骤 4：启用 GitHub Pages
1. 进入仓库 → **Settings** → **Pages**
2. **Source** 选择 **GitHub Actions**
3. 等待 Actions 工作流运行完成（约 1-2 分钟）

### 步骤 5：访问网站
部署成功后，访问：
```
https://你的用户名.github.io/sleep-aid-companion/
```

## 🔧 故障排除

### 问题 1：部署失败
- 检查 GitHub Actions 日志
- 确保 `vite.config.js` 中的 `base` 路径与仓库名一致

### 问题 2：页面空白
- 检查浏览器控制台错误
- 确保 `base` 路径正确

### 问题 3：资源加载失败
- 检查网络请求
- 确保所有资源路径正确

## 📱 移动端测试

部署后请在以下设备上测试：
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] iPad Safari
- [ ] 微信内置浏览器

## 🎯 性能指标

目标：
- 首屏加载时间 < 3 秒
- 动画流畅度 > 60fps
- 移动端适配良好

## 📞 支持

如有问题，请检查：
1. GitHub Actions 日志
2. 浏览器控制台错误
3. 项目 README.md 文档

---

**最后更新**：2024年5月24日
**项目状态**：✅ 准备就绪，可以部署