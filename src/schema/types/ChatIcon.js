const { gql } = require('apollo-server-lambda');

module.exports = gql`
  type ChatIcon {
    uid: String!
    lastModified: Float!
    name: String!
    size: Int!
    type: String!
    thumbUrl: String
  }
`;
