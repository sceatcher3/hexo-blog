---
title: JavaScript基础：网页交互的核心
date: 2026-02-23 11:00:00
tags:
  - JavaScript
  - 前端开发
categories:
  - 编程语言
---

JavaScript是Web开发的核心语言，让网页具有交互能力。本文介绍JavaScript的基础概念。

<!-- more -->

## JavaScript简介

JavaScript最初是为了在浏览器中运行而设计的，如今已经发展成为全栈开发语言，可以运行在服务器端（Node.js）。

## 基础语法

### 变量声明

```javascript
// 使用let声明变量（推荐）
let name = "JavaScript";
let age = 25;

// 使用const声明常量
const PI = 3.14159;

// 避免使用var（旧语法）
var oldWay = "不推荐";
```

### 数据类型

```javascript
// 基本类型
let str = "字符串";
let num = 42;
let bool = true;
let empty = null;
let notDefined = undefined;

// 引用类型
let arr = [1, 2, 3];
let obj = { key: "value" };
```

### 函数

```javascript
// 函数声明
function add(a, b) {
    return a + b;
}

// 箭头函数（ES6）
const multiply = (a, b) => a * b;

// 调用
console.log(add(2, 3));      // 5
console.log(multiply(4, 5)); // 20
```

### DOM操作

```javascript
// 获取元素
const button = document.getElementById("myButton");
const items = document.querySelectorAll(".item");

// 添加事件监听
button.addEventListener("click", () => {
    alert("按钮被点击了！");
});

// 修改内容
document.getElementById("title").textContent = "新标题";
```

### 异步编程

```javascript
// Promise
fetch("https://api.example.com/data")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// async/await
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
```

## 总结

JavaScript是前端开发必备技能，掌握这些基础知识后，你就可以开始构建交互式网页了！
