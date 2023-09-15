import {
  ComponentData,
  UseFunction,
  CompositeComponentData,
  ComponentMeta,
  Source,
  Property,
} from '@sm/max-schema-protocol';

type LanguageType = 'zh-CN' | 'en-US';
// 语言包协议
export type ProjectI18nProtocol = Record<LanguageType, Record<string, string>>;

// 产物资源清单描述
interface ManifestPageItem {
  // 页面标识，后端用于做增量构建的diff计算时的标识
  pageCode: string;
  // 页面路由
  router: string;
  // 页面名称
  name: string;
  // 页面bundle资源地址
  source: string | string[];
  // 页面类型
  subType: 'PAG' | 'CCO';
}

interface ManifestDependencyItem {
  name: string;
  groupId: string;
  artifactId: string;
  version: string;
}

export interface WebManifestProtocol {
  launcherRouter: string;
  pages: ManifestPageItem[];
}
export interface AndroidManifestProtocol {
  manifestVersion: number;
  launcherRouter: string;
  baseWidth: string;
  subBaseWidth: string;
  pages: ManifestPageItem[];
  dependencies: ManifestDependencyItem[];
}

export interface ComponentManifestProtocol {
  components: {
    componentCode: string;
    bundlePath: string;
    metaPath: string;
  }[];
}

interface AssetItem {
  bundlePath: string;
  sourceKey: string;
  deps: { bundlePath: string; sourceKey: string }[];
}
/*********************** 版本分界线 V3 ************************/
export interface CloudApiV3 {
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  params: {
    host: string;
    path: string;
    timeout: number;
    urlDynamic: boolean;
  };
  protocol: 'HTTPS' | 'HTTP';
  // header  参数
  reqHeaders?: Record<string, string>;
  // 服务名
  serviceName: string;
}

export interface IoTApiV3 {
  extInfo: {
    serviceType: string;
    // iot 类型
    type: 'command' | 'property' | 'commands';
  };
  // 服务名
  serviceName: string;
}

export interface LogicV3 {
  name: string;
  source: string;
  autoRun?: boolean;
}

export interface VariableV3 {
  name: string;
  value: string;
}

// 工程数据协议
export interface ProjectProtocolV3 {
  // 协议版本号
  version: string;
  // 工程code：PRJxxxxxxxx
  projectCode: string;
  // 租户Code：TNTxxxx
  tenantCode?: string;
  // appID【仅app】
  appId?: string;
  // 工程类型
  type: 'application' | 'component' | 'model';
  // 工程子类型
  subType: 'web' | 'app' | 'h5' | 'model';
  // 系统配置
  systemConfig?: {
    launcherRouter: string;
    resolution: string;
    subResolution?: string;
  };
  // 全局逻辑
  logicList?: LogicV3[];
  // 全局变量[暂时没有用到]
  variableList?: VariableV3[];
  // 环境变量
  envVariableList?: Record<'dev' | 'test' | 'prod', VariableV3[]>;
  // 工程引用API清单
  api?: {
    // 云服务(Cloud)：工程内已导入的服务集合
    cloud?: CloudApiV3[];
    // 硬件服务(IoT)：工程内支持的IoT服务集合
    iot?: IoTApiV3[];
  };
  // 组件资源地址
  assets?: AssetItem[];
  // 工程内复合组件
  compositeComponents: CompositeComponentProtocolV3[];
}

// 页面数据协议
export interface PageProtocolV3 {
  // 协议版本号
  version: string;
  // 页面code：PAGxxxxxxxx
  pageCode: string;
  // 页面路由
  route: string;
  // 页面props
  props: {
    style?: any;
  };
  // 页面生命周期
  lifeCycles?: { [key: string]: UseFunction };
  // 页面逻辑
  logicList: LogicV3[];
  // 页面变量
  variableList: VariableV3[];
  // 页面组件树
  body: {
    // 组件树
    components: ComponentData[];
    // 页面模板，暂未使用，历史设计
    template: {};
  };
  // 是否登录校验
  isCheckLogin?: boolean;
}

