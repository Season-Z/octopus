/*
 * @Author: zhouxishun
 * @Date: 2023-09-25 11:25:08
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-28 17:45:16
 * @Description:
 */
import { MaterialType } from '@octopus/model';

const advanceCustom: MaterialType['advanceCustom'] = {
	// onCopy: async () => {
	//   console.log('onCopy');
	// },
	// selectRectViewRender: (props) => {
	//   // console.log(123, props);
	//   return <>selectRectViewRender</>;
	// },
	// hoverRectViewRender: () => {
	//   return <>Hover</>;
	// },
	// dropViewRender: (props) => {
	//   console.log('123213', props);
	//   return <>drop 11111</>;
	// },
	// ghostViewRender: () => {
	//   return <>Big Button</>;
	// },
	// toolbarViewRender: () => {
	//   return <>toolbar</>;
	// },
	// canDragNode: async (node, params) => {
	//   console.log('canDragNode', node, params);
	//   if (params.event?.extraData?.type === 'NEW_ADD') {
	//     return true;
	//   }
	//   return true;
	// },
	// onDragging: async () => {
	//   console.log('onDragging');
	// },
	// onDrop: async () => {
	//   console.log('onDrop');
	//   return true;
	// },
	// onSelect: async () => {
	//   console.log('onSelect');
	//   return true;
	// },
	// onDelete: async () => {
	//   console.log('onDelete');
	//   return true;
	// },
	// onNewAdd: async (node, params) => {
	//   params.viewPortal.setView(<div>123</div>);
	//   console.log('onNewAdd');
	//   return new Promise((resolve) => {
	//     setTimeout(() => {
	//       resolve(true);
	//       params.viewPortal.clearView();
	//     }, 1000);
	//   });
	// },
};

export default advanceCustom;
