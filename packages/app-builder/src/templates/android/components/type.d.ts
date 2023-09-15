// @ts-ignore
import { rootMax } from '@sm/max-dsl';

export type Max = typeof rootMax;

export type Shema = any;

export type FnCfg = { quoteScope: 'local' | 'global'; name: string };

export { rootMax };

type StackParams<T = any> = {
  pageId: string;
  pageKey: string;
  params?: T;
};

export type RouterConfig = {
  initRouter?: StackParams[];
  onChange?: (stacks: StackParams[]) => void;
  open?: (pageKey: string, params?: unknown) => void;
};
