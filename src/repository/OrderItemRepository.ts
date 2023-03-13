import { DatabaseConnection } from '../database/database';

import { IOrderItem } from '../interfaces/IOrderItem';
import { BaseRepository } from './BaseRepository';

export class OrderItemRepository extends BaseRepository<IOrderItem> {
	constructor(public tableName: string) {
		super(tableName);
	}

	getOrderItemById = async (order_id: number, product_id: number) => {
		const { rows } = await this.connection.query(
			`
			SELECT * FROM order_items WHERE order_id = $1 AND product_id = $2;
		`,
			[order_id, product_id]
		);
		if (!rows.length) throw new Error('OrderItem not found');
		return rows[0] || null;
	};

	deleteOrderItem = async (
		order_id: number,
		product_id: number
	): Promise<IOrderItem> => {
		const { rows } = await this.connection.query(
			`DELETE FROM order_items WHERE order_id = $1 AND product_id = $2 RETURNING *;`,
			[order_id, product_id]
		);
		if (!rows.length) {
			throw new Error('OrderItem not found');
		}

		return rows[0] || null;
	};
}
