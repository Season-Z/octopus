// @ts-nocheck
import React, { useState, useEffect } from '@sm/react';
import { rootMax, initDSL, createMax } from '@sm/max-dsl';
import { Max, RouterConfig } from './type';
import { Page, PageProps } from './Page';
import { Loading } from './Loading';

type AppProps = {
  mainPage: PageProps['data'];
  params?: unknown;
  getFn: PageProps['getFn'];
  getComp: PageProps['getComp'];
  onInitedDSL?: (max: Max, pageMax: Max) => void;
  initDSL: {
    linkConfig: { [key: string]: unknown };
    serviceCall: { [key: string]: unknown };
    serviceCallEnv: string;
    router: RouterConfig;
  };
  onComponentError?: (
    id: string,
    name: string,
    error: Error,
    version: string,
  ) => React.ReactElement;
};

export function App(props: AppProps) {
  const [child, setChild] = useState<JSX.Element | null>(null);


}
