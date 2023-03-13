import { GraphQLID, GraphQLString } from 'graphql';
import { User } from '../../models/User';
import { UserRepository } from '../../repository/UserRepository';
import { UserService } from '../../service/UserService';
import { UserType } from '../TypeDefs/User';

const userRepository = new UserRepository('users');
const userService = new UserService(userRepository);

export const CREATE_USER = {
  type: UserType,
  args: {
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(_: any, args: any) {
    const { first_name, last_name, username, email, password } = args;
    return userService.createUser(
      first_name,
      last_name,
      username,
      email,
      password
    );
  }
};

export const DELETE_USER = {
  type: UserType,
  args: {
    user_id: { type: GraphQLID }
  },
  async resolve(_: any, args: any) {
    const user_id = parseInt(args.id);
    return userService.deleteUser(user_id);
  }
};

export const UPDATE_USER = {
  type: UserType,
  args: {
    user_id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  resolve(_: any, args: any) {
    const { user_id, first_name, last_name, username, email, password } = args;
    return userService.updateUser(
      parseInt(user_id),
      first_name,
      last_name,
      username,
      email,
      password
    );
  }
};

export const CHANGE_PASSWORD = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString }
  },
  resolve(_: any, args: any) {
    const { email, oldPassword, newPassword } = args;
    return userService.changePassword(email, oldPassword, newPassword);
  }
};
