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
const jsonConver2Query = (json: Record<string, any>) =>
  Object.keys(json)
    .map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    })
    .join('&');

// 页面schema数据
let pageSchema;

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
const root = ReactDom.createRoot(document.getElementById('root') as Element);

root.render(
  <Render page={pageSchema} components={components} adapter={ReactAdapter} />,
);
