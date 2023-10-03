/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-28 17:39:51
 * @Description:
 */
import { MaterialType } from '@octopus/model';
import { snippets } from './snippets';
import { attributesMeta, heightPropsMeta, widthPropsMeta } from '@/config/common-meta';

export const meta: MaterialType = {
	title: '图片',
	componentName: 'Image',
	props: [
		{
			name: 'src',
			title: '地址',
			valueType: 'string',
			setters: ['StringSetter', 'ExpressionSetter'],
		},
		widthPropsMeta,
		heightPropsMeta,
		attributesMeta,
	],
	groupName: '原子组件',
	snippets,
};
