/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-29 21:36:00
 * @Description:
 */
import { CPageDataType, InnerComponentNameEnum } from '@octopus/model';

export const EmptyPage: CPageDataType = {
	version: '1.0.0',
	name: 'EmptyPage',
	code: 'sdada',
	componentsMeta: [],
	componentsTree: {
		componentName: InnerComponentNameEnum.ROOT_CONTAINER,
		props: {},
		children: [],
	},
};
