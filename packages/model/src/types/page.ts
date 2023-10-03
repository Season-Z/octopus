/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-29 21:34:56
 * @Description:
 */
import { any, array, assign, literal, object, optional, string, union } from 'superstruct';
import { LibMetaType, ThirdLibTypeDescribe, LibMetaTypeDescribe, AssetPackage, CSSType } from './base';
import { FunctionPropType } from './node';
import { CRootNodeDataType, CRootNodeDataTypeDescribe, FunctionPropertyTypeDescribe } from './rootNode';

export type ComponentMetaType = {
	componentName: string;
} & LibMetaType;

export enum RenderType {
	PAGE = 'PAGE',
	COMPONENT = 'COMPONENT',
}

export type LifecycleItem = {
	nodeId: string;
	run: (params: { ctx: any }) => void;
};

/** 工程信息 */
export type CProjectType = {
	/** @param 应用类型 */
	type: 'web' | 'h5' | 'wechat';
	/** @param 项目名称 */
	name: string;
	/** @param 版本信息 */
	version: string;
	/** @params 资源列表 */
	assets: {
		bundlePath: string;
		sourceKey: string;
		deps: { bundlePath: string; sourceKey: string }[];
	}[];
	/** @param 项目编码 */
	projectCode: string;
	/** @param 应用id */
	appId: string;
	/** @param 首页路由 */
	launcherRouter: string;
};

/** 页面schema信息 */
export type CPageDataType = {
	version: string;
	name: string;
	/** @param 页面code */
	code: string;
	// TODO
	css?: CSSType[];
	// TODO
	renderType?: RenderType;
	// TODO
	/** 当 renderType 为 COMPONENT 时有效 */
	loadType?: 'async' | 'sync' | '';
	// TODO
	lifecycle?: {
		beforeMount?: LifecycleItem[];
		didMount?: LifecycleItem[];
		beforeUnmount?: LifecycleItem[];
	};
	// TODO
	/** 页面级 别 或者组件级别的外部传入的 props, 用于数据交互，比如通过平台导出源码，直接集成到 pro code 项目中使用 */
	props?: Record<string, any>;
	methods?: FunctionPropType[];
	componentsMeta: ComponentMetaType[];
	thirdLibs?: LibMetaType[];
	componentsTree: CRootNodeDataType;
	// runtime render need
	assets?: AssetPackage[];
};

export const CPageDataTypeDescribe = object({
	version: string(),
	name: string(),
	css: optional(string()),
	renderType: optional(union([literal(RenderType.COMPONENT), literal(RenderType.PAGE)])),
	loadType: optional(any()),
	lifecycle: optional(any()),
	props: optional(any()),
	methods: optional(array(FunctionPropertyTypeDescribe)),
	componentsMeta: array(
		assign(
			object({
				componentName: string(),
			}),
			LibMetaTypeDescribe,
		),
	),
	thirdLibs: optional(ThirdLibTypeDescribe),
	componentsTree: CRootNodeDataTypeDescribe,
	assets: optional(array(any())),
});
