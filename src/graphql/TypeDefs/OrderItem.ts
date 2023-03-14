import { GraphQLID, GraphQLInt, GraphQLObjectType } from 'graphql';

export const OrderItemType = new GraphQLObjectType({
	name: 'OrderItem',
	fields: () => ({
		order_id: { type: GraphQLID },
		product_id: { type: GraphQLID },
		quantity: { type: GraphQLInt }
	})
});
