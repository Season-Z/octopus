/**
 * (webpack plugin)
 * 用于向bundle.js中注入额外脚本
 */
import { readFileSync, existsSync } from 'fs-extra';
import axios from 'axios';
import * as path from 'node:path';
import { CWD_DIR, BUILDER_DIR } from '../constants';
import { Compiler, Compilation } from 'webpack';

// 缓存文件
const cache: Record<string, string> = {};

/**
 * 按页面获取资源文件内容，优先级为：
 * 1. 读取cache
 * 2. 读取dist/assets下载的本地包文件，路径为`包名/index.js`
 * 3. 从http拉取
 */
const getSource = async (source: InjectItem) => {
  if (!cache[source.name]) {
    const localAsset = path.resolve(
      BUILDER_DIR,
      `assets/${source.name}/index.js`,
    );
    if (existsSync(localAsset)) {
      cache[source.name] = readFileSync(localAsset, {
        encoding: 'utf-8',
      });
    } else if (
      source.url.startsWith('https://') ||
      source.url.startsWith('http://')
    ) {
      cache[source.name] = await axios.get(source.url).then((res) => res.data);
    } else {
      // TOFIX：已不支持直接配置本地文件地址，待移除
      cache[source.name] = readFileSync(path.resolve(CWD_DIR, source.url), {
        encoding: 'utf-8',
      });
    }
  }
  return cache[source.name];
};

export interface InjectItem {
  name: string;
  url: string;
}
interface MergeBundleOptions {
  // 注入脚本资源
  injects: InjectItem[] | ((entry: string) => InjectItem[]);
  // 注入头部文本
  banners?: string[];
}

class MergeBundlePlugin {
  private injects: InjectItem[] | ((entry: string) => InjectItem[]);
  private banners: string[];

  constructor(options: MergeBundleOptions) {
    this.injects = options.injects || [];
    this.banners = options.banners || [];
  }

  apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap('MergeBundlePlugin', (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: 'MergeBundlePlugin',
          stage:
            // 等bundle构建压缩完成
            Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
        },
        (compilationAssets, callback) => {
          // 获取dist目录的所有生成的资源文件信息，例如：index/index.js
          const pageInjectTask = (entry: string) => {
            const injects =
              typeof this.injects === 'function'
                ? this.injects(entry)
                : this.injects;

            return Promise.all(injects.map((source) => getSource(source))).then(
              (injectScripts) => {
                const filename = entry + '/index.js';
                let contents = compilationAssets[filename].source();
                // 注入umd脚本
                if (injectScripts.length) {
                  contents =
                    injectScripts.join(
                      '\n/**---------- inject umd -----------**/\n',
                    ) + contents;
                }
                // 注入头部文本
                if (this.banners.length) {
                  contents = this.banners.join('\n') + '\n' + contents;
                }

                // 覆盖原有内容
                compilation.updateAsset(
                  filename,
                  () => new compiler.webpack.sources.RawSource(contents, false),
                );
              },
            );
          };
          const injectTasks: Promise<any>[] = [];
          compilation.entries.forEach((_, name) => {
            injectTasks.push(pageInjectTask(name));
          });

          // 批量页面inject
          Promise.all(injectTasks).then(() => {
            callback();
          });
        },
      );
    });
  }
}

export { MergeBundlePlugin };
