import { IOrderItem } from '../interfaces/IOrderItem';

export class OrderItem implements IOrderItem {
  private _order_id: number;
  private _product_id: number;
  private _quantity: number;

  constructor(order_id: number, product_id: number, quantity: number) {
    this._order_id = order_id;
    this._product_id = product_id;
    this._quantity = quantity;
  }

  /**
   * Getter order_id
   * @return {number}
   */
  public get order_id(): number {
    return this._order_id;
  }

  /**
   * Getter product_id
   * @return {number}
   */
  public get product_id(): number {
    return this._product_id;
  }

  /**
   * Getter quantity
   * @return {number}
   */
  public get quantity(): number {
    return this._quantity;
  }

  /**
   * Setter order_id
   * @param {number} value
   */
  public set order_id(value: number) {
    this._order_id = value;
  }

  /**
   * Setter product_id
   * @param {number} value
   */
  public set product_id(value: number) {
    this._product_id = value;
  }

  /**
   * Setter quantity
   * @param {number} value
   */
  public set quantity(value: number) {
    this._quantity = value;
  }
}
