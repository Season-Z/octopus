/**
 * 获取构建需要的schema数据
 * 构建容器中这部分数据由后端注入，本地开发时，通过api拉取并构造出对应数据，方便调试
 */
// import { createFetch, ENV_KEY } from './utils/fetch';
// import { readBuilderConfig } from './utils/read-builder-local';
// import * as path from 'path';
// import { ensureFileSync, writeFileSync, readFileSync } from 'fs-extra';
// import axios from 'axios';

import * as path from 'path';
import { writeFileSync } from 'fs-extra';

const cwd = process.cwd();
const buildDataRoot = path.resolve(cwd, 'build-data');

const run = async () => {
  // const builderConfig = (await readBuilderConfig()) as any;
  // const fetch = createFetch(builderConfig.sunmiEnv as ENV_KEY);

  // /**
  //  * 获取buildSchema
  //  * http://yapi.sunmi.com/project/396/interface/api/26401
  //  */
  // const fetchBuildSchema = async () => {
  //   try {
  //     const { rawSchema } = builderConfig;
  //     if (rawSchema) {
  //       if (
  //         typeof rawSchema === 'string' &&
  //         (rawSchema.startsWith('http://') || rawSchema.startsWith('https://'))
  //       ) {
  //         // 远端日志，从日志里捞出原始schema数据，不健壮，需要跟随构建容器迭代
  //         // 格式: xxxx-xx-xx xx:xx:xx [SCHEMA] [Assets] {....} \n
  //         const logTxt = await axios.get(rawSchema).then((res) => res.data);
  //         const regExp =
  //           /\d{4}([/:-\S])(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d \[SCHEMA\] \[Assets\].*/g;
  //         const result = (logTxt.match(regExp)[0] || '').replace(
  //           /^\d{4}([/:-\S])(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d \[SCHEMA\] \[Assets\]/,
  //           '',
  //         );
  //         return JSON.parse(result || '{}');
  //       } else if (typeof rawSchema === 'string') {
  //         // 本地文件
  //         return JSON.parse(readFileSync(rawSchema).toString());
  //       } else {
  //         // 原始对象
  //         return rawSchema;
  //       }
  //     }
  //     const { data } = await fetch.post(
  //       '/public/MaxViewSchemaFacade/getBuildSchema',
  //       {
  //         context: {
  //           tenantCode: builderConfig.project.tenantCode,
  //           projectCode: builderConfig.project.projectCode,
  //           projectSubType: builderConfig.project.projectSubType,
  //         },
  //         request: {
  //           preBuilding: false,
  //           iterationCode: builderConfig.project.iterationCode,
  //           projectCode: builderConfig.project.projectCode,
  //           taskCode: builderConfig.project.taskCode || '',
  //           envType: 'PROD',
  //         },
  //       },
  //     );
  //     return data;
  //   } catch (e) {
  //     return Promise.reject(e);
  //   }
  // };

  // const data = (await fetchBuildSchema()) as any;
  // /** 格式化到build-data指定文件 **/

  // // 使用资产数据模板化方案，返回的数据可直接消费，分拆为对应构建所需的文件即可
  // Object.keys(data.fileData || {}).map((file) => {
  //   const filePath = path.resolve(cwd, '.' + file);
  //   ensureFileSync(filePath);
  //   writeFileSync(filePath, JSON.stringify(data.fileData[file]));
  // });

  // // app工程会额外返回apkParams，用于apk构建
  // if (data.apkParams) {
  //   // apk.json，仅针对app应用工程，用于打包apk使用
  //   writeFileSync(
  //     path.resolve(buildDataRoot, `apk.json`),
  //     JSON.stringify(data.apkParams || {}),
  //   );
  // }

  // TODO 异步请求获取schema
  const localPage = window.localStorage.getItem('pageSchema');

  if (localPage) {
    writeFileSync(
      path.resolve(buildDataRoot, `schema.json`),
      localPage,
    );
  }
};

run();
