import { GraphQLID, GraphQLString, GraphQLObjectType } from 'graphql';

export const OrderType = new GraphQLObjectType({
	name: 'Order',
	fields: () => ({
		order_id: { type: GraphQLID },
		user_id: { type: GraphQLID },
		comments: { type: GraphQLString },
		order_date: { type: GraphQLString }
	})
});
