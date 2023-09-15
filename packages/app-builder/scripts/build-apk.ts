import {
  readFileSync,
  ensureFileSync,
  writeFileSync,
  createWriteStream,
} from 'fs-extra';
import * as path from 'node:path';
import axios from 'axios';

const shell = require('shelljs');
const buildDataDir = path.resolve(process.cwd(), 'build-data');
const buildDir = path.resolve(process.cwd(), 'build');

const run = async () => {
  // 构造打包配置menifest.json
  const runtimeMenifest = JSON.parse(
    readFileSync(path.resolve(buildDir, 'manifest.json'), {
      encoding: 'utf-8',
    }),
  );

  // apk打包配置
  const buildMenifest: any = JSON.parse(
    readFileSync(path.resolve(buildDataDir, 'apk.json'), {
      encoding: 'utf-8',
    }),
  );
  // 由于Elephant只读取本地资源，需要拉取远端的图片至本地
  buildMenifest.launcherIcon = await Promise.all(
    buildMenifest.launcherIcon.map(async (iconObj: any) => {
      const iconFile = path.resolve(
        buildDir,
        'assets',
        `launcherIcon_${iconObj.resolution}.png`,
      );
      await axios.get(iconObj.icon, { responseType: 'stream' }).then((res) => {
        ensureFileSync(iconFile);
        res.data.pipe(createWriteStream(iconFile));
      });

      return {
        ...iconObj,
        icon: iconFile,
      };
    }),
  );
  buildMenifest.splash.background = await Promise.all(
    buildMenifest.splash.background.map(async (iconObj: any) => {
      const iconFile = path.resolve(
        buildDir,
        'assets',
        `background${iconObj.resolution}.png`,
      );
      await axios.get(iconObj.src, { responseType: 'stream' }).then((res) => {
        ensureFileSync(iconFile);
        res.data.pipe(createWriteStream(iconFile));
      });

      return {
        ...iconObj,
        src: iconFile,
      };
    }),
  );
  buildMenifest.keystore.storeFilePath = await (async function (url) {
    if (!url.startsWith('https://') && !url.startsWith('https://')) {
      return url;
    }
    const keystoreFile = path.resolve(buildDir, 'assets', path.basename(url));
    await axios.get(url, { responseType: 'stream' }).then((res) => {
      ensureFileSync(keystoreFile);
      res.data.pipe(createWriteStream(keystoreFile));
    });
    return keystoreFile;
  })(buildMenifest.keystore.storeFilePath);

  const buildConfigPath = path.resolve(buildDir, 'buildConfig.json');
  ensureFileSync(buildConfigPath);
  writeFileSync(
    buildConfigPath,
    JSON.stringify({
      runtime: { ...runtimeMenifest },
      build: { ...buildMenifest },
    }),
  );

  shell.exec(`
    export ELEPHANT_DIR=${path.resolve(process.cwd(), 'Elephant')}
    export ANDROID_BUILD_CONFIG=${buildConfigPath}
    cd $ELEPHANT_DIR
    ./gradlew assembleDebug
  `);
};

run();
