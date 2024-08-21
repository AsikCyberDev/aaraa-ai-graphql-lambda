const { gql } = require('apollo-server-lambda');

module.exports = gql`
  input UpdateUserInput {
    name: String
    email: String
    company: String
    role: String
  }
`;
