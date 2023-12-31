/*
 * @Author: zhouxishun
 * @Date: 2023-09-11 14:34:50
 * @LastEditors: zhouxishun
 * @LastEditTime: 2023-09-29 20:21:13
 * @Description:
 */
import { useMemo } from 'react';
import { SnippetsType } from '@zxscls/model';
import { Collapse } from 'antd';
import { DragComponentItem } from '../DragItem';
import styles from './style.module.scss';

export type ListViewProps = {
	dataSource: {
		name: string;
		list: SnippetsType[];
	}[];
};
export const ListView = (props: ListViewProps) => {
	const { dataSource } = props;
	const defaultActiveKey = dataSource.map((el) => el.name || '');
	if (!dataSource.length) {
		return null;
	}

	const items = useMemo(() => {
		return dataSource.map((el) => {
			const category = el.name || '';
			const contentView = (
				<div className={styles.collapsePanel}>
					{el.list.map((it) => {
						return (
							<DragComponentItem
								id={it.id!}
								key={it.id!}
								name={it.title}
								icon={it.snapshot || it.snapshotText}
								iconText={it.snapshotText}
								description={it.description || ''}
							/>
						);
					})}
				</div>
			);

			return {
				key: category,
				label: category,
				children: contentView,
			};
		});
	}, []);

	return (
		<div className={styles.ListBox}>
			<Collapse style={{ width: '100%' }} defaultActiveKey={defaultActiveKey} items={items}></Collapse>
		</div>
	);
};
