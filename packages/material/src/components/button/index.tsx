/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-28 17:45:11
 * @Description: 按钮
 */
import { ButtonProps, Button as OriginalButton } from 'antd';
import { meta } from './meta';

export const Button = ({
	children,
	disabled,
	type = 'primary',
	size = 'middle',
	style,
	loading,
	htmlType = 'button',
	...rest
}: ButtonProps) => {
	return (
		<OriginalButton
			loading={loading}
			type={type}
			size={size}
			disabled={disabled}
			style={{ textShadow: 'none', boxShadow: 'none', ...style }}
			htmlType={htmlType}
			{...rest}
		>
			{children}
		</OriginalButton>
	);
};

export const ButtonMeta = meta;
