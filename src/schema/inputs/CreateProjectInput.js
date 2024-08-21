const { gql } = require('apollo-server-lambda');

module.exports = gql`
  input CreateProjectInput {
    name: String!
    description: String
    userId: ID!
  }
`;
