/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-28 17:02:54
 * @Description:
 */
import { CPlugin } from '../core/pluginManager';
import { ComponentLibPlugin } from './ComponentLibrary';
import { DesignerPlugin } from './Designer';
import { OutlineTreePlugin } from './OutlineTree';
import { RightPanelPlugin } from './RightPanel';
import { GlobalStatePanelPlugin } from './GlobalStatePanel';
import { DisplaySourceSchema } from './DisplaySourceSchema';
import { HistoryPlugin } from './History';

export const DEFAULT_PLUGIN_LIST: CPlugin[] = [
	DesignerPlugin,
	OutlineTreePlugin,
	ComponentLibPlugin,
	GlobalStatePanelPlugin,
	RightPanelPlugin,
	HistoryPlugin,
];

export {
	DesignerPlugin,
	ComponentLibPlugin,
	RightPanelPlugin,
	GlobalStatePanelPlugin,
	HistoryPlugin,
	DisplaySourceSchema,
};
