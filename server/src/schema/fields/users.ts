import axios from 'axios';
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

import { UserType } from '../types/user';
import { User } from '../../models/user.type';

const BASE_URL = 'http://localhost:5005/api';

export const userAPIFields = {
  user: {
    type: UserType,
    args: { id: { type: GraphQLInt } },
    resolve(parentValue: any, args: { id: number }) {
      axios
        .get(`${BASE_URL}/users`)
        .then(({ data: results }) => {
          return results.find((user: User) => user.id === args.id);
        })
        .catch(err => {
          return console.log(err);
        });
    },
  },
};
