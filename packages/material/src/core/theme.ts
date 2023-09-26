/*
 * @Author: zhouxishun
 * @Date: 2023-09-26 15:14:32
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-26 15:14:43
 * @Description:
 */
export const textTheme = {
  baseFonSize: { lg: 24, xs: 14 },
  largeFonSize: { lg: 26, xs: 16 },
  smallFonSize: { lg: 22, xs: 12 },
  helperTextFontSize: { lg: 16, xs: 12 },

  web: {
    baseFonSize: { lg: 14, xs: 14 },
    largeFonSize: { lg: 14, xs: 14 },
    smallFonSize: { lg: 12, xs: 12 },
    helperTextFontSize: { lg: 12, xs: 12 },
  },
  android: {
    baseFonSize: { lg: 24, xs: 14 },
    largeFonSize: { lg: 26, xs: 16 },
    smallFonSize: { lg: 22, xs: 12 },
    helperTextFontSize: { lg: 24, xs: 12 },
  },
};

export const theme = {
  primaryColor: '#ff6000',
  baseBorderRadius: 0,
  borderColor: '',
  errorColor: '',
  disabledColor: '',
  linkColor: '',
  successColor: '',
  warningColor: '',
  titleColor: '',
  textColor: '',
  secondaryTextColor: '',
  textTheme,

  /**
   * @deprecated
   */
  inputBackgroundColor: '#EDEDEE',
  /**
   * @deprecated
   */
  unSelectedColor: '#929499',
  /**
   * @deprecated
   */
  unSelectedLineColor: '#D1D2D4',
};
