import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		user_id: { type: GraphQLID },
		first_name: { type: GraphQLString },
		last_name: { type: GraphQLString },
		username: { type: GraphQLString },
		email: { type: GraphQLString },
		password: { type: GraphQLString },
		created_at: { type: GraphQLString },
		updated_at: { type: GraphQLString }
	})
});
