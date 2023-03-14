import { GraphQLID, GraphQLList } from 'graphql';
import { UserType } from '../TypeDefs/User';
import { IUser } from '../../interfaces/IUser';
import { UserService } from '../../service/UserService';
import { UserRepository } from '../../repository/UserRepository';
import { AuthenticationError } from 'apollo-server-express';

const userRepository = new UserRepository('users');
const userService = new UserService(userRepository);

export const GET_ALL_USERS = {
	type: new GraphQLList(UserType),
	resolve(): Promise<IUser[]> {
		return userService.getAllUsers();
	}
};

export const GET_USER_BY_ID = {
	type: UserType,
	args: {
		user_id: { type: GraphQLID }
	},
	resolve(_: any, args: any) {
		const user_id = args.user_id;
		return userService.getUserById(user_id);
	}
};

export const ME = {
	type: UserType,
	resolve(_: any, { user }: { user: IUser }) {
		if (!user) {
			throw new AuthenticationError('You must be logged in');
		}
		return user;
	}
};
