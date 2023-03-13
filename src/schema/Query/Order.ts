import { OrderService } from './../../service/OrderService';
import { GraphQLID, GraphQLList } from 'graphql';
import { Order } from '../../models/Order';
import { IOrder } from '../../interfaces/IOrder';
import { BaseRepository } from '../../repository/BaseRepository';
import { OrderType } from '../TypeDefs/Order';

const orderRepository = new BaseRepository<Order>('orders');
const orderService = new OrderService(orderRepository);

export const GET_ALL_USERS = {
	type: new GraphQLList(OrderType),
	resolve(): Promise<IOrder[]> {
		return orderService.getAllOrders();
	}
};

export const GET_USER_BY_ID = {
	type: OrderType,
	args: {
		user_id: { type: GraphQLID }
	},
	resolve(_: any, args: any) {
		const order_id = args.user_id;
		return orderService.getOrderById(order_id);
	}
};
