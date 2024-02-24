import {Router} from 'express';
import playground from 'graphql-playground-middleware-express';

import graphql from './schema';
import {authenticate} from '@/middlewares';
import {GRAPHIQL} from '@/settings';

export const GRAPHQL_PATH = '/graphql';

// eslint-disable-next-line new-cap
const graphqlRouter = Router();
if (GRAPHIQL) {
  graphqlRouter.route('/').get(playground({endpoint: `${GRAPHQL_PATH}/`}));
}
graphqlRouter.route('/').post(authenticate, graphql);

export default graphqlRouter;
