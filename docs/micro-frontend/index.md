---
title: 微前端
date: 2021-06-01T02:03:01.122Z
tags: [micro-frontend, web]
---

## 什么是微前端？

引用一句 [micro-frontends] 的一句话

> Techniques, strategies and recipes for building **a modern web app** with **multiple teams** that can **ship features independently**.

简单翻译一下，大概意思是：用技术、策略和方法隔离不同 **团队** 开发的 **功能**，并构建 **现代化的 web 应用**。

经常有听到「微前端框架」这个词，那「微前端」是一门技术？不，微前端并不是一门技术，微前端仅仅是一种手段，通过制定一些标准，合作开发这个项目的团队都遵守这些标准。再通过这些标准整合起来的架构，也就成了「微前端」。

## 那么微前端到底解决的是什么问题？

想想我最初接触微前端，还是第一份正式工作的时候，当时是在一个创业公司，刚刚成立几个月。我进去的时候，公司有两个应用，一个 A 应用，一个 B 应用，分别对应两个域名。现在公司想做整合，把两个应用的功能整合在一起，组合起来，举个栗子。A 应用有两个页面，分别是 A-1，A-2。现在 B 应用，想要 A-1 这个功能，也就是这个页面，而且想要保持同步更新，也就是，只发布一次，就能同时更新 A 应用中的 A-1 和 B 应用中的 A-1。

当时的想法比较简单，因为公司用的 vue 框架，而 vue 组件可以打包成一个 js 文件。所以，一个简单的做法，就是把 A 应用中所有功能做成组件，然后打包成一个 js 文件，然后在 B 应用中，引用这个 js 文件，取其中的 A-1 组件，这样也就解决了问题。

其中核心的代码，大概是这样：

```ts
// <script src="//xxx.A.js"/>
const { A1 } = window._A

export const routes = [
  {
    path: '/a-1',
    component: A,
  },
]
```

从这个栗子中，可以看到，解决的问题也就是：如何在一个应用中引入一个不需要自己维护的能力或者功能。

进而拓展一下，可以理解成，我简单写一个模板，然后配置其中每个模块的功能，这样，一个应用就完成了。每个模板的功能，都交由不同的团队去维护。如果能实现这样的一个工具，那么就能大大的缩短一款产品的开发成本（想想就开心，做梦真好）。

在写这片文章的时候，有幸读到 [微前端的核心价值](https://www.yuque.com/kuitos/gky7yw/rhduwc)。

文中用了一整个章节来讨论「微前端」的价值，我简单的总结一下文中的概念，大致是：「微前端」解决的是如何让一个应用存活 3-5 年之后，开发者还能继续为其赋能，就像文章结尾所讲。

> 那么微前端的使命我认为是：「让天下没有短命的控制台」。

至此，我想，你应该大致对「微前端」有了一个了解。接下来就我们就唠嗑一下怎么解决这些问题。

## 微前端怎么解决这些问题的？

微前端，可看作是「微服务」派生出来的一个概念。也有点像 OOP(Object-Oriented Programing) 中的单一原则（Single Responsibility Principle），一个类、方法只做一件事情。

讲到一件事情，我们就不得不分析业务，把业务剥离开来，抽成一个一个的服务。然后再通过一些技术手段，来整合不同的服务。

先简单分享一下我想到的几种方式：

1. 用 npm package / git submodule 来管理
2. 用 iframe 加载
3. 开发 micro frontend 框架

### npm package / git submodule

这种方式，用起来就比较简单，就和用普通的 js 模块一样，除了分离出代码，没有任何其它优势。

### iframe

因为 iframe 的特性，天然的隔离性，优势也比较明显：运行环境隔离、独立发布。但同时缺点也很多：加载慢，性能堪忧、隔离性太强，以至于
会话状态共享都成了一个问题。

整体思考下来，iframe 除了隔离性好之外，也没有什么优势。

### micro frontend 框架

框架就多了去了，我选了实现有区别的轮子，简单的介绍介绍。

- amp: https://amp.dev/ , web component
- emp: https://github.com/efoxTeam/emp , webpack5 - module federation
- single-spa: https://github.com/single-spa/single-spa ,
- qiankun: https://github.com/umijs/qiankun , build top on single-spa

## 微前端需要解决的问题

1. 服务更新问题
2. 版本问题
3. 样式隔离问题
4. 通信问题

缺点：

1.

## 推荐阅读

- [micro-frontends]，一篇对「微前端」简单介绍的文章
- [martinfowler-micro-frontends]，分析「微前端」的优劣势，以及实践和细节处理方案
- [qiankun-技术圆桌]，探讨「微前端」的目的，使命

## 需要微前端吗？

[micro-frontends]: https://micro-frontends.org/
[martinfowler-micro-frontends]: https://martinfowler.com/articles/micro-frontends.html
[web-component]: https://developer.mozilla.org/en-US/docs/Web/Web_Components
[qiankun-技术圆桌]: https://www.yuque.com/kuitos/gky7yw/rhduwc
[webpack-module-federation]: https://webpack.js.org/concepts/module-federation/
