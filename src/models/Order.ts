import { IOrder } from '../interfaces/IOrder';

export class Order implements IOrder {
  private _user_id: number;
  private _comments: string;
  private _order_date: Date;

  constructor(user_id: number, comments: string, order_date: Date) {
    this._user_id = user_id;
    this._comments = comments;
    this._order_date = order_date;
  }

  /**
   * Getter user_id
   * @return {number}
   */
  public get user_id(): number {
    return this._user_id;
  }

  /**
   * Getter comments
   * @return {string}
   */
  public get comments(): string {
    return this._comments;
  }

  /**
   * Getter order_date
   * @return {Date}
   */
  public get order_date(): Date {
    return this._order_date;
  }

  /**
   * Setter user_id
   * @param {number} value
   */
  public set user_id(value: number) {
    this._user_id = value;
  }

  /**
   * Setter comments
   * @param {string} value
   */
  public set comments(value: string) {
    this._comments = value;
  }

  /**
   * Setter order_date
   * @param {Date} value
   */
  public set order_date(value: Date) {
    this._order_date = value;
  }
}
