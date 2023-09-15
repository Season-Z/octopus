// @ts-ignore
import React from '@sm/react';
// @ts-ignore
import { ComponentsManager } from '@sm/max-components-loader';
// @ts-ignore
import { setGlobalExtendConfig } from '@sm/max-renderers/lib/common/util';
// @ts-ignore
import { App } from '@builder/templates/android/components/App';
// @ts-ignore
import { render } from '@sm/max-react';

// 页面schema数据
let pageSchema;
// 替换占位：全局逻辑
let globalLogic;
// 替换占位：页面逻辑
let pageLogic;
// 替换占位：页面复合组件
// @ts-ignore
let compositeComponents;
// 替换占位：云服务
let cloudApi;
// 替换占位：iot服务
let iotApi;
// 替换占位：应用信息
let appInfo;

const cloudApiMap = {};
const iotApiMap = {};
cloudApi.map((item) => {
  cloudApiMap[item.serviceName] = item;
});
iotApi.map((item) => {
  iotApiMap[item.serviceName] = item;
});

render(
  <App
    mainPage={pageSchema}
    getComp={(type, version, source) => {
      //获取组件
      if (source.type === '3rdPartyComponent') {
        return source.componentName;
      } else {
        return ComponentsManager.mapSourceToComponent(source);
      }
    }}
    getFn={(cfg) => {
      return cfg.quoteScope == 'local'
        ? pageLogic[cfg.name]
        : globalLogic[cfg.name];
    }}
    onComponentError={(id, name, error, version) => {
      //组件异常
    }}
    onInitedDSL={async (max, pageMax) => {
      // @ts-ignore
      TinyAPI.registerGlobal({ max });

      try {
        // 0. 复合组件加载器配置
        // TOFIX: 早晚要移除，后期交给新运行时cover
        setGlobalExtendConfig({
          mapSourceToComponent: (source) => {
            if (source.type === '3rdPartyComponent') {
              return source.componentName;
            }
            return ComponentsManager.mapSourceToComponent(source);
          },
        });
      } catch (e) {
        console.log('----- setGlobalExtendConfig fail ----', e);
      }

      // 1. 注册全局网络请求拦截器
      const requestInterceptor = (config: any) => {
        console.log('----- requestInterceptor called -------');
        return {
          ...config,
          data: { ...config.data, token: max.getToken() },
        };
      };
      const responseInterceptor = (res) => {
        console.log('----- responseInterceptor called -------');
        // TODO 异常处理
        return res;
      };
      const ruleFn = (config: any) => {
        console.log('----- ruleFn called -------');
        return true;
      };
      max.net.init(
        {},
        {
          before: [{ rule: ruleFn, use: requestInterceptor }],
          after: [{ rule: ruleFn, use: responseInterceptor }],
        },
      );

      const autoRunLogicList = {
        global: [] as string[],
        page: [] as string[],
      };

      // 2. 注册全局逻辑
      Object.keys(globalLogic).map((key) => {
        if (globalLogic[key].autoRun) {
          autoRunLogicList.global.push(`globalFn.${key}`);
        }
        max.register('fn', `globalFn.${key}`, (...args) => {
          return globalLogic[key](max, ...args);
        });
      });

      // 3. 注册页面逻辑
      Object.keys(pageLogic).map((key) => {
        if (pageLogic[key].autoRun) {
          autoRunLogicList.page.push(`localFn.${key}`);
        }
        pageMax.register('fn', `localFn.${key}`, (...args) => {
          return pageLogic[key](pageMax, ...args);
        });
      });

      // 4. 注册应用信息
      max.data?.set('appInfo', appInfo);

      // 5. 注册页面变量
      pageSchema.propertyList.map((prop) => {
        try {
          const value = JSON.parse(prop.propertyValue);
          pageMax.data?.set(prop.propertyName, value);
        } catch (e) {
          console.error(e);
        }
      });

      try {
        // 6. 运行“自执行逻辑”
        await Promise.all(
          autoRunLogicList.global.map((fnName) => {
            return max[fnName].call(null, max);
          }),
        );
        await Promise.all(
          autoRunLogicList.page.map((fnName) => {
            return pageMax[fnName].call(null, pageMax);
          }),
        );
      } catch (e) {
        console.log('[ERROR]: auto run logic fail !!!!!!!!!!!!!!', e);
      }

      // 7. 执行页面登录校验
      if (pageSchema.isCheckLogin && !max.getToken()) {
        if (max.has(max.loginLogic)) {
          max.loginLogic.call(null, max);
        } else {
          throw Error(
            'The loginLogic method is not registered, the config would not take effect!',
          );
        }
      }
    }}
    initDSL={{
      linkConfig: iotApiMap,
      serviceCall: cloudApiMap,
      serviceCallEnv: 'Prod',
    }}
  />,
);
