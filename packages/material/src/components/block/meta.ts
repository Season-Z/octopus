/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-28 15:03:20
 * @Description:
 */
import { MaterialType } from '@zxscls/model';
import { snippets } from './snippets';
import { attributesMeta } from '../../config/common-meta';

export const meta: MaterialType = {
	title: '块',
	componentName: 'Block',
	props: [
		{
			name: 'children',
			title: '文本',
			valueType: 'string',
			setters: ['StringSetter', 'ExpressionSetter'],
		},
		attributesMeta,
	],
	groupName: '原子组件',
	snippets,
};
