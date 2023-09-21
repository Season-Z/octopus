import {
  AdvanceCustom,
  CMaterialEventType,
  CMaterialPropsType,
  ContainerConfig,
  LibMetaType,
  SnippetsType,
} from '@octopus/model';

/** @param 物料定义 */
export type MaterialType<PropsSetter extends string = ''> = {
  componentName: string;
  title: string;
  screenshot?: string;
  icon?: string;
  /** 组件标签用于搜索 */
  tags?: string[];
  /** 分 tab 面板 */
  groupName?: string;
  /** 分类 */
  category?: string;
  /** 排序 */
  priority?: number;
  npm?: LibMetaType;
  snippets: SnippetsType[];
  props: CMaterialPropsType<PropsSetter>;
  /** 固定的props, 不被 setter 的值覆盖, 只在编辑模式下会生效 */
  fixedProps?:
    | Record<string, any>
    | ((props: Record<string, any>) => Record<string, any>);
  /** 可以拖入组件 */
  isContainer?: boolean | ContainerConfig;
  /** 选择框的根选择器 */
  rootSelector?: string;
  /** 是否禁止编辑器的 drag 事件，被命中的 dom 不会出发 编辑器的 */
  disableEditorDragDom?:
    | {
        class?: string[];
        id?: string[];
      }
    | boolean;
  /** TODO: 组件支持的可被调用的方法， todo： 没有补充验证 类型 describe */
  actions?: {
    title: string;
    // 方法名
    name: string;
    params?: {
      name: string;
      description: string;
    }[];
    template?: string;
  }[];
  /** TODO: 组件可能触发的事件 */
  events?: CMaterialEventType[];
  /** 定制组件高级编辑行为 */
  advanceCustom?: AdvanceCustom;
  /** 自定义扩展配置 */
  extra?: Record<any, any>;
};
