/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-22 18:49:23
 * @Description:
 */
import { LayoutPropsType, collectVariable, flatObject } from '@zxscls/layout';
import { getThirdLibs } from '@zxscls/render';
import * as CRender from '@zxscls/render';

/** 默认使用 react 18 模式渲染 */
export const beforeInitRender: LayoutPropsType['beforeInitRender'] = async ({ iframe }) => {
	const subWin = iframe.getWindow();
	if (!subWin) {
		return;
	}
	(subWin as any).React = window.React;
	(subWin as any).ReactDOM = window.ReactDOM;
	(subWin as any).ReactDOMClient = (window as any).ReactDOMClient;
	(subWin as any).CRender = CRender;
};

/** 默认使用 react 18 模式渲染 */
export const getDefaultRender = (components: Record<string, any>) => {
	const defaultRender: LayoutPropsType['customRender'] = async ({
		iframe: iframeContainer,
		assets,
		page,
		pageModel,
		ready,
		renderJSUrl,
	}) => {
		await iframeContainer.injectJS(renderJSUrl || '');
		const iframeWindow = iframeContainer.getWindow()!;
		const iframeDoc = iframeContainer.getDocument()!;
		const IframeReact = iframeWindow.React!;
		const IframeReactDOM = iframeWindow.ReactDOMClient!;
		const CRender = iframeWindow.CRender!;

		// 从子窗口获取物料对象
		const pageInfo = page || pageModel?.export();
		if (!pageInfo) {
			console.log('page schema is empty');
			return;
		}
		const allAssets = [...assets, ...(pageInfo.assets || [])];
		// 注入组件物料资源
		const assetLoader = new CRender.AssetLoader(allAssets, {
			window: iframeContainer.getWindow()!,
		});
		assetLoader
			.onSuccess(() => {
				const allLibs = collectVariable(allAssets, iframeWindow);
				const componentsLibs = flatObject(allLibs);
				const thirdLibs = getThirdLibs(allLibs, pageInfo.thirdLibs || []);
				const App = IframeReact?.createElement(CRender.DesignRender, {
					adapter: CRender?.ReactAdapter,
					page: page,
					pageModel: pageModel,
					components: { ...componentsLibs, ...components },
					$$context: {
						thirdLibs,
					},
					onMount: (designRenderInstance) => {
						ready(designRenderInstance);
					},
				});
				IframeReactDOM.createRoot(iframeDoc.getElementById('app')!).render(App);
			})
			.onError(() => {
				console.log('资源加载出错');
			})
			.load();
	};

	return defaultRender;
};
