---
title: 数据结构入门：数组、链表与栈
date: 2026-02-23 13:00:00
tags:
  - 数据结构
  - 算法
  - 计算机基础
categories:
  - 计算机科学
---

数据结构是计算机科学的基础，理解它们对于编写高效程序至关重要。本文介绍三种基础数据结构。

<!-- more -->

## 为什么学习数据结构

- 提高程序运行效率
- 解决复杂问题的基础
- 面试必考内容
- 理解更高级的算法

## 数组（Array）

数组是最基本的数据结构，元素在内存中连续存储。

### 特点
- 随机访问：O(1)
- 插入/删除：O(n)
- 固定大小（静态数组）

### 代码示例

```python
# Python中的列表（动态数组）
arr = [1, 2, 3, 4, 5]

# 访问元素 - O(1)
print(arr[2])  # 输出：3

# 添加元素 - O(1) 平均
arr.append(6)

# 插入元素 - O(n)
arr.insert(0, 0)

# 删除元素 - O(n)
arr.remove(3)
```

```javascript
// JavaScript数组
const arr = [1, 2, 3, 4, 5];

// 常用方法
arr.push(6);        // 末尾添加
arr.pop();          // 末尾删除
arr.unshift(0);     // 开头添加
arr.shift();        // 开头删除
arr.slice(1, 3);    // 切片
```

## 链表（Linked List）

链表由节点组成，每个节点包含数据和指向下一个节点的指针。

### 特点
- 随机访问：O(n)
- 插入/删除：O(1)（已知位置）
- 动态大小

### 代码实现

```python
class ListNode:
    def __init__(self, val=0):
        self.val = val
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, val):
        new_node = ListNode(val)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
    
    def print_list(self):
        current = self.head
        while current:
            print(current.val, end=" -> ")
            current = current.next
        print("None")

# 使用
ll = LinkedList()
ll.append(1)
ll.append(2)
ll.append(3)
ll.print_list()  # 1 -> 2 -> 3 -> None
```

## 栈（Stack）

栈是一种后进先出（LIFO）的数据结构。

### 特点
- 只能在栈顶操作
- push：入栈 O(1)
- pop：出栈 O(1)
- peek：查看栈顶 O(1)

### 代码实现

```python
class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None
    
    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)

# 使用
stack = Stack()
stack.push(1)
stack.push(2)
stack.push(3)
print(stack.pop())   # 3
print(stack.peek())  # 2
```

### 栈的应用
- 浏览器前进/后退
- 撤销操作（Ctrl+Z）
- 函数调用栈
- 括号匹配

## 时间复杂度对比

| 操作 | 数组 | 链表 | 栈 |
|------|------|------|-----|
| 访问 | O(1) | O(n) | O(n) |
| 搜索 | O(n) | O(n) | O(n) |
| 插入 | O(n) | O(1) | O(1) |
| 删除 | O(n) | O(1) | O(1) |

## 总结

选择合适的数据结构是编写高效程序的关键。数组适合频繁访问，链表适合频繁插入删除，栈适合后进先出的场景。
