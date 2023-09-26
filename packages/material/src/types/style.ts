/*
 * @Author: zhouxishun
 * @Date: 2023-09-26 09:34:36
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-26 15:21:35
 * @Description:
 */
import { Property } from 'csstype';
import { theme } from '../core/theme';

type CompColor = string;

export interface CSSProperties {
  maxWidth: string | number;
  minWidth: string | number;
  width: string | number;
  height: string | number;
  maxHeight: string | number;
  minHeight: string | number;
  margin: string | number;
  marginTop: string | number;
  marginRight: string | number;
  marginLeft: string | number;
  marginBottom: string | number;
  padding: string | number;
  paddingTop: string | number;
  paddingLeft: string | number;
  paddingRight: string | number;
  paddingBottom: string | number;
  backgroundImage: string;
  backgroundColor: CompColor;
  borderStyle: 'solid' | 'dashed' | 'dotted';
  borderLeftStyle: 'solid' | 'dashed' | 'dotted';
  borderTopStyle: 'solid' | 'dashed' | 'dotted';
  borderRightStyle: 'solid' | 'dashed' | 'dotted';
  borderBottomStyle: 'solid' | 'dashed' | 'dotted';
  borderColor: CompColor;
  borderLeftColor: CompColor;
  borderTopColor: CompColor;
  borderRightColor: CompColor;
  borderBottomColor: CompColor;
  borderWidth: number;
  borderLeftWidth: number;
  borderTopWidth: number;
  borderRightWidth: number;
  borderBottomWidth: number;
  borderRadius: string | number;
  borderTopLeftRadius: string | number;
  borderTopRightRadius: string | number;
  borderBottomLeftRadius: string | number;
  borderBottomRightRadius: string | number;
  // visibility	 	string	 	是否显示
  visibility: 'hidden' | 'visible';

  color: string;
  fontSize: number | string;
  fontWeight: 'bold' | 'light' | 'normal';

  display: 'flex' | 'inline-flex' | 'none';
  textAlign: 'center';
  flexDirection: Property.FlexDirection;
  flexShrink: Property.FlexShrink;
  justifyContent: Property.JustifyContent;
  alignItems: Property.AlignItems;

  left: number | string;
  right: number | string;
  top: number | string;
  bottom: number | string;

  position: 'absolute' | 'relative';
}

type Theme = typeof theme;
type CSSFn<T> = (p: T) => RS<CSSProperties>;
type ThemePropertyFn<T> = (theme: Theme) => T | ProperRSProperty<T>;
type Breakpoints = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type ProperRSProperty<T> = Partial<Record<Breakpoints, T>>;
type RS<T> = {
  [P in keyof T]: T[P] | ProperRSProperty<T[P]> | ThemePropertyFn<T[P]>;
};
type WebCSSFn<T> = (p: T) => RS<React.CSSProperties>;
type SelectorStyle<T> = {
  '&>icon'?: RS<CSSProperties> | CSSFn<T>;
  '&:root'?: RS<CSSProperties> | CSSFn<T>;
  '&:web'?: RS<React.CSSProperties> | WebCSSFn<T>;
  '&:android'?: RS<CSSProperties> | CSSFn<T>;
  '&:h5'?: RS<CSSProperties> | CSSFn<T>;
  '&:focus'?: RS<CSSProperties> | CSSFn<T>;
  '&:active'?: RS<CSSProperties> | CSSFn<T>;
  '&:disabled'?: RS<CSSProperties> | CSSFn<T>;
};

export type CSS<T> = (RS<CSSProperties> & SelectorStyle<T>) | CSSFn<T>;
