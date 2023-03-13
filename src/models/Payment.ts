import { IPayment } from '../interfaces/Payment';

export class Payment implements IPayment {
  private _order_id: number;
  private _amount: number;
  private _payment_date: Date;

  constructor(order_id: number, amount: number, payment_date: Date) {
    this._order_id = order_id;
    this._amount = amount;
    this._payment_date = payment_date;
  }

  /**
   * Getter order_id
   * @return {number}
   */
  public get order_id(): number {
    return this._order_id;
  }

  /**
   * Getter amount
   * @return {number}
   */
  public get amount(): number {
    return this._amount;
  }

  /**
   * Getter payment_date
   * @return {Date}
   */
  public get payment_date(): Date {
    return this._payment_date;
  }

  /**
   * Setter order_id
   * @param {number} value
   */
  public set order_id(value: number) {
    this._order_id = value;
  }

  /**
   * Setter amount
   * @param {number} value
   */
  public set amount(value: number) {
    this._amount = value;
  }

  /**
   * Setter payment_date
   * @param {Date} value
   */
  public set payment_date(value: Date) {
    this._payment_date = value;
  }
}
