import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLInt },
    user_name: { type: GraphQLString },
    user_password: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});
