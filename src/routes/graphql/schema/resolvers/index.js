import mutations from './mutations';
import queries from './queries';

const resolvers = {...queries, ...mutations};

export default resolvers;
