/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-28 18:08:08
 * @Description:
 */
import { Pointer } from '@/core/dragAndDrop/common';
import { Sensor } from '@/core/dragAndDrop/sensor';
import { DragAndDropEventExtraData } from '@zxscls/model';

export type DragAndDropEventObj<T = Record<string, any>> = {
	from: MouseEvent;
	fromSensor: Sensor;
	fromPointer: Pointer;
	current?: MouseEvent;
	currentSensor?: Sensor;
	pointer: Pointer;
	extraData: T;
};

export type BaseDragAndDropEventType<T = Record<string, any>> = {
	dragStart: DragAndDropEventObj<T>;
	dragging: Required<DragAndDropEventObj<T>>;
	dragEnd: Required<DragAndDropEventObj<T>>;
	drop: Required<DragAndDropEventObj<T>>;
};

export type LayoutDragAndDropExtraDataType = DragAndDropEventExtraData;
