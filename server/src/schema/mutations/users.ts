import { GraphQLString } from 'graphql';
import { UserType } from '../types/user';
import { makeQuery } from '../../common/promisified-db-query';
import { EmailTransformData } from '../../models/email-transform-data';

export const userMutations = {
  modify_user_email: {
    type: UserType,
    args: {
      listing_id: { type: GraphQLString },
      guest_id: { type: GraphQLString },
    },
    resolve(parentValue: any, { id, email }: EmailTransformData) {
      makeQuery(`UPDATE Users WHERE id=${id} SET email="${email}"`)
        .then(res => res)
        .catch(err => console.log(err));
    },
  },
};
