import { CMaterialPropsType } from '@octopus/model';

/*
 * @Author: zhouxishun
 * @Date: 2023-09-25 18:08:33
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-26 15:42:51
 * @Description:
 */

/** @param 通用组件属性 */
export const attributesMeta: CMaterialPropsType[number] = {
  name: '$$attributes',
  title: '属性',
  valueType: 'object',
  setters: [
    {
      componentName: 'ArraySetter',
      props: {
        item: {
          setters: [
            {
              componentName: 'ShapeSetter',
              props: {
                elements: [
                  {
                    name: 'key',
                    title: '属性名',
                    valueType: 'string',
                    setters: ['StringSetter'],
                  },
                  {
                    name: 'value',
                    title: '值',
                    valueType: 'string',
                    setters: [
                      'StringSetter',
                      'NumberSetter',
                      'JSONSetter',
                      'FunctionSetter',
                      'ExpressionSetter',
                    ],
                  },
                ],
                collapse: false,
              },
              initialValue: {},
            },
          ],
          initialValue: {},
        },
      },
      initialValue: [],
    },
  ],
};

/** @param 宽度属性配置 */
export const widthPropsMeta: CMaterialPropsType[number] = {
  name: 'width',
  title: '宽度',
  valueType: 'string',
  setters: ['StringSetter', 'ExpressionSetter'],
};

/** @param 高度属性配置 */
export const heightPropsMeta: CMaterialPropsType[number] = {
  name: 'height',
  title: '高度',
  valueType: 'string',
  setters: ['StringSetter', 'ExpressionSetter'],
};
