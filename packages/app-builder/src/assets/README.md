# assets 目录说明

## dependency.xx.json

用于表明工程所依赖的资源

> TODO: 这部分后期需要线上化，使用配置中心管理

```json
[
  // 项目运行的系统依赖，业务无关，通常很少更新
  {
    "name": "react",
    "url": "https://some.com/react.js"
  },
  ...
  // 项目运行时依赖，决定ide代码如何执行，如基础组件、dsl、loader等
  {
    "name": "@sm/max-components",
    "url": "https://some.com/some.js"
  },
  ...
]
```
