const { gql } = require('apollo-server-lambda');

module.exports = gql`
  input SignInInput {
    email: String!
    password: String!
  }
`;
