/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-27 11:38:32
 * @Description:
 */
import { SnippetsType } from '@zxscls/model';

export const snippets: SnippetsType[] = [
	{
		title: '文本',
		snapshotText: 'Text',
		category: '基础组件',
		schema: {
			props: {
				content: 'text',
			},
		},
	},
];
