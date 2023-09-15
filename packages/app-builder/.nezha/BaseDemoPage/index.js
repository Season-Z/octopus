import React from "@sm/react";
import * as ReactDom from "@sm/react-dom/client";
import { Router } from "@builder/templates/web/components/Router";
import { Render, ReactAdapter } from "../../../render/dist/index.umd.js";
const jsonConver2Query = (json) => Object.keys(json).map(function(key) {
  return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
}).join("&");
const pageSchema={"version":"1.0.0","name":"BaseDemoPage","componentsMeta":[],"componentsTree":{"componentName":"RootContainer","props":{"a":1},"state":{"b":2,"buttonVisible":true,"modalVisible":false},"configure":{"propsSetter":{},"advanceSetter":{}},"children":[{"props":{"width":"100px","height":"100px"},"componentName":"CContainer","id":"ckakcd","children":[{"props":{"content":"text"},"componentName":"CText","id":"1g13qt","configure":{"propsSetter":{},"advanceSetter":{}}}],"configure":{"propsSetter":{},"advanceSetter":{},"devState":{"condition":true}},"title":"bg-CContainer","classNames":[{"name":"qwerty","status":{"type":"EXPRESSION","value":"$context.stateManager.bannerState.state.currentPage === 1"}}],"css":{"class":"ckakcd","value":[{"state":"normal","media":[],"style":{"background-color":"white","width":"100%","overflow":"auto"}}]}}]},"thirdLibs":[{"package":"dayjs","name":"dayjs","version":"1.0.0"},{"package":"antd","name":"antd","version":"1.0.0"}],"assets":[{"globalName":"dayjs","package":"dayjs","resources":[{"src":"https://cdn.bootcdn.net/ajax/libs/dayjs/1.11.7/dayjs.min.js"}]},{"globalName":"antd","package":"antd","resources":[{"src":"https://cdn.bootcdn.net/ajax/libs/antd/5.4.4/antd.js"},{"src":"https://cdn.bootcdn.net/ajax/libs/antd/5.4.4/reset.css"}]}]};

let components;
Router.init();
const GlobalDataKey = "__GlobalDataKey";
const globalData = sessionStorage.getItem(GlobalDataKey);
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  /* @__PURE__ */ React.createElement(Render, { page: pageSchema, components, adapter: ReactAdapter })
);
