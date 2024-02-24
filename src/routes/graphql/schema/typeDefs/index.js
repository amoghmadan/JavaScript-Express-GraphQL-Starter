import {buildSchema} from 'graphql';

const typeDefs = buildSchema(`
  type User {
    email: String!
    firstName: String!
    lastName: String!
    isAdmin: Boolean!
    dateJoined: String!
  }

  type Query {
    user: User!
    logout: String
  }
`);

export default typeDefs;
