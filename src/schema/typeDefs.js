import { buildSchema } from 'graphql';

const typeDefs = buildSchema(`
    type Person {
        id: ID!
        name: String!
        age: Int!
    }
    type Query {
        hello: String!
        people: [Person!]!
        person(id: ID!): Person
    }
    type Mutation {
        createPerson(name: String!, age: Int!): Person
        updatePerson(id: ID!, name: String, age: Int): Person!
        deletePerson(id: ID!): Person
    }
`);

export default typeDefs;
