import { GraphQLID, GraphQLInt } from 'graphql';
import { OrderItemRepository } from '../../repository/OrderItemRepository';
import { OrderItemService } from '../../service/OrderItemService';
import { OrderItemType } from '../TypeDefs/OrderItem';

const orderItemRepository = new OrderItemRepository('order_items');
const orderItemService = new OrderItemService(orderItemRepository);

export const CREATE_ORDER_ITME = {
	type: OrderItemType,
	args: {
		order_id: { type: GraphQLID },
		product_id: { type: GraphQLID },
		quantity: { type: GraphQLInt }
	},
	resolve(_: any, args: any) {
		const { order_id, product_id, quantity } = args;
		return orderItemService.createOrderItem(order_id, product_id, quantity);
	}
};

export const UPDATE_ORDER_ITEM = {
	type: OrderItemType,
	args: {
		order_id: { type: GraphQLID },
		product_id: { type: GraphQLID },
		quantity: { type: GraphQLInt }
	},
	resolve(_: any, args: any) {
		const { order_id, product_id, quantity } = args;
		return orderItemService.updateOrderItem(order_id, product_id, quantity);
	}
};

export const DELETE_ORDER_ITEM = {
	type: OrderItemType,
	args: {
		order_id: { type: GraphQLID },
		product_id: { type: GraphQLID }
	},
	resolve(_: any, args: any) {
		const { order_id, product_id } = args;
		return orderItemService.deleteOrderItem(order_id, product_id);
	}
};
