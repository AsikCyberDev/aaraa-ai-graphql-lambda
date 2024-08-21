const { gql } = require('apollo-server-lambda');

module.exports = gql`
  type Project {
    id: ID!
    name: String!
    description: String
    userId: ID!
    created: String!
  }
`;
