import { GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql';
import axios from 'axios';

import { UserType } from '../types/user';
import { User } from '../../models/user.type';

export const userMutations = {
  addUser: {
    type: UserType,
    args: {
      user_name: { type: new GraphQLNonNull(GraphQLString) },
      user_password: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
    },
    async resolve(
      parentValue: User,
      args: { user_name: string; user_password: string; user_email: string }
    ) {
      try {
        const results = await axios.post(
          'http://localhost:5005/api/authau/register',
          args
        );
        return results.data;
      } catch (err) {
        throw err;
      }
    },
  },
  deleteUser: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    async resolve(parentValue: User, args: { id: number }) {
      try {
        const results = await axios.delete(
          `http://localhost:5005/api/users/${args.id}`
        );
        return results.data;
      } catch (err) {
        throw err;
      }
    },
  },
  updateUser: {
    type: UserType,
    args: {
      id: { type: GraphQLInt },
      user_name: { type: GraphQLString },
      user_password: { type: GraphQLString },
      email: { type: GraphQLString },
    },
    async resolve(parentValue: User, args: User) {
      try {
        const body = { ...args };
        delete body.id;
        const results = await axios.patch(
          `http://localhost:5005/api/users/${args.id}`,
          body
        );
        return results.data;
      } catch (err) {
        throw err;
      }
    },
  },
};
