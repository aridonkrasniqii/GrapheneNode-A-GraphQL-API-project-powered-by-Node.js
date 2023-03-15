import { AuthenticationError } from 'apollo-server-express';
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
		const user = await this.getUserByEmail(email);
		if (!user) {
			throw new Error('User not found');
		}

		const passwordMatches = await SecUtils.compare(password, user.password);

		if (!passwordMatches) {
			throw new Error('Invalid credentials');
		}
		return user;
	};

	changePassword = async (user_id: number, user: User): Promise<IUser> => {
		return this.updateEntity(user_id, user);
	};

	getUserByEmail = async (email: string): Promise<IUser> => {
		const { rows } = await this.connection.query(
			`SELECT * FROM users WHERE email = $1`,
			[email]
		);
		if (!rows.length) {
			throw new AuthenticationError('User not found');
		}
		return rows[0] || null;
	}; 
	
	

}
