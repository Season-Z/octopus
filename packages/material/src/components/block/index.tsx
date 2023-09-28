/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-28 10:38:08
 * @Description:
 */
import React, { FC } from 'react';
import { meta } from './meta';
import { transformListToObj } from '../../core/material';
import { BaseComponentType } from '../../types/component';

interface TextType extends BaseComponentType<HTMLDivElement> {
  width: number | string;
  height: number | string;
}

const Block: FC<TextType> = ({
  children,
  width,
  height,
  $$attributes = [],
  ...props
}) => {
  let child: React.ReactNode[] = Array.isArray(children)
    ? children
    : [children];
  child = child.filter(Boolean);

  const { style = {}, ...attributes } = transformListToObj($$attributes);
  const finalStyle = {
    height,
    width,
    ...style,
    ...(props.style || {}),
  };
  return React.createElement(
    'div',
    {
      ...props,
      ...attributes,
      style: finalStyle,
    },
    ...child
  );
};

export default Block;

export const BlockMeta = meta;
