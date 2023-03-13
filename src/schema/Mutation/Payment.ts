import { GraphQLFloat, GraphQLID, GraphQLString, parseValue } from 'graphql';
import { Payment } from '../../models/Payment';
import { BaseRepository } from '../../repository/BaseRepository';
import { PaymentService } from '../../service/PaymentService';

import { PaymentType } from '../TypeDefs/Payment';

const paymentRepository = new BaseRepository<Payment>('payments');
const paymentService = new PaymentService(paymentRepository);

export const CREATE_PAYMENT = {
	type: PaymentType,
	args: {
		order_id: { type: GraphQLID },
		amount: { type: GraphQLFloat },
		payment_date: { type: GraphQLString }
	},
	resolve(_: any, args: any) {
		const { order_id, amount, payment_date } = args;
		return paymentService.createPayment(order_id, amount, payment_date);
	}
};

export const UPDATE_PAYMENT = {
	type: PaymentType,
	args: {
		payment_id: { type: GraphQLID },
		order_id: { type: GraphQLID },
		amount: { type: GraphQLFloat },
		payment_date: { type: GraphQLString }
	},
	resolve(_: any, args: any) {
		const { payment_id, order_id, amount, payment_date } = args;
		return paymentService.updatePayment(
			payment_id,
			order_id,
			amount,
			payment_date
		);
	}
};

export const DELETE_PAYMENT = {
	type: PaymentType,
	args: {
		payment_id: { type: GraphQLID }
	},
	resolve(_: any, args: any) {
		const payment_id = args.payment_id;
		return paymentService.deletePayment(payment_id);
	}
};
