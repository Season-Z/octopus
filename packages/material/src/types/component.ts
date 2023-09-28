/*
 * @Author: zhouxishun
 * @Date: 2023-09-27 11:39:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-27 11:39:51
 * @Description:
 */

export interface BaseComponentType<T> extends React.HTMLAttributes<T> {
  $$attributes: { key: string; value: any }[];
}
