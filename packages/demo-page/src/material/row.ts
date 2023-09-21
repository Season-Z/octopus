import { MaterialType } from '@octopus/model';

export const RowMeta: MaterialType = {
  title: 'Row',
  componentName: 'Row',
  npm: {
    package: '@octopus/mock-material',
    exportName: 'Row',
    version: '1.0.0',
    name: 'Row',
  },
  icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_button.png',
  props: [
    {
      name: 'style',
      title: '样式',
      valueType: 'object',
      setters: ['JSONSetter'],
    },
  ],
  snippets: [
    {
      title: '行',
      snapshot:
        'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_button.png',
      category: 'HTML 元素',
      schema: {
        props: {},
      },
    },
  ],
  isContainer: true,
};
