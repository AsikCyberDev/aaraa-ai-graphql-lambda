const { gql } = require('apollo-server-lambda');

module.exports = gql`
  input UpdateProjectInput {
    name: String
    description: String
  }
`;
