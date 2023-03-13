export interface IPayment {
  payment_id?: number;
  order_id: number;
  amount: number;
  payment_date: Date;
}
