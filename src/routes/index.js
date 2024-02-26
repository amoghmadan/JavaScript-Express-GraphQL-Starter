import apiRouter from './api';
import graphqlRouter, {GRAPHQL_ROOT} from './graphql';

export default new Map([
  ['/api', apiRouter],
  [GRAPHQL_ROOT, graphqlRouter],
]);
