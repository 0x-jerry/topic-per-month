---
title: 机器学习 ML
describe: 用算法去找出大脑的是学习模式
publish: false
---

本文记录在学习 [ML-For-Beginner] 课程中的一些笔记和总结。

## 第一章 - ML 简介

机器学习 关注的是使用专门的算法来发现有意义的信息，并从感知的数据中找到隐藏的模式，以佐证理性的决策过程。(ML is concerned with using specialized algorithms to uncover meaningful information and find hidden patterns from perceived data to corroborate the rational decision-making process.)

### 构建机器学习的过程

通常来讲，机器善于在大量的数据中发现其中隐藏的规则。

宏观上来讲，可以分为以下几个步骤：

1. 取决于具体的问题：**简单的程序** 或者 **基于规则的引擎** 无法解决的问题，通常就是机器学习需要解决的问题
2. 收集以及准备数据：数据的好坏直接决定机器学习的结果
3. 选择一个训练方法：这一步通常需要专业的知识
4. 用数据去训练模型：通过各种各样的算法去识别数据中隐藏的模式
5. 评估训练好的模型：用一些模型未知的数据（测试数据），去检测模型的质量
6. 调节模型中的参数：不断的调节模型中的参数，以此找出更好的模型
7. 预测未知数据：让训练好的模型去预测输入的数据

### 特征

1. 特征选择：特征选择是从已有的特征中，选择一个子集
2. 特征提取：根据已有特征，创建一个新的特征

### 数据可视化

数据可视化，可以帮忙我们更好的发现数据之间（隐藏）的关系

### 分离数据集

把准备的数据集分割成一下几个部分：

- 训练数据：占据数据集中的大部分，用于训练模型
- 测试数据：占据数据集中的小部分，用户测试训练的效果
- 待预测数据：用于让训练好的模型去预测的数据，可以没有，例如预测天气，就不需要这部分数据

### 构建模型

1. 选择训练方法
2. 训练模型
3. 评估模型
   1. 模型拟合
   2. 过拟合/欠拟合
4. 参数调优
5. 预测

## 回归模型

## 参考文献

[ml-for-beginner]: https://github.com/microsoft/ML-For-Beginners
[introduction-to-feature]: https://www.datasciencecentral.com/profiles/blogs/an-introduction-to-variable-and-feature-selection
