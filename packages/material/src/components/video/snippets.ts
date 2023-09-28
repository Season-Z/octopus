/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-26 16:10:35
 * @Description:
 */
import { SnippetsType } from '@octopus/model';

export const snippets: SnippetsType[] = [
  {
    title: '视频',
    snapshotText: 'Video',
    category: '基础组件',
    schema: {
      props: {
        width: '300px',
        height: '150px',
        src: 'https://vjs.zencdn.net/v/oceans.mp4',
      },
    },
  },
];
