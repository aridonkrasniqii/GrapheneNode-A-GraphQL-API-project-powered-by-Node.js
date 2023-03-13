import { IUser } from '../interfaces/IUser';
import { User } from '../models/User';
import { UserRepository } from '../repository/UserRepository';
import bcrypt from 'bcryptjs';
import { SecUtils } from '../utils/SecUtils';

export class UserService {
	constructor(private userRepository: UserRepository) {}
	getAllUsers = async (): Promise<IUser[]> => {
		return this.userRepository.getAllEntities();
	};

	createUser = async (
		first_name: string,
		last_name: string,
		username: string,
		email: string,
		password: string
	) => {
		const hashed = await SecUtils.generateHash(password);
		const user = new User(first_name, last_name, username, email, hashed);
		return this.userRepository.createEntity(user);
	};

	getUserById = async (user_id: number): Promise<IUser> => {
		return this.userRepository.getEntityById(user_id);
	};

	deleteUser = async (user_id: number): Promise<IUser> => {
		return this.userRepository.deleteEntity(user_id);
	};

	updateUser = async (
		user_id: number,
		first_name: string,
		last_name: string,
		username: string,
		email: string,
		password: string
	): Promise<IUser> => {
		const hashed = await SecUtils.generateHash(password);
		const user = new User(first_name, last_name, username, email, hashed);
		return this.userRepository.updateEntity(user_id, user);
	};

	changePassword = async (
		email: string,
		oldPassword: string,
		newPassword: string
	): Promise<IUser> => {
		const user = await this.userRepository.findByCredentials(
			email,
			oldPassword
		);
		if (!user) throw new Error('Invalid credentials');

		const newUser = new User(
			user.first_name,
			user.last_name,
			user.username,
			user.email,
			await SecUtils.generateHash(newPassword)
		);
		return this.userRepository.changePassword(user.user_id as any, newUser);
	};
}
