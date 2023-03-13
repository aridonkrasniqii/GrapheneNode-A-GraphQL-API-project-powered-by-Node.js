import { IOrderItem } from '../interfaces/IOrderItem';
import { OrderItem } from '../models/OrderItem';
import { BaseRepository } from '../repository/BaseRepository';
import { OrderItemRepository } from '../repository/OrderItemRepository';

export class OrderItemService {
	constructor(private orderItemRepository: OrderItemRepository) {}

	getAllOrderItems = async (): Promise<IOrderItem[]> => {
		return this.orderItemRepository.getAllEntities();
	};
	getOrderById = async (
		order_id: number,
		product_id: number
	): Promise<IOrderItem> => {
		return this.orderItemRepository.getOrderItemById(order_id, product_id);
	};

	createOrderItem = async (
		order_id: number,
		product_id: number,
		quantity: number
	): Promise<IOrderItem> => {
		const orderItem = new OrderItem(order_id, product_id, quantity);
		return this.orderItemRepository.createEntity(orderItem);
	};

	updateOrderItem = async (
		order_id: number,
		product_id: number,
		quantity: number
	): Promise<IOrderItem> => {
		const orderItem = new OrderItem(order_id, product_id, quantity);
		// TODO: PRIMARY KEY IS ORDER_ID AND PRODUCT_ID YOU CAN CHANGE ONLY QUANTITY
		return this.orderItemRepository.updateEntity(order_id, orderItem);
	};

	deleteOrderItem = async (
		order_id: number,
		product_id: number
	): Promise<IOrderItem> => {
		return this.orderItemRepository.deleteOrderItem(order_id, product_id);
	};
}
