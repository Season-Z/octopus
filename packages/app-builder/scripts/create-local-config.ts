import { ensureFileSync, writeFileSync } from 'fs-extra';
import * as path from 'node:path';

const tpl = `
/**
 * 构建本地调试配置，用于本地开发调试，可获取指定工程的某次构建任务的数据
 */
module.exports = {
  // 工程原始schema，一般从构建日志里捞取，定义后优先使用该数据，不再根据project配置动态拉取
  /**
   * 支持三种格式数据
   * 1. 原始schema对象{}
   * 2. 本地schema的json文件路径
   * 3.【推荐】远端构建日志http地址路径
   */
  rawSchema: '',
  // // api环境：dev|test|uat|prod
  // sunmiEnv: 'dev',
  // // 工程信息
  // project: {
  //   // 租户id
  //   tenantCode: 'TNTxxx',
  //   // 工程id
  //   projectCode: 'PRJxxxx',
  //   // 工程子类型：web|app|h5
  //   projectSubType: 'xx',
  //   // 迭代id
  //   iterationCode: 'ITExxxx',
  //   // 构建任务id
  //   taskCode: 'VCTxxx',
  //   //【仅针对应用工程】是否全量构建，true则忽略pages
  //   fullBuild: true,
  //   //【仅针对应用工程】批量构建的页面route
  //   pages: [],
  // },
  //【仅针对应用工程】资源代理，包括src/assets/dependecy.*.json及project.json中的assets，可代理至本地脚本（仅支持绝对路径或http地址）
  assetsProxy: {
    android: {
      // key为src/assets/dependecy.*.json里的url，或者project.json中的assets的bundlePath
      // 'https://xxx.com/react.js': '/local/path/react.js',
    },
    web: {},
    h5: {},
  },
};
`;

const run = () => {
  const configPath = path.resolve(process.cwd(), 'builder.local.js');
  ensureFileSync(configPath);
  writeFileSync(configPath, tpl);
};

run();
