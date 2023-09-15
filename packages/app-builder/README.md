# max-builder

大程序工程构建基座，用于 IDE 上的各类型工程构建

## 设计原则

1. 使用一个构建基座，`配置+插件` 的形式来满足不同类型工程的构建
2. 构建基座本身的更新发布，通过流水线自动化
3. 构建需要分层，过程需要步骤化
4. 减少构建时依赖，依赖最大限度放在项目运行时，降低基座更新频率

## 目录说明

```bash
|- src
  |- assets         // 静态资源目录
  |- config         // webpack配置目录
  |- loaders        // loader目录
  |- plugins        // plugin目录
  |- templates      // 工程构建模板
  |- utils          // 工具函数
  |
  |- babel.config.ts
  |- constants.ts
  |- webpackge.config.ts
|- scripts          // 开发时的脚本，构建基座不包含这部分

```

## 开发

```bash
# 安装依赖
yarn

# 开发
yarn dev

# 构建基座本身的打包
yarn build:self

# 创建本地配置 builder.local.js，仅用于本地开发
yarn create-local-config

# 拉取指定环境指定项目数据，依赖 builder.local.js配置
yarn fetch-build-data

# 打包大程序工程
yarn build

# 本地打包apk，依赖于yarn build执行完js构建
yarn build-apk
```

## 开发本地配置

> builder.local.js

```js
/**
 * 构建本地调试配置，用于本地开发调试，可获取指定工程的某次构建任务的数据
 */
module.exports = {
  /**
   * 支持三种格式数据
   * 1. 原始schema对象{}
   * 2. 本地schema的json文件路径
   * 3.【推荐】远端构建日志http地址路径
   */
  rawSchema: 'https://xxx/log.txt',
  // api环境：dev|test|uat|prod
  sunmiEnv: 'dev',
  // 工程信息，和sunmiEnv配套使用
  project: {
    // 租户id
    tenantCode: 'TNTxxx',
    // 工程id
    projectCode: 'PRJxxxx',
    // 工程子类型：web|app|h5
    projectSubType: 'xx',
    // 迭代id
    iterationCode: 'ITExxxx',
    // 构建任务id
    taskCode: 'VCTxxx',
    //【仅针对应用工程】是否全量构建，true则忽略pages
    fullBuild: true,
    //【仅针对应用工程】批量构建的页面route
    pages: [],
  },
  //【仅针对应用工程】资源代理，包括src/assets/dependecy.*.json及project.json中的assets，可代理至本地脚本（仅支持绝对路径或http地址）
  assetsProxy: {
    android: {
      // key为src/assets/dependecy.*.json里的url，或者project.json中的assets的bundlePath
      'https://xxx.com/react.js': '/local/path/react.js',
    },
    web: {},
    h5: {},
  },
};
```

## 本地打包 apk

- 仅针对 app 应用工程有效，指令集合为 `yarn fetch-build-data && yarn build && yarn build-apk`
- 依赖 apk 打包工程 [Elephant](https://codeup.teambition.com/sunmi/MaxProgram/Android/Elephant.git)
- 打包环境需要自行安装 [Android Studio](https://developer.android.com/studio)（安装过程可以配套解决 jdk、android sdk、虚拟机等的安装，就不用手动单独挨个安装和配置环境）

## 基座产物结构

```bash
|- build-data             // 同构建容器约定，用于注入各类schema数据
  |- project.json         // 工程数据
  |- page.xxxx.json       // 页面数据
  |- component.xxxx.json  // 组件数据
  |- i18n.json            // 语言包数据
  |
|- dist                   // 构建基座
  |- assets                   // 静态资源目录
  |- config                   // webpack配置
  |- loaders                  // schema的解析与消费
  |- plugins                  // 文件处理及构建产物的落地
  |- templates                // 应用框架，初始化代码等
    |- android
      |- framework.js
    |- web
      |- framework.js
      |- document.ejs
  |- utils                    // 工具函数
  |- babel.config.js          // babel配置
  |- constants.js
  |- webpack.config.js        // 依赖webpack配置
  |
|- package.json
```

## 环境变量

构建容器可以通过环境变量，控制构建基座的构建行为。环境变量名称使用统一前缀 `MAX_BUILDER_`

```bash
# 构建工程类型【必须】：application|component
MAX_BUILDER_TYPE
# 构建工程子类型【必须】：app|web|h5
MAX_BUILDER_SUBTYPE
# 调试模式，开启不压缩代码
MAX_BUILDER_DEBUG


# 其他待扩展
```

## 构建脚本集合

```bash
# 构建android工程
MAX_BUILDER_TYPE=application MAX_BUILDER_SUBTYPE=app npm run build
# or
export MAX_BUILDER_TYPE=application
export MAX_BUILDER_SUBTYPE=app
npm run build


# 构建web工程
MAX_BUILDER_TYPE=application MAX_BUILDER_SUBTYPE=web npm run build
# or
export MAX_BUILDER_TYPE=application
export MAX_BUILDER_SUBTYPE=web
npm run build


# 构建h5工程
MAX_BUILDER_TYPE=application MAX_BUILDER_SUBTYPE=h5 npm run build
# or
export MAX_BUILDER_TYPE=application
export MAX_BUILDER_SUBTYPE=h5
npm run build

```

## 构建数据协议（build-data/\*）

见 [build-data.d.ts](/types/build-data.d.ts)

## FAQ

### 1. 构建基座需不需要 ts 编译？

分两块看：

1. 构建基座的开发本身，使用 ts 开发，构建基座自身的构建产物保持 js 形态
2. 工程构建，一律基于 js 形态的构建基座，编译 js，产出 js，这个过程无 ts 参与

历史上，IDE 里使用的编辑器为 ts 环境，产出的 source 字符串又要求是 js 语法，否则预览 eval 执行时报错，而由于原有构建基座里使用 ts 编译，构建产物又不报错，十分不统一

### 2. 构建流程对 webpack 的依赖如何

- 设计上：构建对 webpack 的依赖尽量做轻，甚至可根据不同构建类型，来使用不同构建器（纯 esbuild、纯 babel...），webpack 是选项，不是唯一。
- 实现上：放弃对 webpack 的 loader 及 plugin 的重度定制，构建流程前置的数据转换操作尽量从 webpack 配置里抽出。
- 原则就是两步走：**通过本地脚本处理好工程需要的所有文件转换；然后将完整的入口文件及其依赖文件交给构建器，执行标准的工程构建，得到所需的产物**。
  被放弃的和 webpack 耦合较深的一版实现[ref](https://codeup.teambition.com/sunmi/MaxProgram/FrontEnd/max-builder/tree/4a3d8901f4536ed1e196e44b0bed17ed1581c63e)
