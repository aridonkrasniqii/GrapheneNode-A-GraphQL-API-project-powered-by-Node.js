import { IProduct } from '../interfaces/IProduct';

export class Product implements IProduct {
  private _name: string;
  private _description: string;
  private _price: number;
  private _image_url: string;
  private _category_id: number;

  constructor(
    name: string,
    description: string,
    price: number,
    image_url: string,
    category_id: number
  ) {
    this._name = name;
    this._description = description;
    this._price = price;
    this._image_url = image_url;
    this._category_id = category_id;
  }
  /**
   * Getter name
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Getter description
   * @return {string}
   */
  public get description(): string {
    return this._description;
  }

  /**
   * Getter price
   * @return {number}
   */
  public get price(): number {
    return this._price;
  }

  /**
   * Getter image_url
   * @return {string}
   */
  public get image_url(): string {
    return this._image_url;
  }

  /**
   * Getter category_id
   * @return {number}
   */
  public get category_id(): number {
    return this._category_id;
  }

  /**
   * Setter name
   * @param {string} value
   */
  public set name(value: string) {
    this._name = value;
  }

  /**
   * Setter description
   * @param {string} value
   */
  public set description(value: string) {
    this._description = value;
  }

  /**
   * Setter price
   * @param {number} value
   */
  public set price(value: number) {
    this._price = value;
  }

  /**
   * Setter image_url
   * @param {string} value
   */
  public set image_url(value: string) {
    this._image_url = value;
  }

  /**
   * Setter category_id
   * @param {number} value
   */
  public set category_id(value: number) {
    this._category_id = value;
  }
}
