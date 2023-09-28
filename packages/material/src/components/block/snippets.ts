/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-28 14:57:00
 * @Description:
 */
import { SnippetsType } from '@octopus/model';

export const snippets: SnippetsType[] = [
  {
    title: '块',
    snapshotText: 'Block',
    category: '基础组件',
    schema: {
      props: {},
      css: {
        // TODO 待确认class是否必须
        value: [
          {
            state: 'normal',
            media: [],
            style: {
              background: 'white',
              width: '100%',
              height: '100px',
            },
          },
        ],
      },
    },
  },
];
