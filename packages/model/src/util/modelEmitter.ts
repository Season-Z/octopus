/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-21 17:42:31
 * @Description:
 */
import mitt from 'mitt';
import { CRootNode, CRootNodeModelDataType } from '@/Page/RootNode';
import { CNode, CNodeModelDataType } from '@/Page/RootNode/Node';
import { CProp } from '@/Page/RootNode//Node/prop';
import { CPropDataType } from '@/types/node';
import { CPageDataType } from '@/types/page';
import { CPage, CPpageDataModelType } from '@/Page';

export type DataModelEventType = {
  onPageChange: {
    value: CPageDataType | CPpageDataModelType;
    preValue: CPageDataType | CPpageDataModelType;
    node: CPage;
  };
  onReloadPage: {
    value: CPageDataType | CPpageDataModelType;
    preValue: CPageDataType | CPpageDataModelType;
    node: CPage;
  };
  onSchemaChange: any;
  onNodeChange: {
    value: CNodeModelDataType | CRootNodeModelDataType;
    preValue: CNodeModelDataType | CRootNodeModelDataType;
    node: CNode | CRootNode;
  };
  onPropChange: {
    value: CPropDataType;
    preValue: CPropDataType;
    node: CProp;
  };
};

export const DataModelEmitter = mitt<DataModelEventType>();
