import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    category_id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});
