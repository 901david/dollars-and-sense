import { GraphQLObjectType, GraphQLString } from 'graphql';

export const UserAuth = new GraphQLObjectType({
  name: 'UserAuth',
  fields: {
    message: { type: GraphQLString },
  },
});
