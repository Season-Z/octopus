import { CNode, CRootNode } from '@zxscls/model';

export type RenderInstance = React.ReactInstance & {
	_DESIGN_BOX: boolean;
	_NODE_MODEL: CNode | CRootNode;
	_NODE_ID: string;
	_UNIQUE_ID: string;
	_STATUS?: 'DESTROY';
	_CONDITION?: boolean;
};
