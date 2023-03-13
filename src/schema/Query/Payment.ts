import { GraphQLID, GraphQLList } from 'graphql';
import { IPayment } from '../../interfaces/Payment';
import { Payment } from '../../models/Payment';
import { BaseRepository } from '../../repository/BaseRepository';
import { PaymentService } from '../../service/PaymentService';
import { PaymentType } from '../TypeDefs/Payment';

const paymentRepository = new BaseRepository<Payment>('payments');

const paymentService = new PaymentService(paymentRepository);

export const GET_ALL_PAYMENTS = {
	type: new GraphQLList(PaymentType),
	resolve(): Promise<IPayment[]> {
		return paymentService.getAllPayments();
	}
};

export const GET_USER_BY_ID = {
	type: PaymentType,
	args: {
		payment_id: { type: GraphQLID }
	},
	resolve(_: any, args: any) {
		const payment_id = args.payment_id;
		return paymentService.getPaymentById(payment_id);
	}
};
