import { DatabaseConnection } from '../database/database';
import { IUser } from '../interfaces/IUser';
import { User } from '../models/User';
import { SecUtils } from '../utils/SecUtils';
import { BaseRepository } from './BaseRepository';

export class UserRepository extends BaseRepository<IUser> {
	constructor(public tableName: string) {
		super(tableName);
	}
	findByCredentials = async (
		email: string,
		password: string
	): Promise<IUser> => {
		const { rows } = await this.connection.query(
			`SELECT * FROM users WHERE email}`,
			[email]
		);
		if (!rows.length) throw new Error('User not found');

		if (await SecUtils.compare(password, rows[0].password)) {
			return rows[0];
		}
		return null as any;
	};

	changePassword = async (user_id: number, user: User): Promise<IUser> => {
		return this.updateEntity(user_id, user);
	};
}

/*
export class UserRepository {
  private connection = DatabaseConnection.getConnection();

  async getAllUsers(): Promise<IUser[]> {
    const result = await this.connection.query<IUser>('SELECT * FROM users');
    return result.rows || null;
  }

  createUser = async (user: User): Promise<IUser> => {
    const result = await this.connection.query<IUser>(
      'INSERT INTO users(first_name, last_name, username, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [
        user.first_name,
        user.last_name,
        user.username,
        user.email,
        user.password
      ]
    );
    return result.rows[0] || null;
  };

  getUserById = async (user_id: number): Promise<IUser> => {
    const user = await this.connection.query<IUser>(
      'SELECT * FROM users where user_id = $1',
      [user_id]
    );
    return user.rows[0] || null;
  };

  updateUser = async (user_id: number, user: User): Promise<IUser> => {
    const userExist = this.getUserById(user_id);
    if (!userExist) throw new Error('User does not exist');
    const updatedUser = await this.connection.query<IUser>(
      `
        UPDATE users SET first_name = $1, last_name = $2, 
                               username = $3, email =  $4 ,
                               password = $5 where user_id = $6 RETURNING *;
    `,
      [
        user.first_name,
        user.last_name,
        user.username,
        user.email,
        user.password,
        user_id
      ]
    );
    return updatedUser.rows[0] || null;
  };

  deleteUser = async (user_id: number) => {
    const userExist = this.getUserById(user_id);
    if (!userExist) throw new Error('User does not exist');
    const deletedUser = await this.connection.query<IUser>(
      ` 
      DELETE FROM users WHERE user_id = $1 RETURNING *;
    `,
      [user_id]
    );
    return deletedUser.rows[0] || null;
  };

  findByCredentials = async (
    email: string,
    password: string
  ): Promise<IUser> => {
    const user = await this.connection.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    const result = user.rows[0];
    if (!result) {
      throw new Error('User not found');
    }
    const validPassword = await Utils.comparePassword(
      password,
      result.password
    );
    return validPassword ? result : (null as any);
  };

  changePassword = async (user_id: number, user: User): Promise<IUser> => {
    return this.updateUser(user_id, user);
  };
}

*/
