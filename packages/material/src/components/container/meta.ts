/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-28 17:40:08
 * @Description:
 */
import { MaterialType } from '@zxscls/model';
import { snippets } from './snippets';
import { attributesMeta, heightPropsMeta, widthPropsMeta } from '@/config/common-meta';

export const meta: MaterialType = {
	title: '容器',
	componentName: 'Container',
	isContainer: true,
	props: [
		widthPropsMeta,
		heightPropsMeta,
		{
			name: 'afterMount',
			title: '渲染之后',
			valueType: 'function',
			setters: ['FunctionSetter', 'ExpressionSetter', 'TestSetter' as any],
		},
		{
			name: 'beforeDestroy',
			title: '销毁之前',
			valueType: 'function',
			setters: ['FunctionSetter', 'ExpressionSetter'],
		},
		attributesMeta,
	],
	groupName: '原子组件',
	snippets,
};
