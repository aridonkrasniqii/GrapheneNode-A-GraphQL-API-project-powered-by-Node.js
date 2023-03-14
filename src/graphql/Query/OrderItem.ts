import { OrderItemType } from '../TypeDefs/OrderItem';
import { GraphQLID, GraphQLList } from 'graphql';
import { OrderItemService } from '../../service/OrderItemService';
import { OrderItemRepository } from '../../repository/OrderItemRepository';
import { Payment } from '../../models/Payment';
import { BaseRepository } from '../../repository/BaseRepository';
import { PaymentService } from '../../service/PaymentService';
import { OrderItem } from 'sequelize';
import { IOrderItem } from '../../interfaces/IOrderItem';

const orderItemRepository = new OrderItemRepository('order_items');
const orderItemService = new OrderItemService(orderItemRepository);

export const GET_ALL_ORDER_ITEMS = {
	type: new GraphQLList(OrderItemType),
	resolve(): Promise<IOrderItem[]> {
		return orderItemService.getAllOrderItems();
	}
};

export const GET_ORDER_ITEM_BY_ID = {
	type: new GraphQLList(OrderItemType),
	args: {
		order_id: { type: GraphQLID },
		product_id: { type: GraphQLID }
	},
	resolve(_: any, args: any): Promise<IOrderItem> {
		const { order_id, product_id } = args;
		return orderItemService.getOrderById(order_id, product_id);
	}
};
