/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-22 16:30:01
 * @Description:
 */
import { mergeConfig } from 'vite';
import { getCommonConfig } from './vite.common';
import { getCustomConfig } from './base';
import path from 'path';

// https://vitejs.dev/config/
export const devConfig = async () => {
  const CUSTOM_CONFIG = await getCustomConfig();
  const commonConfig = await getCommonConfig();

  const config = mergeConfig(commonConfig, {
    mode: 'development',
    configFile: false,
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
      },
    },
  });
  return mergeConfig(config, CUSTOM_CONFIG?.vite || {});
};
