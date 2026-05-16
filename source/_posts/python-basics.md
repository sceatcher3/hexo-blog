---
title: Python入门：从零开始学编程
date: 2026-02-23 10:00:00
tags:
  - Python
  - 编程入门
categories:
  - 编程语言
---

Python是一门简洁优雅的编程语言，非常适合初学者入门。本文将介绍Python的基础知识。

<!-- more -->

## 为什么选择Python

- **语法简洁**：Python代码接近自然语言，易于阅读和编写
- **应用广泛**：Web开发、数据分析、人工智能、自动化脚本等
- **社区活跃**：丰富的第三方库和学习资源

## 基本语法

### 变量和数据类型

```python
# 数字类型
age = 25
price = 19.99

# 字符串
name = "Python"
message = '欢迎学习编程'

# 布尔值
is_active = True

# 列表
fruits = ["苹果", "香蕉", "橙子"]

# 字典
person = {"name": "张三", "age": 20}
```

### 条件语句

```python
score = 85

if score >= 90:
    print("优秀")
elif score >= 60:
    print("及格")
else:
    print("不及格")
```

### 循环语句

```python
# for循环
for i in range(5):
    print(f"第{i+1}次循环")

# while循环
count = 0
while count < 3:
    print(count)
    count += 1
```

### 函数定义

```python
def greet(name):
    """问候函数"""
    return f"你好，{name}！"

# 调用函数
result = greet("世界")
print(result)  # 输出：你好，世界！
```

## 总结

Python的简洁语法使其成为学习编程的理想选择。掌握这些基础知识后，你就可以开始编写自己的程序了！
