---
title: Markdown语法测试
date: 2026-02-23 14:00:00
tags:
  - Markdown
  - 测试
categories:
  - 博客
---

这是一篇用于测试Markdown各种语法渲染效果的文章。

<!-- more -->

## 标题测试

# 一级标题 H1
## 二级标题 H2
### 三级标题 H3
#### 四级标题 H4
##### 五级标题 H5
###### 六级标题 H6

---

## 文本样式

这是普通文本。

**这是粗体文本**

*这是斜体文本*

***这是粗斜体文本***

~~这是删除线文本~~

这是`行内代码`示例

> 这是一段引用文本
> 可以有多行
>> 这是嵌套引用

---

## 列表

### 无序列表

- 项目一
- 项目二
  - 子项目 2.1
  - 子项目 2.2
- 项目三

### 有序列表

1. 第一步
2. 第二步
   1. 子步骤 2.1
   2. 子步骤 2.2
3. 第三步

### 任务列表

- [x] 已完成任务
- [x] 另一个完成的任务
- [ ] 未完成任务
- [ ] 待办事项

---

## 链接与图片

[这是一个链接](https://hexo.io)

[带标题的链接](https://hexo.io "Hexo官网")

自动链接：<https://github.com>

![示例图片](https://via.placeholder.com/300x150 "图片标题")

---

## 代码块

### Python

```python
def fibonacci(n):
    """计算斐波那契数列"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

### JavaScript

```javascript
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
};
```

### HTML

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>测试页面</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>
```

### Bash

```bash
#!/bin/bash
echo "Hello, World!"
for i in {1..5}; do
    echo "Count: $i"
done
```

---

## 表格

| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 单元格 | 单元格 | 单元格 |
| 左 | 中 | 右 |
| AAA | BBB | CCC |

### 复杂表格

| 功能 | 支持 | 备注 |
|------|:----:|------|
| 标题 | ✅ | 六级标题 |
| 列表 | ✅ | 有序/无序 |
| 代码 | ✅ | 语法高亮 |
| 表格 | ✅ | 对齐方式 |
| 公式 | ⚠️ | 需插件 |

---

## 分隔线

三种写法：

---

***

___

---

## 转义字符

\*这不是斜体\*

\`这不是代码\`

\# 这不是标题

---

## HTML混用

<div style="background: #f0f0f0; padding: 10px; border-radius: 5px;">
  <strong>HTML块级元素</strong>
  <p>这是在Markdown中嵌入的HTML内容</p>
</div>

<kbd>Ctrl</kbd> + <kbd>C</kbd> 复制

<mark>高亮文本</mark>

上标：X<sup>2</sup> 下标：H<sub>2</sub>O

---

## Emoji

:smile: :heart: :thumbsup: :star: :rocket:

（注：Emoji显示取决于主题支持）

---

## 脚注

这是一个带脚注的文本[^1]。

这是另一个脚注[^note]。

[^1]: 这是脚注的内容。
[^note]: 这是一个命名脚注。

---

## 总结

以上涵盖了Markdown的主要语法，可用于测试博客主题的渲染效果。
