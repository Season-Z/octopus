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
  onInitedDSL?: (max: Max, pageMax: Max) => Promise<any>;
  initDSL: {
    linkConfig: { [key: string]: unknown };
    serviceCall: { [key: string]: unknown };
    serviceCallEnv: string;
    router?: RouterConfig;
  };
  onComponentError?: (
    id: string,
    name: string,
    error: Error,
    version: string,
  ) => React.ReactElement;
};

function Base(props: AppProps) {
  const [child, setChild] = useState<JSX.Element | null>(null);
  const [dlgList, setDlgList] = useState<React.ReactNode[]>([]);

  useEffect(async () => {
    initDSL({
      serviceCall: (name: string) => {
        return {
          params: props.initDSL.serviceCall[name],
          tempEnv: props.initDSL.serviceCallEnv,
        };
      },
      linkConfig: (name: string) => {
        return props.initDSL.linkConfig[name];
      },
      ui: {
        dialog: (dlgList: React.ReactNode[]) => {
          setDlgList(dlgList);
        },
      },
      router: {},
    });
    const { params, getFn, getComp, onInitedDSL } = props;

    const pageMax = createMax({ parent: rootMax });
    await onInitedDSL?.(rootMax, pageMax);

    setChild(
      <Page
        params={params}
        getFn={getFn}
        getComp={getComp}
        max={pageMax}
        data={props.mainPage}
      />,
    );
  }, []);

  if (child == null) {
    return <Loading />;
  } else {
    return (
      <>
        {child}
        {dlgList}
      </>
    );
  }
}

export function App(props: AppProps) {
  const [show, setShow] = useState(true);
  // 页面销毁
  (TinyAPI as any).base.registerLifecycle('onDestroy', () => {
    setShow(false);
  });

  return show ? <Base {...props} /> : <></>;
}
