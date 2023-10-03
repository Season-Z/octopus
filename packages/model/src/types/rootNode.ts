/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-10-03 22:56:54
 * @Description:
 */
import { assign, literal, object, omit, string } from 'superstruct';
import { MaterialComponentsNameEnum } from '@octopus/material';
import { CNodePropsTypeEnum } from '../const/schema';
import { CNodeDataStructDescribe, CNodeDataType } from './node';

export enum InnerComponentNameEnum {
	ROOT_CONTAINER = 'RootContainer',
}

export type CRootNodeDataType = CNodeDataType & {
	componentName: MaterialComponentsNameEnum | `${MaterialComponentsNameEnum}`;
};

export const FunctionPropertyTypeDescribe = object({
	type: literal(CNodePropsTypeEnum.FUNCTION),
	value: string(),
});

export const CRootNodeDataTypeDescribe = assign(
	omit(CNodeDataStructDescribe, ['componentName']),
	object({
		componentName: literal(InnerComponentNameEnum.ROOT_CONTAINER),
	}),
);
