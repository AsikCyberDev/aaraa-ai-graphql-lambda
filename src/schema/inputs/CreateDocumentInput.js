const { gql } = require('apollo-server-lambda');

module.exports = gql`
   input CreateDocumentInput {
    name: String!
    size: String!
    chatbotId: ID!
    projectId: ID!
  }
`;
