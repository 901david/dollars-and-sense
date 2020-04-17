import { GraphQLObjectType } from 'graphql';
import { userAPIFields } from './fields/users';

export const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...userAPIFields,
  },
});
