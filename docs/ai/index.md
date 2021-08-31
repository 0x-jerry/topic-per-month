---
title: 机器学习 ML
describe: 用算法去找出大脑的是学习模式
publish: false
---

[[toc]]

本文记录在学习 [ML-For-Beginner] 课程中的一些笔记和总结。

## 第一章 - ML 简介

> 机器学习 关注的是使用专门的算法来发现有意义的信息，并从感知的数据中找到隐藏的模式，以佐证理性的决策过程。
>
> ML is concerned with using specialized algorithms to uncover meaningful information and find hidden patterns from perceived data to corroborate the rational decision-making process.

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

回归模型属于监督式学习，回归模型适用于预测数据集中的某个属性。

### [线性回归][linear-regression]

用一个或者多个变量去表示目标值，常用于预测某个特征的值。 两种常见的线性回归模型

- [Lasso][lasso]
- [Tikhonov][tikhonov]

### [逻辑回归][logistic-regression]

常用于分类，目标特征值需要是已知的有限个数。

## [ONNX（Open Neural Network Exchange）][onnx]

机器学习通用数据模型结构，主要用于不同框架采用相同格式存储模型数据并交互。源码 [Github - ONNX](https://github.com/onnx/onnx)。

## 分类

在分类训练之前，需要先对数据进行处理。

1. 清除用不到的数据。
2. 用 [SMOTE][smote] 补充数据，使数据平衡。这样训练出来的模型就不会有偏向性。

## 参考文献

- [ML For beginner][ml-for-beginner]
- [introduction To Feature][introduction-to-feature]
- [Linear Regression][linear-regression]
- [Lasso Regression][lasso]
- [Tikhonov Regression][tikhonov]
- https://scikit-learn.org/stable/supervised_learning.html

[ml-for-beginner]: https://github.com/microsoft/ML-For-Beginners
[introduction-to-feature]: https://www.datasciencecentral.com/profiles/blogs/an-introduction-to-variable-and-feature-selection
[linear-regression]: https://www.wikiwand.com/en/Linear_regression
[lasso]: https://www.wikiwand.com/en/Lasso_(statistics)
[tikhonov]: https://www.wikiwand.com/en/Tikhonov_regularization
[logistic-regression]: https://www.wikiwand.com/en/Logistic_regression
[onnx]: https://www.wikiwand.com/en/Open_Neural_Network_Exchange
[supervised-learning]: https://wikipedia.org/wiki/Supervised_learning
[smote]: https://imbalanced-learn.org/dev/references/generated/imblearn.over_sampling.SMOTE.html
