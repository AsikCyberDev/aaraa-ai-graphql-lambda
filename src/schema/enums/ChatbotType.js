const { gql } = require('apollo-server-lambda');

module.exports = gql`
  enum ChatbotType {
    SUPPORT
    SALES
    BEDROCK_AGENT
  }
`;
