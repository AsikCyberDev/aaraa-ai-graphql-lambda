const { gql } = require('apollo-server-lambda');

module.exports = gql`
  input CreateApiKeyInput {
    chatbotId: ID!
  }
`;
