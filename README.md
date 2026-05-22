# sceatcher3's Blog

个人技术博客，基于 [Hexo](https://hexo.io/) 构建，使用 [Butterfly](https://github.com/jerryc127/hexo-theme-butterfly) 主题。

## 技术栈

- **框架**: Hexo 8.x
- **主题**: Butterfly 5.x
- **语言**: Node.js
- **部署**: GitHub Pages + Cloudflare Pages

## 本地开发

```bash
# 安装依赖
npm install

# 启动本地服务（默认 http://localhost:4000）
npm run server

# 生成静态文件
npm run build
```

## 部署

每次推送到 `main` 分支，会自动触发以下部署：

| 平台 | 构建命令 | 访问地址 |
|------|----------|----------|
| GitHub Pages | `npm run build:github` | https://sceatcher3.github.io/hexo-blog |
| Cloudflare Pages | `npm run build:cloudflare` | https://hexo-blog-2sx.pages.dev |

### 手动部署

```bash
# GitHub Pages
npm run build:github
npm run deploy

# Cloudflare Pages
npm run build:cloudflare
```

## 项目结构

```
hexo-blog/
├── .github/workflows/     # GitHub Actions 自动部署
├── scaffolds/             # 文章模板
├── source/_posts/         # 博客文章 (Markdown)
├── deploy-utils/          # 部署辅助脚本
├── themes/                # 主题目录
├── _config.yml            # 主配置文件
├── _config.butterfly.yml  # Butterfly 主题配置
├── _config.cloudflare.yml # Cloudflare Pages 配置覆盖
└── package.json           # 依赖与脚本
```

## 许可证

MIT
