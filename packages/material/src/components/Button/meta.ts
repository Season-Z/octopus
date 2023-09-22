/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-22 11:13:09
 * @Description:
 */
import { MaterialType } from '@octopus/model';
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
