import apiRouter from './api';
import graphqlRouter, {GRAPHQL_PATH} from './graphql';

export default new Map([
  ['/api', apiRouter],
  [GRAPHQL_PATH, graphqlRouter],
]);
