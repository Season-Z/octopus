/**
 * api的处理
 * 1. json -> js module
 */
import { writeFileSync, ensureFileSync } from 'fs-extra';

export const api2js = (api: { cloud?: any[]; iot?: any[] }, output: string) => {
  const { cloud = [], iot = [] } = api || {};
  const codes = [
    `export const cloudApi = ${JSON.stringify(cloud)};`,
    `export const iotApi = ${JSON.stringify(iot)};`,
  ];

  ensureFileSync(output);
  writeFileSync(output, codes.join('\n'));
};
