/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-28 15:08:18
 * @Description:
 */
import { MaterialType } from '@zxscls/model';
import { snippets } from './snippets';
import advanceCustom from './advanceCustom';
import { attributesMeta, heightPropsMeta, widthPropsMeta } from '@/config/common-meta';

export const meta: MaterialType = {
	title: '视频',
	componentName: 'Video',
	props: [
		{
			name: 'src',
			title: '地址',
			valueType: 'string',
			setters: ['StringSetter', 'ExpressionSetter'],
		},
		{
			name: 'autoPlay',
			title: '自动播放',
			valueType: 'string',
			setters: ['BooleanSetter', 'ExpressionSetter'],
		},
		{
			name: 'controls',
			title: '控制面板',
			valueType: 'string',
			setters: ['BooleanSetter', 'ExpressionSetter'],
		},
		widthPropsMeta,
		heightPropsMeta,
		attributesMeta,
	],
	fixedProps: {
		autoPlay: false,
	},
	advanceCustom,
	groupName: '原子组件',
	snippets,
};
