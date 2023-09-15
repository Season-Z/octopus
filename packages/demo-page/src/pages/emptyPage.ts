import { CPageDataType, InnerComponentNameEnum } from '@octopus/model';

export const EmptyPage: CPageDataType = {
  version: '1.0.0',
  name: 'EmptyPage',
  type: 'web',
  componentsMeta: [],
  componentsTree: {
    componentName: InnerComponentNameEnum.ROOT_CONTAINER,
    props: {},
    children: [],
  },
};
