import { GraphQLObjectType } from 'graphql';
import { GraphQLID } from 'graphql';
import { UserType } from './User';
export const UserContextType = new GraphQLObjectType({
	name: 'UserContext',
	fields: () => ({
		token: { type: GraphQLID },
		user: { type: UserType }
	})
});
