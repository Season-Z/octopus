/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-29 20:24:46
 * @Description:
 */
import { CNode, CRootNode } from '@octopus/model';

export const GhostView = ({ node }: { node: CNode | CRootNode }) => {
	return (
		<div
			style={{
				backgroundColor: 'rgba(100,100,100)',
				padding: '3px 10px 3px 15px',
				borderRadius: '2px',
				opacity: 0.9,
				color: 'rgba(220,220,220)',
			}}
		>
			{node.value.componentName}
		</div>
	);
};
