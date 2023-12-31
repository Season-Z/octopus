/*
 * @Author: zhouxishun
 * @Date: 2023-09-14 11:03:31
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-10-04 22:28:37
 * @Description:
 */
// @ts-ignore
import React from '@sm/react';
// @ts-ignore
import * as ReactDom from '@sm/react-dom/client';
// @ts-ignore
// import { ComponentsManager } from '@sm/max-components-loader';
// @ts-ignore
// import { App } from '@builder/templates/web/components/App';
// @ts-ignore
import { Router } from '@builder/templates/web/components/Router';
// @ts-ignore
import { Render, ReactAdapter } from '../../../render/dist/index.umd.js';
// @ts-ignore
const jsonConver2Query = (json) =>
  Object.keys(json)
    .map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    })
    .join('&');
// 页面schema数据
const pageSchema = {
  version: '1.0.0',
  name: 'BaseDemoPage1',
  type: 'web',
  componentsMeta: [
    {
      componentName: 'Button',
      package: '@zxscls/material',
      exportName: 'Button',
      version: '1.0.0',
      name: 'Button',
    },
  ],
  componentsTree: {
    componentName: 'RootContainer',
    props: { a: 1 },
    state: { b: 2, buttonVisible: true, modalVisible: false },
    configure: { propsSetter: {}, advanceSetter: {} },
    children: [
      {
        props: { width: '100px', height: '100px' },
        componentName: 'Container',
        id: 'ckakcd',
        children: [
          {
            props: { width: '100px', height: '100px' },
            componentName: 'Container',
            id: 'ef9vms',
            children: [
              {
                props: {
                  width: '100px',
                  height: '100px',
                  afterMount: {
                    type: 'FUNCTION',
                    value:
                      "function didRender() {\n  const staticVar = $context.getStaticVar();\n  console.log('$context', $context)\n  let setTimer = function () {\n    const staticVar = $context.getStaticVar();\n    if (staticVar.timer) {\n      clearInterval(staticVar.timer);\n    }\n    const timer = setInterval(() => {\n      const bannerStateObj = $context.getStateObj();\n      console.log('bannerStateObj', bannerStateObj)\n      bannerStateObj.updateState((oldState) => {\n        const newPage = (oldState.currentPage + 1) % 3;\n        console.log('newPage', newPage, oldState)\n        return {\n          ...oldState,\n          currentPage: newPage\n        };\n      })\n    }, 2 * 1000);\n    staticVar.timer = timer;\n  }\n\n  staticVar.preScence = function leftClick(e) {\n    const staticVar = $context.getStaticVar();\n    if (staticVar.timer) {\n      clearInterval(staticVar.timer);\n    }\n\n    const bannerStateObj = $context.getStateObj();\n    console.log('currentStateObj', bannerStateObj, $context, bannerStateObj);\n    if (bannerStateObj.state.currentPage === 0) {\n      setTimer();\n      return\n    }\n    const newPage = (bannerStateObj.state.currentPage - 1) % 3;\n    bannerStateObj.updateState({\n      currentPage: newPage\n    });\n    setTimer();\n  };\n\n  staticVar.nextScence = function rightClick(e) {\n    const staticVar = $context.getStaticVar();\n    if (staticVar.timer) {\n      clearInterval(staticVar.timer);\n    }\n\n    console.log($context, e);\n    const currentStateObj = $context.getStateObj();\n    console.log('currentStateObj', currentStateObj);\n\n    if (currentStateObj.state.currentPage === 2) {\n      setTimer();\n      return\n    }\n    const newPage = (currentStateObj.state.currentPage + 1) % 3\n    currentStateObj.updateState({\n      currentPage: newPage\n    });\n    setTimer();\n  };\n\n  console.log('staticVar', staticVar)\n\n\n  setTimer();\n}",
                  },
                  beforeDestroy: {
                    type: 'FUNCTION',
                    value:
                      "function beforeDestroy() {\n  console.log('clear timer 1111');\n  if ($context.staticState.timer) {\n    console.log('clear timer');\n    clearInterval($context.staticState.timer);\n  }  \n}",
                  },
                  $attributes: [{}],
                },
                componentName: 'Container',
                id: '2vi5b1',
                children: [
                  {
                    props: { width: '100px', height: '100px', $attributes: [] },
                    style: {
                      transform: {
                        type: 'EXPRESSION',
                        value:
                          '`translateX(-${($context.stateManager.bannerState.state.currentPage) * 100}%) translateZ(0) `',
                      },
                    },
                    componentName: 'Container',
                    id: '69079u',
                    children: [
                      {
                        props: {
                          width: '100px',
                          height: '100px',
                          $attributes: [],
                        },
                        style: {
                          width: '100%',
                          'background-repeat': 'no-repeat',
                          'background-position': 'center',
                          'background-size': 'cover',
                          'flex-shrink': '0',
                          height: '100%',
                          'Webkit-transform': 'translate3d(0, 0, 0)',
                          'background-image': {
                            type: 'EXPRESSION',
                            value: '`url("${$context.loopData.item}")`',
                          },
                        },
                        componentName: 'Block',
                        id: 'v59d71',
                        configure: {
                          propsSetter: {},
                          advanceSetter: {
                            'loop.data': {
                              name: 'loop.data',
                              setter: 'ExpressionSetter',
                            },
                          },
                        },
                        title: 'Block-1',
                        loop: {
                          open: true,
                          data: {
                            type: 'EXPRESSION',
                            value:
                              '$context.stateManager.bannerState.state.imgList',
                          },
                          forName: 'item',
                          forIndex: 'index',
                          key: '',
                          name: '',
                        },
                        condition: true,
                        classNames: [
                          {
                            name: '123',
                            status: {
                              type: 'EXPRESSION',
                              value:
                                '$context.stateManager.bannerState.state.currentPage',
                            },
                          },
                          {
                            name: 'leftBox',
                            status: { type: 'EXPRESSION', value: 'true' },
                          },
                        ],
                        css: {
                          class: 'v59d71',
                          value: [
                            {
                              state: 'normal',
                              media: [
                                {
                                  type: 'max-width',
                                  value: '991',
                                  style: { 'align-content': '1233' },
                                },
                              ],
                              style: { 'align-content': '12323123' },
                            },
                            {
                              state: 'hover',
                              media: [],
                              style: { 'animation-duration': '123' },
                            },
                          ],
                        },
                      },
                    ],
                    configure: { propsSetter: {}, advanceSetter: {} },
                    title: 'banner-box',
                    loop: {
                      open: false,
                      data: [],
                      forName: 'item',
                      forIndex: 'index',
                      key: '',
                      name: '',
                    },
                    condition: true,
                    refId: 'bannerBox',
                    css: {
                      class: 'c_69079u',
                      value: [
                        {
                          state: 'normal',
                          media: [],
                          style: {
                            display: 'flex',
                            width: '100%',
                            position: 'absolute',
                            transition: 'all 0.3s',
                            height: '100%',
                            'Webkit-backface-visibility': 'hidden',
                          },
                        },
                      ],
                    },
                  },
                  {
                    props: {
                      width: '',
                      height: '',
                      $attributes: [
                        {
                          key: 'onClick',
                          value: {
                            type: 'FUNCTION',
                            value:
                              "function leftClick(e) {\n  const variableSpace =  $context.getStaticVarById('bannerState')\n  console.log('variableSpace', variableSpace);\n  variableSpace.preScence();\n}",
                          },
                        },
                      ],
                      children: { type: 'EXPRESSION', value: '' },
                    },
                    componentName: 'Block',
                    id: '9g9ohd',
                    configure: {
                      propsSetter: {
                        '$attributes.0.value': {
                          name: '$attributes.0.value',
                          setter: 'FunctionSetter',
                        },
                        children: {
                          name: 'children',
                          setter: 'ExpressionSetter',
                        },
                      },
                      advanceSetter: {},
                    },
                    title: 'array-left',
                    css: {
                      class: 'c_9g9ohd',
                      value: [
                        {
                          state: 'normal',
                          media: [],
                          style: {
                            width: '50px',
                            height: '50px',
                            'background-color': 'rgba(0,0,0,0.5)',
                            position: 'absolute',
                            'z-index': '999',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            'border-radius': '4px',
                            left: '10px',
                          },
                        },
                      ],
                    },
                  },
                  {
                    css: {
                      class: 'c_je9fi5',
                      value: [
                        {
                          state: 'normal',
                          media: [],
                          style: {
                            width: '50px',
                            height: '50px',
                            'background-color': 'rgba(0,0,0,0.5)',
                            position: 'absolute',
                            'z-index': '999',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            right: '10px',
                            cursor: 'pointer',
                            'border-radius': '4px',
                          },
                        },
                      ],
                    },
                    props: {
                      width: '',
                      height: '',
                      $attributes: [
                        {
                          key: 'onClick',
                          value: {
                            type: 'FUNCTION',
                            value:
                              "function rightClick(e) {\n\n  const variableSpace =  $context.getStaticVarById('bannerState')\n  console.log('variableSpace', variableSpace);\n  variableSpace.nextScence();\n}",
                          },
                        },
                      ],
                    },
                    componentName: 'Block',
                    configure: {
                      propsSetter: {
                        '$attributes.0.value': {
                          name: '$attributes.0.value',
                          setter: 'FunctionSetter',
                        },
                      },
                      advanceSetter: {},
                    },
                    title: 'array-right',
                    id: 'je9fi5',
                  },
                  {
                    style: {
                      position: 'absolute',
                      bottom: '10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      height: '20px',
                      display: 'flex',
                      'align-items': 'center',
                      'background-color': 'rgba(0,0,0,0.5)',
                      'border-radius': '10px',
                      padding: '0 10px',
                      'justify-content': 'space-around',
                      width: '80px',
                    },
                    props: { width: '100px', height: '100px' },
                    componentName: 'Container',
                    id: 'bl87pg',
                    children: [
                      {
                        props: {
                          width: '',
                          height: '',
                          $attributes: [
                            {
                              key: 'onClick',
                              value: {
                                type: 'FUNCTION',
                                value:
                                  'function click() {\n  console.log($context.loopData);\n}',
                              },
                            },
                          ],
                        },
                        componentName: 'Block',
                        id: 'jn98v0',
                        configure: {
                          propsSetter: {
                            '$attributes.0.value': {
                              name: '$attributes.0.value',
                              setter: 'FunctionSetter',
                            },
                            children: {
                              name: 'children',
                              setter: 'ExpressionSetter',
                            },
                          },
                          advanceSetter: {
                            'loop.data': {
                              name: 'loop.data',
                              setter: 'ExpressionSetter',
                            },
                          },
                        },
                        loop: {
                          open: true,
                          data: {
                            type: 'EXPRESSION',
                            value:
                              '$context.stateManager.bannerState.state.imgList',
                          },
                          forName: 'item',
                          forIndex: 'index',
                          key: '',
                          name: '',
                        },
                        condition: true,
                        children: [
                          {
                            style: {
                              background: {
                                type: 'EXPRESSION',
                                value:
                                  "$context.stateManager.bannerState.state.currentPage === $context.loopData.index ? 'white' : 'rgba(0,0,0,0.3)'",
                              },
                            },
                            props: {
                              width: '',
                              height: '',
                              $attributes: [
                                {
                                  key: 'onClick',
                                  value: {
                                    type: 'FUNCTION',
                                    value:
                                      'function click() {\n  console.log(222, $context.loopData);\n}',
                                  },
                                },
                              ],
                              children: { type: 'EXPRESSION', value: '' },
                            },
                            componentName: 'Block',
                            configure: {
                              propsSetter: {
                                '$attributes.0.value': {
                                  name: '$attributes.0.value',
                                  setter: 'FunctionSetter',
                                },
                                children: {
                                  name: 'children',
                                  setter: 'ExpressionSetter',
                                },
                              },
                              advanceSetter: {
                                'loop.data': {
                                  name: 'loop.data',
                                  setter: 'ExpressionSetter',
                                },
                              },
                            },
                            loop: {
                              open: false,
                              data: { type: 'EXPRESSION', value: '' },
                              forName: 'item',
                              forIndex: 'index',
                              key: '',
                              name: '',
                            },
                            condition: true,
                            id: '5mu9jm',
                            css: {
                              class: 'c_5mu9jm',
                              value: [
                                {
                                  state: 'normal',
                                  media: [],
                                  style: {
                                    'border-radius': '4px',
                                    width: '10px',
                                    height: '10px',
                                  },
                                },
                              ],
                            },
                          },
                        ],
                        css: {
                          class: 'c_jn98v0',
                          value: [
                            {
                              state: 'normal',
                              media: [],
                              style: {
                                width: '10px',
                                height: '10px',
                                'background-color': 'rgba(200,200,200,0.5)',
                                'border-radius': '4px',
                              },
                            },
                          ],
                        },
                      },
                    ],
                    configure: { propsSetter: {}, advanceSetter: {} },
                    loop: {
                      open: false,
                      data: [],
                      forName: 'item',
                      forIndex: 'index',
                      key: '',
                      name: '',
                    },
                    condition: true,
                    title: 'Container-thumbail',
                    css: {
                      class: 'c_bl87pg',
                      value: [
                        {
                          state: 'normal',
                          media: [],
                          style: { 'animation-duration': '1' },
                        },
                      ],
                    },
                  },
                ],
                configure: { propsSetter: {}, advanceSetter: {} },
                state: {
                  currentPage: 1,
                  imgList: [
                    'https://images.unsplash.com/photo-1584080277544-2db5b2c2d9dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                    'https://images.unsplash.com/photo-1486046866764-e426b5b93d98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2091&q=80',
                    'https://images.unsplash.com/photo-1534803005787-fa0b3987f6fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1502&q=80',
                  ],
                },
                loop: {
                  open: false,
                  data: [],
                  forName: 'item',
                  forIndex: 'index',
                  key: '',
                  name: '',
                },
                condition: true,
                nodeName: 'bannerState',
                css: {
                  class: 'c_2vi5b1',
                  value: [
                    {
                      state: 'normal',
                      media: [],
                      style: {
                        height: '500px',
                        position: 'relative',
                        width: '100%',
                        overflow: 'hidden',
                        margin: '0 auto',
                        'border-radius': '10px',
                      },
                    },
                  ],
                },
              },
            ],
            configure: { propsSetter: {}, advanceSetter: {} },
            title: 'Container-bg',
            css: {
              class: 'ef9vms',
              value: [
                { state: 'normal', media: [], style: { padding: '20px 40px' } },
              ],
            },
          },
          {
            props: { content: 'text' },
            componentName: 'Text',
            id: 'e8gp7i',
            configure: { propsSetter: {}, advanceSetter: {} },
          },
          {
            props: { type: 'primary' },
            children: ['按钮'],
            componentName: 'Button',
            id: 'naboi8',
            configure: { propsSetter: {}, advanceSetter: {} },
          },
          {
            props: { content: '2222' },
            componentName: 'Text',
            id: 'clgeth',
            configure: { propsSetter: {}, advanceSetter: {} },
          },
          {
            css: {
              value: [
                {
                  state: 'normal',
                  media: [],
                  style: {
                    background: 'white',
                    width: '100%',
                    height: '100px',
                  },
                },
              ],
            },
            componentName: 'Block',
            id: 'ea6rit',
            configure: { propsSetter: {}, advanceSetter: {} },
          },
          {
            props: { width: '100%', height: '100px' },
            componentName: 'Container',
            id: '96g0m0',
            configure: { propsSetter: {}, advanceSetter: {} },
          },
          {
            props: { content: 'Hello Chamelon EG' },
            componentName: 'Text',
            id: 'qpbnqn',
            configure: { propsSetter: {}, advanceSetter: {} },
            classNames: [
              { name: '', status: { type: 'EXPRESSION', value: 'true' } },
            ],
            css: {
              class: 'c_qpbnqn',
              value: [
                {
                  state: 'normal',
                  media: [
                    {
                      type: 'max-width',
                      value: '767',
                      style: { color: 'pink' },
                    },
                    { type: 'max-width', value: '991', style: {} },
                  ],
                  style: {
                    'text-align': 'center',
                    width: '100%',
                    display: 'inline-block',
                    'font-size': '80px',
                    padding: '20px',
                    'box-sizing': 'border-box',
                    'font-weight': 'bold',
                    'background-image':
                      'linear-gradient(         45deg,         #CA4246 16.666%,          #E16541 16.666%,          #E16541 33.333%,          #F18F43 33.333%,          #F18F43 50%,          #8B9862 50%,          #8B9862 66.666%,          #476098 66.666%,          #476098 83.333%,          #A7489B 83.333%)',
                    'background-color': '#CA4246',
                    'background-size': '100%',
                    'background-repeat': 'repeat',
                    color: 'transparent',
                    '-webkit-background-clip': 'text',
                  },
                },
              ],
            },
          },
          {
            style: {
              margin: '20px 40px',
              'border-radius': '20px',
              overflow: 'hidden',
              'box-shadow': '2px 2px 5px rgba(0,0,0,0.2)',
              'Webkit-backface-visibility': 'hidden',
            },
            props: { width: '100px', height: '100px' },
            componentName: 'Container',
            id: 'ekv045',
            children: [
              {
                props: {
                  width: '100%',
                  height: '',
                  src: 'https://vjs.zencdn.net/v/oceans.mp4',
                  autoPlay: '',
                  controls: true,
                  $attributes: [],
                },
                componentName: 'Video',
                id: 'vu26ll',
                configure: {
                  propsSetter: {
                    autoplay: { name: 'autoplay', setter: 'ExpressionSetter' },
                    autoPlay: { name: 'autoPlay', setter: 'BooleanSetter' },
                  },
                  advanceSetter: {},
                },
                css: {
                  class: 'c_vu26ll',
                  value: [
                    {
                      state: 'normal',
                      media: [],
                      style: { margin: 'auto', display: 'block' },
                    },
                  ],
                },
              },
            ],
            configure: { propsSetter: {}, advanceSetter: {} },
            title: 'video-container',
          },
        ],
        configure: { propsSetter: {}, advanceSetter: {} },
        title: 'bg-Container',
        classNames: [
          {
            name: 'qwerty',
            status: {
              type: 'EXPRESSION',
              value:
                '$context.stateManager.bannerState.state.currentPage === 1',
            },
          },
        ],
        css: {
          class: 'ckakcd',
          value: [
            {
              state: 'normal',
              media: [],
              style: {
                'background-color': 'white',
                width: '100%',
                overflow: 'auto',
              },
            },
          ],
        },
      },
    ],
  },
  thirdLibs: [
    { package: 'dayjs', name: 'dayjs', version: '1.0.0' },
    { package: 'antd', name: 'antd', version: '1.0.0' },
  ],
  assets: [
    {
      globalName: 'dayjs',
      package: 'dayjs',
      resources: [
        { src: 'https://cdn.bootcdn.net/ajax/libs/dayjs/1.11.7/dayjs.min.js' },
      ],
    },
    {
      globalName: 'antd',
      package: 'antd',
      resources: [
        { src: 'https://cdn.bootcdn.net/ajax/libs/antd/5.4.4/antd.js' },
        { src: 'https://cdn.bootcdn.net/ajax/libs/antd/5.4.4/reset.css' },
      ],
    },
  ],
};

let components;
// // 替换占位：全局逻辑
// let globalLogic;
// // 替换占位：页面逻辑
// let pageLogic;
// // 替换占位：页面复合组件
// let compositeComponents;
// // 替换占位：云服务
// let cloudApi;
// // 替换占位：iot服务
// let iotApi;
// zx: 覆写dsl路由，为了支持MPA下的路由堆栈
Router.init();
// const GlobalDataKey = '__GlobalDataKey';
// const globalData = sessionStorage.getItem(GlobalDataKey);
// 利用react的环境，挂载dom树
const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
  React.createElement(Render, {
    page: pageSchema,
    components: components,
    adapter: ReactAdapter,
  }),
);
