/*
 * @Author: zhouxishun
 * @Date: 2023-09-14 11:03:31
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-10-04 20:22:27
 * @Description:
 */
import path from 'node:path';
import fs from 'node:fs';

// @ts-ignore
import { version } from '../package.json';

export const VERSION = version as string;
export const CWD_DIR = process.cwd();
// 构建基座目录
export const BUILDER_DIR = path.resolve(CWD_DIR, 'dist');
// 构建数据目录
export const BUILD_DATA_DIR = path.resolve(CWD_DIR, 'build-data');
// 构建产物目录
export const BUILD_DIST_DIR = path.resolve(CWD_DIR, 'build');
// 构建中间产物目录
export const CACHE_DIR = path.resolve(CWD_DIR, '.octopus');

let commitId = '';
if (fs.existsSync(path.resolve(BUILDER_DIR, 'commit.txt'))) {
  commitId = fs.readFileSync(path.resolve(BUILDER_DIR, 'commit.txt'), {
    encoding: 'utf-8',
  });
}
export const COMMIT_ID = commitId;
