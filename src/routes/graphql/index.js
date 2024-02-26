import {Router} from 'express';
import playground from 'graphql-playground-middleware-express';

import graphql from './schema';
import {authenticate} from '@/middlewares';
import {GRAPHIQL} from '@/settings';

export const GRAPHQL_ROOT = '/graphql';
const GRAPHQL_PATH = '/';

// eslint-disable-next-line new-cap
const graphqlRouter = Router();
if (GRAPHIQL) {
  graphqlRouter
      .route(GRAPHQL_PATH)
      .get(playground({endpoint: GRAPHQL_ROOT + GRAPHQL_PATH}));
}
graphqlRouter.route(GRAPHQL_PATH).post(authenticate, graphql);

export default graphqlRouter;
