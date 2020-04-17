import expressGraphQL from 'express-graphql';
import { graphQlSchema } from '../schema/schema';
import { Express } from 'express';

export const setupGraphQl = (app: Express) => {
  app.use(
    '/graphql',
    expressGraphQL({
      schema: graphQlSchema,
      graphiql: true,
    })
  );
};
