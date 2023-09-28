/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-28 10:40:19
 * @Description:
 */
import { ButtonMeta, Button } from './button';
import Block, { BlockMeta } from './block';
import Container, { ContainerMeta } from './container';
import Video, { VideoMeta } from './video';
import Text, { TextMeta } from './text';
import { BaseComponentType } from '../types/component';

export const components = {
  RootContainer: ({ children }: BaseComponentType<HTMLDivElement>) => children,
  Button,
  Container,
  Video,
  Text,
  Block,
};

export const componentsMeta = {
  ButtonMeta,
  ContainerMeta,
  VideoMeta,
  TextMeta,
  BlockMeta,
};
