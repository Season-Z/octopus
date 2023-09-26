/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-25 17:30:38
 * @Description:
 */
import { SnippetsType } from '@octopus/model';

export const snippets: SnippetsType[] = [
  {
    title: '按钮',
    snapshotText: 'Button',
    category: '通用',
    schema: {
      props: {
        type: 'primary',
      },
      children: ['按钮'],
    },
  },
];
