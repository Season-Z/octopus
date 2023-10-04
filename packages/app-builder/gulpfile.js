// 参考：https://www.typescriptlang.org/docs/handbook/gulp.html
const path = require('path');
const fs = require('fs-extra');
// const axios = require('axios');
const { execSync } = require('child_process');
const gulp = require('gulp');
// const esbuild = require('gulp-esbuild');
const zip = require('gulp-zip');
const through2 = require('through2');
const rimraf = require('rimraf');
const ts = require('gulp-typescript');
const bs = require('browser-sync').create('bundle server');

// const myEsbuild = esbuild.createGulpEsbuild();
const tsBuilder = ts.createProject('tsconfig.json');
const tsTplBuilder = ts.createProject('tsconfig.tpl.json');

// 编译
gulp.task('tsc', () =>
  gulp
    .src(['src/*.{ts,tsx}', 'src/!(assets|templates)/**/*.{ts,tsx}'])
    .pipe(tsBuilder())
    .pipe(gulp.dest('dist')),
);

// 编译监听
gulp.task(
  'watch-tsc',
  gulp.series(gulp.task('tsc'), () =>
    gulp.watch(
      ['src/*.{ts,tsx}', 'src/!(assets|templates)/**/*.{ts,tsx}'],
      gulp.task('tsc'),
    ),
  ),
);

// 编译模板
gulp.task('tsc-tpl', () =>
  gulp
    .src('src/templates/**/*.{ts,tsx}')
    .pipe(tsTplBuilder())
    .pipe(gulp.dest('dist/templates')),
);

// 编译模板监听
gulp.task(
  'watch-tsc-tpl',
  gulp.series(gulp.task('tsc-tpl'), () =>
    gulp.watch('src/templates/**/**/*.{ts,tsx}', gulp.task('tsc-tpl')),
  ),
);

// 拷贝文件
gulp.task('copy', () =>
  gulp
    .src('src/@(assets|templates)/**/*.!(js|jsx|ts|tsx|d.ts)')
    .pipe(gulp.dest('dist')),
);

// 拷贝文件监听
gulp.task(
  'watch-copy',
  gulp.series(gulp.task('copy'), () =>
    gulp.watch(
      'src/@(assets|templates)/**/*.!(js|jsx|ts|tsx|d.ts)',
      gulp.task('copy'),
    ),
  ),
);

// 构建id
gulp.task('commit_id', (cb) => {
  const commitId = process.env.CI_COMMIT_ID
    ? process.env.CI_COMMIT_ID.slice(0, 6)
    : execSync('git rev-parse HEAD').toString().slice(0, 6);
  fs.writeFileSync(path.resolve(process.cwd(), 'dist/commit.txt'), commitId);
  cb();
});

// // 下载构建依赖，由于部分umd脚本在cdn上，构建时拉取性能较差，这里直接基座打包时拉取作为本地依赖注入
// gulp.task('download_dependency', async (cb) => {
//   const dependencies = [].concat(androidDependency);

//   // 获取资源文件内容
//   const download = async (dependency) => {
//     const { url, name } = dependency;
//     if (!url.startsWith('https://') && !url.startsWith('http://')) {
//       throw Error('dependency.android.json格式错误, url必须为http(s)地址！');
//     }
//     const data = await axios.get(url).then((res) => res.data);
//     fs.ensureDirSync(path.resolve(process.cwd(), 'dist/assets', name));
//     fs.writeFileSync(
//       path.resolve(process.cwd(), 'dist/assets', name, 'index.js'),
//       data,
//     );
//   };

//   Promise.all(dependencies.map((dependency) => download(dependency))).then(
//     () => {
//       cb();
//     },
//   );
// });

// 开发
gulp.task(
  'dev',
  gulp.parallel('watch-tsc', 'watch-tsc-tpl', 'watch-copy'),
  (cb) => {
    cb();
  },
);

// 构建
gulp.task('build', gulp.series('tsc', 'tsc-tpl', 'copy', 'commit_id'));

// 构建基座打包zip
gulp.task(
  'zip',
  gulp.series(
    () => gulp.src('dist/**/*.*').pipe(gulp.dest('builder/dist')),
    () =>
      gulp
        .src(['build-data', 'package.json', 'build.sh'])
        .pipe(gulp.dest('builder')),
    () =>
      gulp
        .src('builder/**/*')
        .pipe(zip('builder.zip'))
        .pipe(gulp.dest('.'))
        .pipe(
          through2.obj(function (file, _, cb) {
            rimraf.sync('builder');
            cb(null, file);
          }),
        ),
  ),
);

// * 产物的预览
gulp.task(
  'serve',
  gulp.series(
    (cb) => {
      execSync('rm -rf tmp');
      cb();
    },
    () => gulp.src('build/**/*').pipe(gulp.dest('tmp')),
    () => {
      const data = require(`${process.cwd()}/tmp/manifest.json`);
      const htmlPath = `${process.cwd()}/tmp/index.html`;

      const { launcherRouter, pages } = data;
      pages.map((page) => {
        page.source = page.source.map((url) =>
          url.startsWith('https://')
            ? url
            : url.replace(`${process.cwd()}/build`, ''),
        );
      });

      // 占位符
      let placeholder = "'{{max_app_config}}'";

      const loadRouterData = (router) => {
        const maxAppConfig = `{ assets: ${JSON.stringify(router.source)}}`;
        // 读写文件替换
        const buffer = fs.readFileSync(htmlPath, { encoding: 'utf-8' });
        const htmlContent = buffer.replace(placeholder, maxAppConfig);
        fs.writeFileSync(htmlPath, htmlContent);
        placeholder = maxAppConfig;
        return htmlContent;
      };

      // 首页数据默认赋值
      const indexObj = pages.find((v) => v.router === launcherRouter);
      if (!indexObj) {
        throw 'ERROR: 无法查询到入口文件，请检查manifest.json的launcherRouter是否有效';
      }
      // 默认首页数据
      const content = loadRouterData(indexObj);
      fs.writeFileSync(htmlPath, content);

      bs.init({
        notify: false,
        port: 2000,
        reloadDebounce: 800,
        server: {
          baseDir: 'tmp',
          routes: {
            // 优先baseDir执行，如果有配置先走这个
            '/node_modules': './node_modules',
          },
        },
        watchOptions: {
          ignored: '*.html',
        },
        files: ['tmp/dist/**/*.js'],
        callbacks: {
          ready: (err, bs) => {
            if (err) {
              throw err;
            }

            bs.addMiddleware('*', function (req, res) {
              console.log('url', req.url);
              const currentRouter = req.url.startsWith('/')
                ? req.url.replace('/', '')
                : req.url;
              // 获取当前页的数据
              const target = pages.find((v) => v.router === currentRouter);
              if (!target) {
                return;
              }
              const content = loadRouterData(target);

              res.end(content);
            });
          },
        },
      });
    },
  ),
);
