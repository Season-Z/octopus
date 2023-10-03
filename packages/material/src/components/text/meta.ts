/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-28 17:39:33
 * @Description:
 */
import { MaterialType } from '@octopus/model';
import { snippets } from './snippets';
import { attributesMeta } from '@/config/common-meta';

export const meta: MaterialType = {
	title: '文本',
	componentName: 'Text',
	groupName: '原子组件',
	props: [
		{
			name: 'content',
			title: '内容',
			valueType: 'string',
			setters: ['TextAreaSetter', 'ExpressionSetter'],
		},
		attributesMeta,
	],
	snippets,
};
