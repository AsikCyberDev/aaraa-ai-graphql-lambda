const { gql } = require('apollo-server-lambda');

module.exports = gql`
  type TrainingData {
    uid: String!
    lastModified: Float!
    name: String!
    size: Int!
    type: String!
  }
`;
