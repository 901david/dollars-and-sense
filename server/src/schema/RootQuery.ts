import { GraphQLObjectType } from 'graphql';
import { userRootQueries } from './queries/users';

export const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...userRootQueries,
  },
});
