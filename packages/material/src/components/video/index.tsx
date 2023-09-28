/*
 * @Author: zhouxishun
 * @Date: 2023-09-25 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-28 10:15:00
 * @Description: 视频
 */
import React, { FC } from 'react';
import { meta } from './meta';
import { transformListToObj } from '../../core/material';
import { BaseComponentType } from '../../types/component';

const Video: FC<BaseComponentType<HTMLVideoElement>> = ({
  children,
  $$attributes = [],
  ...props
}) => {
  let child: React.ReactNode[] = Array.isArray(children)
    ? children
    : [children];
  child = child.filter(Boolean);

  return React.createElement(
    'video',
    {
      ...props,
      ...transformListToObj($$attributes),
    },
    ...child
  );
};

export default Video;

export const VideoMeta = meta;
