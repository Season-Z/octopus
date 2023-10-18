/*
 * @Author: zhouxishun
 * @Date: 2023-09-26 16:08:36
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-27 11:35:42
 * @Description:
 */
import { MaterialType } from '@zxscls/model';

const advanceCustom: MaterialType['advanceCustom'] = {
	wrapComponent: (Comp: any) => {
		return (props) => {
			//  原生的控制面板会阻断页面级别的事件监听，导致拖拽失效，这里在编辑态禁用 video 的控制面板相关事件触发
			return (
				<Comp
					{...props}
					style={{
						pointerEvents: 'none',
						...props.style,
					}}
				></Comp>
			);
		};
	},
};

export default advanceCustom;
