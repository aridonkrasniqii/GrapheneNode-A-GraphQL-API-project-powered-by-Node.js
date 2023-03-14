import { GraphQLID, GraphQLString } from 'graphql';
import { Order } from '../../models/Order';
import { BaseRepository } from '../../repository/BaseRepository';
import { OrderService } from '../../service/OrderService';
import { OrderType } from '../TypeDefs/Order';

const orderRepository = new BaseRepository<Order>('orders');
const orderService = new OrderService(orderRepository);

export const CREATE_ORDER = {
	type: OrderType,
	args: {
		user_id: { type: GraphQLID },
		comments: { type: GraphQLString },
		order_date: { type: GraphQLString }
	},
	resolve(_: any, args: any) {
		const { user_id, comments, order_date } = args;
		return orderService.createOrder(user_id, comments, order_date);
	}
};

export const UPDATE_ORDER = {
	type: OrderType,
	args: {
		order_id: { type: GraphQLID },
		user_id: { type: GraphQLID },
		comments: { type: GraphQLString },
		order_date: { type: GraphQLString }
	},
	resolve(_: any, args: any) {
		const { order_id, user_id, comments, order_date } = args;
		return orderService.updateOrder(order_id, user_id, comments, order_date);
	}
};

export const DELETE_USER = {
	type: OrderType,
	args: {
		order_id: { type: GraphQLID }
	},
	resolve(_: any, args: any) {
		const order_id = args.order_id;
		return orderService.deleteOrder(order_id);
	}
};
