#!/bin/bash
cd $FRONT_WORK_DIR

# 设置 npm 仓库
# nrm add registry $NPM_REGISTRY
# nrm use registry

# npm 依赖下载
# npm i

# 执行构建
echo '----------------'
echo "node: $(node -v)";
echo "npm: $(npm -v)";
chmod -R 777 node_modules
echo '----------------'
npm run build
