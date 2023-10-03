/*
 * @Author: zhouxishun
 * @Date: 2023-09-25 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-10-03 22:10:43
 * @Description: 图片
 */
import { transformListToObj } from '@/core/material';
import { BaseComponentType } from '@/types/component';
import { meta } from './meta';
import React, { FC } from 'react';

export interface TextComponentType extends BaseComponentType<HTMLSpanElement> {
	content: React.ReactNode[] | React.ReactNode | any;
}

const Text: FC<TextComponentType> = ({ $$attributes = [], content, ...props }) => {
	return React.createElement(
		'span',
		{
			...props,
			...transformListToObj($$attributes),
		},
		content,
	);
};

export default Text;

export const TextMeta = meta;
