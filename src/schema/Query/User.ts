import { GraphQLID, GraphQLList } from 'graphql';
import { UserType } from '../TypeDefs/User';
import { IUser } from '../../interfaces/IUser';
import { UserService } from '../../service/UserService';
import { UserRepository } from '../../repository/UserRepository';

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
