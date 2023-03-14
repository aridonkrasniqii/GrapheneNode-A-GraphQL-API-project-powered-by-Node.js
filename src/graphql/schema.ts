import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import {
	CREATE_CATEGORY,
	DELETE_CATEGORY,
	UPDATE_CATEGORY
} from './Mutation/Category';
import {
	CHANGE_PASSWORD,
	CREATE_USER,
	DELETE_USER,
	LOGIN,
	UPDATE_USER
} from './Mutation/User';
import { GET_ALL_CATEGORIES, GET_CATEGORY_BY_ID } from './Query/Category';
import { GET_ALL_USERS } from './Query/User';

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: {
		getAllUsers: GET_ALL_USERS,
		getAllCategories: GET_ALL_CATEGORIES,
		getCategoryById: GET_CATEGORY_BY_ID
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		createUser: CREATE_USER,
		deleteUser: DELETE_USER,
		updateUser: UPDATE_USER,
		createCategory: CREATE_CATEGORY,
		updateCategory: UPDATE_CATEGORY,
		deleteCategory: DELETE_CATEGORY,
		changePassword: CHANGE_PASSWORD,
		loginUser: LOGIN as any
	}
});

export const schema = new GraphQLSchema({
	query: Query,
	mutation: Mutation
});
