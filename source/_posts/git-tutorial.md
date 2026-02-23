---
title: Git版本控制：程序员必备技能
date: 2026-02-23 12:00:00
tags:
  - Git
  - 版本控制
  - 工具
categories:
  - 开发工具
---

Git是最流行的分布式版本控制系统，每个程序员都应该掌握。本文介绍Git的核心概念和常用命令。

<!-- more -->

## 什么是Git

Git是一个分布式版本控制系统，可以：
- 追踪文件的修改历史
- 多人协作开发
- 回退到任意历史版本
- 管理多个开发分支

## 基本配置

```bash
# 设置用户名和邮箱
git config --global user.name "你的名字"
git config --global user.email "your@email.com"

# 查看配置
git config --list
```

## 常用命令

### 初始化仓库

```bash
# 创建新仓库
git init

# 克隆远程仓库
git clone https://github.com/user/repo.git
```

### 基本工作流

```bash
# 查看状态
git status

# 添加文件到暂存区
git add filename.txt
git add .  # 添加所有文件

# 提交更改
git commit -m "提交说明"

# 查看提交历史
git log --oneline
```

### 分支管理

```bash
# 查看分支
git branch

# 创建新分支
git branch feature-login

# 切换分支
git checkout feature-login
# 或使用新语法
git switch feature-login

# 创建并切换
git checkout -b feature-login

# 合并分支
git merge feature-login

# 删除分支
git branch -d feature-login
```

### 远程操作

```bash
# 添加远程仓库
git remote add origin https://github.com/user/repo.git

# 推送到远程
git push origin main

# 拉取更新
git pull origin main

# 查看远程信息
git remote -v
```

### 撤销操作

```bash
# 撤销工作区修改
git checkout -- filename.txt

# 撤销暂存
git reset HEAD filename.txt

# 撤销提交（保留修改）
git reset --soft HEAD^

# 撤销提交（丢弃修改）
git reset --hard HEAD^
```

## Git工作流程图

```
工作区 --> git add --> 暂存区 --> git commit --> 本地仓库 --> git push --> 远程仓库
```

## 总结

Git是现代软件开发的基础工具，熟练使用Git可以大大提高开发效率和团队协作能力。
