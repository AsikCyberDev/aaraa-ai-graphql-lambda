const { gql } = require('apollo-server-lambda');

module.exports = gql`
  input TrainingDataInput {
    uid: String!
    lastModified: Float!
    name: String!
    size: Int!
    type: String!
  }
`;
