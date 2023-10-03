/*
 * @Author: zhouxishun
 * @Date: 2023-09-22 11:05:04
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-10-03 21:43:34
 * @Description:
 */
import { MaterialType } from '@octopus/model';
import { ButtonMeta } from './button';
// import { ColMeta } from './col';
// import { InputMeta } from './input';
import { ModalMeta } from './modal';
// import { DivMeta } from './native';
// import { RowMeta } from './row';
import { TableMeta } from './table';
import { LayoutMeta } from './layout/index';

export const Material: MaterialType<any>[] = [TableMeta, ModalMeta, ButtonMeta, LayoutMeta];
