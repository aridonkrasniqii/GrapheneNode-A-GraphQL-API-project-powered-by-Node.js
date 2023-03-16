import { UserValidator } from './../validators/UserValidator';
import { IUser } from '../interfaces/IUser';
import { User } from '../models/User';
import { UserRepository } from '../repository/UserRepository';
import { IUserContext } from '../interfaces/IUserContext';
import { UserUtil } from '../utils/UserUtil';
import { GraphQLError } from 'graphql';
import { GraphQLErrorHandler } from '../middlewares/erros/GraphQLErrorHandler';
import { ValidationError } from 'apollo-server-express';

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
		if (!UserValidator.validateEmail(email)) {
			GraphQLErrorHandler.errorHandler(
				new ValidationError('Please provide a valid email')
			);
		}
		if (UserValidator.validatePassword(password)) {
			GraphQLErrorHandler.errorHandler(new ValidationError('Weak password'));
		}

		const hashed = await UserUtil.generateHash(password);
		const user = new User(first_name, last_name, username, email, hashed);
		return this.userRepository.createEntity(user);
	};

	getUserById = async (user_id: number): Promise<IUser> => {
		return this.userRepository.getEntityById(user_id);
	};

	getUserByEmail = async (email: string): Promise<IUser> => {
		return this.userRepository.getUserByEmail(email);
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
		const hashed = await UserUtil.generateHash(password);
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
			await UserUtil.generateHash(newPassword)
		);
		return this.userRepository.changePassword(user.user_id!, newUser);
	};

	login = async (email: string, password: string): Promise<IUserContext> => {
		const user: IUser = await this.userRepository.findByCredentials(
			email,
			password
		);
		const token = UserUtil.signToken(user.user_id!);
		return {
			token,
			user
		};
	};
}
