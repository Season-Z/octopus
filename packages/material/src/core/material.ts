/*
 * @Author: zhouxishun
 * @Date: 2023-09-26 17:20:46
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-26 17:20:47
 * @Description:
 */

export const transformListToObj = (list: { key: string; value: any }[]) => {
  const res: Record<string, any> = {};
  list.forEach((el) => {
    res[el.key] = el.value;
  });
  return res;
};
