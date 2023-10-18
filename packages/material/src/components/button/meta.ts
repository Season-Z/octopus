/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-25 17:59:22
 * @Description:
 */
import { MaterialType } from '@zxscls/model';
import { snippets } from './snippets';
import advanceCustom from './advanceCustom';

export const meta: MaterialType<
	| 'ColorSetter'
	| 'SliderSetter'
	| 'CSSSizeSetter'
	| 'BoxSizingSetter'
	| 'AntDColorSetter'
	| 'RadioGroupSetter'
	| 'CSSSizeSetter'
> = {
	title: 'Button',
	componentName: 'Button',
	groupName: '原子组件',
	npm: {
		package: '@zxscls/material',
		exportName: 'Button',
		version: '1.0.0',
		name: 'Button',
	},
	icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_button.png',
	props: [
		{
			name: 'setterTest',
			title: 'setter test',
			valueType: 'string',
			setters: [
				'AntDColorSetter',
				{
					componentName: 'RadioGroupSetter',
					props: {
						options: [
							{
								label: 'A',
								value: 'a',
							},
							{
								label: 'B',
								value: 'b',
							},
							{
								label: 'C',
								value: 'c',
							},
						],
						optionType: 'button',
						buttonStyle: 'solid',
					},
				},
				'ColorSetter',
				'SliderSetter',
				'CSSSizeSetter',
				'BoxSizingSetter',
			],
		},
		{
			name: 'setterTest2',
			title: 'setter test2',
			valueType: 'string',
			setters: [
				{
					componentName: 'ColorSetter',
					hiddenLabel: true,
				},
			],
		},
		{
			name: 'type',
			title: '按钮类型',
			valueType: 'string',
			setters: [
				{
					componentName: 'SelectSetter',
					props: {
						options: [
							{
								value: 'primary',
								label: 'primary',
							},
							{
								value: 'link',
								label: 'link',
							},
							{
								value: '',
								label: 'Default',
							},
						],
					},
				},
			],
		},
		{
			name: 'block',
			title: '块状按钮',
			valueType: 'boolean',
			setters: ['BooleanSetter'],
			condition: (state) => {
				if (state.type === 'primary') {
					return true;
				}
				return false;
			},
		},
		{
			name: 'children',
			title: '文本',
			valueType: 'string',
			setters: [
				{
					componentName: 'StringSetter',
					initialValue: '123',
				},
				'ExpressionSetter',
			],
		},
		{
			name: 'onClick',
			title: '点击时',
			valueType: 'function',
			setters: ['FunctionSetter', 'ExpressionSetter'],
		},
		{
			name: 'text1',
			title: '联动文本1',
			valueType: 'string',
			setters: [
				{
					componentName: 'StringSetter',
				},
			],
			condition: (state) => {
				if (state.type === 'primary1') {
					return true;
				}
				return false;
			},
		},
		{
			name: 'text2',
			title: '联动文本2',
			valueType: 'string',
			setters: [
				{
					componentName: 'StringSetter',
				},
			],
			condition: (state) => {
				if (state.text1 === '1') {
					return true;
				}
				return false;
			},
		},
		{
			name: 'text3',
			title: '联动文本3',
			valueType: 'string',
			setters: [
				{
					componentName: 'StringSetter',
				},
				'ExpressionSetter',
			],
		},
	],
	advanceCustom,
	snippets,
};
