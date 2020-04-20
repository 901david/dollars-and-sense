import expressGraphQL from 'express-graphql';
import { Express } from 'express';

import { graphQlSchema } from '../schema/schema';

export const setupGraphQl = (app: Express) => {
  app.use(
    '/graphql',
    expressGraphQL({
      schema: graphQlSchema,
      graphiql: true,
    })
  );
};
