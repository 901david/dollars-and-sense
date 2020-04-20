import { GraphQLObjectType } from 'graphql';

import { userMutations } from './mutations/users';

export const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutations,
  },
});
