import { resolve as resolvePath } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import { BUILD_DATA_DIR, CACHE_DIR } from './constants';
import { ProjectSchemaLoader } from './loaders/project-schema-loader';
import { Logger } from './utils/logger';
import { VERSION, COMMIT_ID } from './constants';
// import { ProjectProtocolV3 } from '../types/build-data';
// import * as pkg from '../package.json';
// 配置
// import androidConfig from './config/webpack.android';
import webConfig from './config/webpack.web';
// import componentConfig from './config/webpack.component';
// import modelConfig from './config/webpack.model';
// 依赖
// import androidDependency from './assets/dependency.android.json';
import webDependency from './assets/dependency.web.json';
import h5Dependency from './assets/dependency.h5.json';

export default () => {
  return new Promise(async (resolve) => {
    // 0. 构造缓存目录
    if (!existsSync(CACHE_DIR)) {
      mkdirSync(CACHE_DIR);
    }
    // 1. 处理schema.json
    const projectSchema = ProjectSchemaLoader(
      resolvePath(BUILD_DATA_DIR, 'project.json'),
    );

    console.log('sss----', projectSchema);
    const buildType = projectSchema.type;
    if (!buildType) {
      Logger.error(
        `[webpack.config]: Build type or subType cannot be undefined!`,
      );
      throw Error();
    }

    // 2. 输出构建关键信息
    Logger.info('');
    Logger.info('--------- Build Env ---------');
    Logger.info(
      `builder: ${VERSION} ${COMMIT_ID ? '(' + COMMIT_ID + ')' : ''}`, // 拼上commitid，方便version一致时定位代码是否更新
    );
    Logger.info(`type   : ${buildType}`);
    Logger.info(`project: ${projectSchema.name}`);

    /**
     * 依赖包信息：
     * 1. 第一部分：package.json里@sm/max-开头的构建时依赖
     * 1. 第二部分（仅针对应用工程）：assets/dependency.xx.json里的依赖
     */
    // Object.keys(pkg.dependencies)
    //   .filter((key) => key.startsWith('@sm/max-'))
    //   .map((key) => {
    //     Logger.info(
    //       `${key.replace('@sm/', '')}: ${(pkg as any).dependencies[key]}`,
    //     );
    //   });

    let dependencies = [] as any;

    switch (buildType) {
      case 'wechat':
        // dependencies = androidDependency;
        break;
      case 'web':
        dependencies = webDependency;
        break;
      case 'h5':
        dependencies = h5Dependency;
        break;
      default:
        break;
    }
    dependencies
      .filter((dep: any) => dep.name.startsWith('@sm/max-'))
      .map((dep: any) => {
        Logger.info(
          `${dep.name.replace('@sm/', '')}: ${
            dep.url.split(dep.name + '/')[1]?.split('/')[0] //【非健壮】根据url规则取版本号
          }`,
        );
      });

    Logger.info('-----------------------------');
    Logger.info('');

    // 3. 分发构建配置
    let config = {};

    // 应用工程
      switch (buildType) {
        case 'wechat':
          // config =
          //   (await androidConfig(projectSchema as ProjectProtocolV3)) || {};
          break;
        case 'web':
        case 'h5':
          config = (await webConfig(projectSchema)) || {};
          break;
        default:
          Logger.error(
            `[ webpack.config ]: Invalid build subType "${buildType}". Support subTypes: ["web","h5","wechat"].`,
          );
          throw Error();
      }

    resolve(config);
  });
};
