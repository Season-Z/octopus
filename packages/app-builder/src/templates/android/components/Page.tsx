// @ts-ignore
import { loader } from '@sm/max-loader';
import { Max, Shema, FnCfg } from './type';
import React, { ElementType, useEffect, useState } from '@sm/react';
import { Loading } from './Loading';

export type PageProps = {
  max: Max;
  data: Shema;
  params?: unknown;
  getFn: (cfg: FnCfg) => Function;
  // @ts-ignore
  getComp: (type: string, version: string, source: Source) => ElementType;
};

const defaultFn = function () {};

export function Page(props: PageProps) {
  const { max, data, params, getFn, getComp } = props;
  const [child, setChild] = useState();

  useEffect(() => {
    loader(data, {
      // @ts-ignore
      params: params || TinyAPI.navigation.getParams()?.params,
      compMap(type, version, source) {
        const elementType = getComp(type, version, source);
        //TODO:此处需要考虑未找到的问题
        return elementType;
      },
      getFn(cfg: FnCfg, ctx: unknown) {
        const fn = getFn(cfg);
        if (!fn) {
          console.warn('当前函数不存在:' + JSON.stringify(cfg));
          return defaultFn;
        }
        return (...args: any[]) => {
          const params = [max, ...args];
          return fn.apply({ ...(ctx || {}) }, params);
        };
      },
      bindComp: max.component.bindComp,
      fetchData(key, dataAreas, fn) {
        return max.addDataChangeListener(key, fn, dataAreas);
      },
      clearDataListener(key) {
        max.clearDataChangeListener(key);
      },
    }).then(
      (child) => {
        setChild(child);
      },
      (error) => {
        //统一处理异常
        console.error(error);
      },
    );
  }, []);

  if (child == null) {
    return <Loading />;
  }
  return child;
}
