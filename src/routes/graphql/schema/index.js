import {createHandler} from 'graphql-http/lib/use/express';

import resolvers from './resolvers';
import typeDefs from './typeDefs';

export default createHandler({
  schema: typeDefs,
  rootValue: resolvers,
  context: async (req) => {
    const user = await req.raw.user;
    return {user};
  },
});
