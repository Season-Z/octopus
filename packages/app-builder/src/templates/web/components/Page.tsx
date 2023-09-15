// @ts-nocheck
import { loader } from '@sm/max-loader';
import { Max, Shema, FnCfg } from './type';
import React, { ElementType, useEffect, useState } from '@sm/react';
import { Loading } from './Loading';

export type PageProps = {
  max: Max;
  data: Shema;
  params?: unknown;
  getFn: (cfg: FnCfg) => Function;
  getComp: (type: string, version: string, source: Source) => ElementType;
  onComponentError?: (
    id: string,
    name: string,
    error: Error,
    version: string,
  ) => React.ReactElement;
};

function EmptyFn() {}

export function Page(props: PageProps) {
  const { max, data, params, getFn, getComp } = props;
  const [child, setChild] = useState<JSX.Element | null>(null);

  useEffect(() => {
    loader(data, {
      params,
      compMap(type, version, source) {
        const elementType = getComp(type, version, source);
        //TODO:此处需要考虑未找到的问题
        return elementType;
      },
      getFn(cfg: FnCfg, ctx: unknown) {
        const fn = getFn(cfg);
        return fn == null
          ? EmptyFn
          : (...args: any[]) => {
              return fn.apply({ ...(ctx || {}) }, [max, ...args]);
            };
      },
      bindComp: max.component.bindComp,
      fetchData(key, dataAreas, fn) {
        return max.addDataChangeListener(key, fn, dataAreas);
      },
      clearDataListener(key) {
        max.clearDataChangeListener(key);
      },
      error: props.onComponentError,
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
