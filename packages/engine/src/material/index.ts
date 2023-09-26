/*
 * @Author: zhouxishun
 * @Date: 2023-09-25 15:10:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-25 16:58:04
 * @Description:
 */
import { InnerComponentMeta } from './innerMaterial';
import { componentsMeta } from '@octopus/material';

export default [...InnerComponentMeta, ...Object.values(componentsMeta)];
