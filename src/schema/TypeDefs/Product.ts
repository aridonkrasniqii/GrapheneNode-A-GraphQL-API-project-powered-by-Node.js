import {
	GraphQLFloat,
	GraphQLID,
	GraphQLObjectType,
	GraphQLString
} from 'graphql';

export const ProductType = new GraphQLObjectType({
	name: 'Product',
	fields: () => ({
		payment_id: { type: GraphQLID },
		order_id: { type: GraphQLID },
		amount: { type: GraphQLFloat },
		payment_date: { type: GraphQLString }
	})
});
