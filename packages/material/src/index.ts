import { ButtonMeta, Button } from '@/components/button';
import Block, { BlockMeta } from '@/components/block';
import Container, { ContainerMeta } from '@/components/container';
import Video, { VideoMeta } from '@/components/video';
import Text, { TextMeta } from '@/components/text';
import { BaseComponentType } from '@/types/component';

/** 物料组件 */
export const materialComponents = {
	RootContainer: ({ children }: BaseComponentType<HTMLDivElement>) => children,
	Button,
	Container,
	Video,
	Text,
	Block,
};

/** 组件meta信息 */
export const materialComponentsMeta = {
	ButtonMeta,
	ContainerMeta,
	VideoMeta,
	TextMeta,
	BlockMeta,
};

/** 组件名称 */
export enum MaterialComponentsNameEnum {
	RootContainer = 'RootContainer',
	Button = 'Button',
	Container = 'Container',
	Video = 'Video',
	Text = 'Text',
	Block = 'Block',
}
