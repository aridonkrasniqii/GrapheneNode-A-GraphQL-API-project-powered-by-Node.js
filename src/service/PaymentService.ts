import { IPayment } from '../interfaces/Payment';
import { Payment } from '../models/Payment';
import { BaseRepository } from '../repository/BaseRepository';

export class PaymentService {
	constructor(private paymentRepository: BaseRepository<Payment>) {}

	getAllPayments = async (): Promise<IPayment[]> => {
		return this.paymentRepository.getAllEntities();
	};
	getPaymentById = async (payment_id: number): Promise<IPayment> => {
		return this.paymentRepository.getEntityById(payment_id);
	};

	createPayment = async (
		order_id: number,
		amount: number,
		payment_date: Date
	): Promise<IPayment> => {
		const payment = new Payment(order_id, amount, payment_date);
		return this.paymentRepository.createEntity(payment);
	};

	updatePayment = async (
		payment_id: number,
		order_id: number,
		amount: number,
		payment_date: Date
	): Promise<IPayment> => {
		const payment = new Payment(order_id, amount, payment_date);
		return this.paymentRepository.updateEntity(payment_id, payment);
	};

	deletePayment = async (payment_id: number): Promise<IPayment> => {
		return this.paymentRepository.deleteEntity(payment_id);
	};
}
