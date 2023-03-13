import { IUser } from '../interfaces/IUser';

export class User implements IUser {
  private _first_name: string;
  private _last_name: string;
  private _username: string;
  private _email: string;
  private _password: string;

  constructor(
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string
  ) {
    this._first_name = first_name;
    this._last_name = last_name;
    this._username = username;
    this._email = email;
    this._password = password;
  }

  /**
   * Getter first_name
   * @return {string}
   */
  public get first_name(): string {
    return this._first_name;
  }

  /**
   * Getter last_name
   * @return {string}
   */
  public get last_name(): string {
    return this._last_name;
  }

  /**
   * Getter username
   * @return {string}
   */
  public get username(): string {
    return this._username;
  }

  /**
   * Getter email
   * @return {string}
   */
  public get email(): string {
    return this._email;
  }

  /**
   * Getter password
   * @return {string}
   */
  public get password(): string {
    return this._password;
  }

  /**
   * Setter first_name
   * @param {string} value
   */
  public set first_name(value: string) {
    this._first_name = value;
  }

  /**
   * Setter last_name
   * @param {string} value
   */
  public set last_name(value: string) {
    this._last_name = value;
  }

  /**
   * Setter username
   * @param {string} value
   */
  public set username(value: string) {
    this._username = value;
  }

  /**
   * Setter email
   * @param {string} value
   */
  public set email(value: string) {
    this._email = value;
  }

  /**
   * Setter password
   * @param {string} value
   */
  public set password(value: string) {
    this._password = value;
  }
}
