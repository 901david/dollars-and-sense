import { GraphQLSchema } from 'graphql';
import { RootQuery } from './RootQuery.js';
import { Mutations } from './Mutations.js';

export const graphQlSchema = new GraphQLSchema({
  query: RootQuery,
  // mutation: Mutations,
});
