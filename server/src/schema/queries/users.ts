import axios from 'axios';
import { GraphQLInt } from 'graphql';

import { UserType } from '../types/user';
import { User } from '../../models/user.type';

const BASE_URL = 'http://localhost:5005/api';

export const userRootQueries = {
  user: {
    type: UserType,
    args: { id: { type: GraphQLInt } },
    async resolve(parentValue: User, args: { id: number }) {
      try {
        const results = await axios.get(`${BASE_URL}/users`);
        return results.data.find((user: User) => user.id === args.id);
      } catch (err) {
        throw err;
      }
    },
  },
};
