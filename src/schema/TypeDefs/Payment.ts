import {
	GraphQLFloat,
	GraphQLID,
	GraphQLObjectType,
	GraphQLString
} from 'graphql';

export const PaymentType = new GraphQLObjectType({
	name: 'Payment',
	fields: () => ({
		payment_id: { type: GraphQLID },
		order_id: { type: GraphQLID },
		amount: { type: GraphQLFloat },
		payment_date: { type: GraphQLString }
	})
});
