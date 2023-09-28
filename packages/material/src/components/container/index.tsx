/*
 * @Author: zhouxishun
 * @Date: 2023-09-25 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-28 10:36:05
 * @Description: 容器
 */
import React, { useEffect } from 'react';
import { meta } from './meta';
import { transformListToObj } from '../../core/material';

const Container = ({
  children,
  $$attributes = [],
  afterMount,
  beforeDestroy,
  ...props
}: any) => {
  let child = children;
  if (!Array.isArray(children)) {
    child = [children];
  }
  useEffect(() => {
    afterMount?.(props);
    return () => {
      beforeDestroy?.(props);
    };
  }, []);

  return (
    <div {...props} {...transformListToObj($$attributes)}>
      {child}
    </div>
  );
};
export default Container;

export const ContainerMeta = meta;
