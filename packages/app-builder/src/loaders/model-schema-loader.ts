/**
 * [webpack-loader] 编译步骤比较单一，不需要构造缓存的入口文件，所以直接使用以webpack loader的形式使用
 *
 * 消费model.json
 * 1. 模型编译：json -> bundle.js
 */
import { BUILD_DIST_DIR } from '../constants';
import { Logger } from '../utils/logger';
import { compileModel } from '../plugins/model-build-plugin';
import { ModelProtocolV3 } from '../../types/build-data';

export default function (content: string) {
  // @ts-ignore
  const { projectSchema = {} } = this.query || {};
  // @ts-ignore
  const callback = this.async();
  const modelSchema = JSON.parse(content) as ModelProtocolV3;

  Logger.info(`[model-schema-loader]: building...`);

  // 工程外复合组件
  compileModel(projectSchema, modelSchema, BUILD_DIST_DIR)
    .then(() => {
      callback(null, '');
      Logger.info(`[model-schema-loader]: done`);
    })
    .catch((e) => {
      callback(e);
      Logger.error(`[model-schema-loader]: fail`);
    });
}
