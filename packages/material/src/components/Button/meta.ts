/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-21 17:36:29
 * @Description:
 */
import { MaterialType } from '../..';
import { snippets } from './snippets';

export const meta: MaterialType = {
  componentName: 'Button',
  title: '按钮',
  props: [],
  npm: {
    name: 'Button',
    package: '@octopus/material',
    version: '0.0.1',
    destructuring: true,
    exportName: 'Button',
  },
  snippets: snippets,
};
