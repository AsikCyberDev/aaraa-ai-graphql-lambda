const { gql } = require('apollo-server-lambda');

module.exports = gql`
  type ApiKey {
    apiKeyId: ID!
    key: String!
    created: String!
    lastUsed: String
    chatbotId: ID!
  }
`;
