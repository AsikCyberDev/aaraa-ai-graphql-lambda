const { gql } = require('apollo-server-lambda');

module.exports = gql`
  enum ChatbotStatus {
    ACTIVE
    INACTIVE
  }
`;
