const jsonConver2Query = (json: Record<string, any>) =>
  Object.keys(json)
    .map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    })
    .join('&');

const TopSessionDataKey = {
  // "redirectTo":"__redirectTo",//跳转标识
  params: '__params', //路由参数标识
};

const DataStorage = {
  add(key: string, data: any) {
    data && sessionStorage.setItem(key, JSON.stringify(data));
  },
  remove(key: string) {
    sessionStorage.removeItem(key);
  },
  get<T>(key: string): T | undefined {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : data;
  },
};

export const Router = {
  init() {
    const params = DataStorage.get<any | undefined>(TopSessionDataKey.params);
    if (params) {
      DataStorage.remove(TopSessionDataKey.params);
      window.history.replaceState(params, document.title);
    }
  },
  redirectTo<T>(pageKey: string, params?: T, num?: number, key?: string) {
    num = num || 1;
    DataStorage.add(TopSessionDataKey.params, params);

    if (num === 1) {
      window.location.replace(pageKey);
    } else {
      window.history.go(-Math.abs(num) + 1);
      window.location.replace(pageKey);
    }
  },
  navigateBack(num?: number) {
    history.go(-Math.abs(num || 1));
  },
  navigateTo<T>(pageKey: string, params?: T, key?: string) {
    DataStorage.add(TopSessionDataKey.params, params);
    window.location.assign(pageKey);
  },
  open<T>(pageKey: string, params?: T) {
    const queryParam = params ? jsonConver2Query(params) : '';
    const url = pageKey;
    const start = url.indexOf('?') > 0 ? '&' : '?';
    window.open(`${url}${start}${queryParam}`);
  },
};
