const { gql } = require('apollo-server-lambda');

module.exports = gql`
  input CreateUserInput {
    name: String!
    email: String!
    company: String
    role: String
  }
`;
