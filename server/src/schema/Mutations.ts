import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import { UserType } from './types/user';
import axios from 'axios';
import { User } from '../models/user.type';
import { userMutations } from './mutations/users';

export const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...userMutations,
  },
});