// 组件工程的组件数据协议
export interface CompositeComponentProtocolV3 {
  // 协议版本号
  version: string;
  // 组件code：COOxxxxxxxx
  componentCode: string;
  // 组件名
  name: string;
  // 组件别名
  displayName: string;
  // 组件描述
  description: string;
  // 组件类型
  subType: string;
  // 组件icon
  iconUrl: string;
  // 组件分类
  category: string;
  // 发布版本
  publishVersion: string;
  // 发布描述
  publishDescription: string;
  // 依赖列表
  deps: DepsItem[];
  // 组件树
  components: ComponentData[];
  // 变量
  propertyList: Property[];
  // 逻辑
  logicList: LogicV3[];
  // 属性
  props: any;
  // 页面生命周期
  lifeCycles?: { [key: string]: UseFunction };
  // 协议额外属性
  protocolExtraFields: {
    source: Source;
    sourceUrl: string;
    meta: any;
  };
  // 组件引用API清单
  api?: {
    // 云服务(Cloud)：工程内已导入的服务集合
    cloud?: CloudApiV3[];
    // 硬件服务(IoT)：工程内支持的IoT服务集合
    iot?: IoTApiV3[];
  };
}

export interface DepsItem {
  packageName: string;
  componentName: string;
  version: string;
}

export interface CompositeComponentData extends ComponentData {
  logicList: LogicV3[];
  propertyList: Property[];
  lifeCycles?: { [key: string]: UseFunction };
}

export interface ModelProtocolV3 {
  tenantCode: string;
  storeCode: string;
  models: Model[];
  functions: ModalFunction[];
}

export interface Model {
  modelName: string;
  modelCode: string;
  fields: { name: string; type: string }[];
  methods: unknown[];
}

interface ModalFunction {
  name: string;
  source: string;
}

/*********************** 版本分界线 V2 ************************/
interface LogicV2 {
  id: string;
  source: string;
  name: string;
  autoRun?: boolean;
}
interface PageLogicV2 {
  logicCode: string;
  source: string;
  name: string;
  autoRun?: boolean;
}

interface IoTApiV2 {
  serviceId: string;
  serviceName: string;
  extInfo: any;
}
interface CloudApiV2 {
  serviceId: string;
  serviceName: string;
  method: 'POST' | 'GET' | 'PUT' | 'DELETE';
  params: Record<
    string,
    {
      host: string;
      path: string;
      timeout: number;
      urlDynamic: boolean;
    }
  >;
  protocol: 'HTTPS' | 'HTTP';
  reqHeaders?: Record<string, string>;
  desc: string;
  cookFn: string;
  extInfo: any;
}
export interface ProjectProtocolV2 {
  // 工程code：PRJxxxxxxxx
  id: string;
  // 租户Code：TNTxxxx
  tenantCode?: string;
  // appID【仅app】
  appId?: string;
  // 工程类型
  type: 'application' | 'component';
  // 工程子类型
  subType: ('web' | 'app' | 'h5' | 'template')[];
  // 页面宽度【仅app】
  baseWidth: number;
  // 系统配置
  systemConfig: {
    launcherRouter: string;
    resolution?: string;
    subResolution?: string;
  };
  // 全局逻辑
  logics: LogicV2[];
  // 全局变量
  globalVariable?: Record<string, string>;
  // 国际化
  i18nData: any[];
  // 环境变量
  environmentVariable: Record<'dev' | 'test' | 'prod', Record<string, string>>;
  // 云服务(Cloud)：工程内已导入的服务集合
  apiList?: CloudApiV2[];
  // 硬件服务(IoT)：工程内支持的IoT服务集合
  service?: IoTApiV2[];
  // 组件资源地址
  assets: AssetItem[];
}

export interface PageProtocolV2 {
  // 页面code：PAGxxxxxxxx
  pageCode: string;
  // 页面路由
  route: string;
  // 页面props
  props: {
    style?: any;
    // 页面生命周期
    lifeCycles?: { [key: string]: UseFunction };
  };
  // 页面生命周期
  lifeCycles?: { [key: string]: UseFunction };
  // 页面逻辑
  logics: PageLogicV2[];
  // 页面变量
  localVariable: Record<string, string>;
  // 页面组件树
  body: {
    // 组件树
    components: ComponentData[];
    // 页面模板，暂未使用，历史设计
    template: {};
  };
  // 工程内复合组件
  compositeComponents: CompositeComponentData[];
  compositeComponentMeta: ComponentMeta[];
  // 是否登录校验
  isCheckLogin?: boolean;
}
