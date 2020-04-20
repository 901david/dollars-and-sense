import { GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql';
import { UserType } from '../types/user';
import axios from 'axios';
import { User } from '../../models/user.type';

export const userMutations = {
  addUser: {
    type: UserType,
    args: {
      user_name: { type: new GraphQLNonNull(GraphQLString) },
      user_password: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(
      parentValue: any,
      args: { user_name: string; user_password: string; user_email: string }
    ) {
      return axios
        .post('http://localhost:5005/api/users/register', args)
        .then(({ data }) => {
          console.log(data);
          return data;
        })
        .catch((err: Error) => {
          console.log(err);
        });
    },
  },
  deleteUser: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve(parentValue: any, args: { id: number }) {
      return axios
        .delete(`http://localhost:5005/api/users/${args.id}`)
        .then(({ data }) => data)
        .catch((err: Error) => {
          console.log(err);
        });
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
    resolve(parentValue: any, args: User) {
      const body = { ...args };
      delete body.id;
      return axios
        .patch(`http://localhost:5005/api/users/${args.id}`, body)
        .then(({ data }) => data)
        .catch((err: Error) => {
          console.log(err);
        });
    },
  },
};
