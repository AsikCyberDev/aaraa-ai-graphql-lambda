const { gql } = require('apollo-server-lambda');

module.exports = gql`
  type Document {
    id: ID!
    name: String!
    size: String!
    uploadDate: String!
    chatbotId: ID!
    projectId: ID!
    s3Url: String!
  }
`;
