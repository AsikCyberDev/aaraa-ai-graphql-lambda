const { gql } = require('apollo-server-lambda');

module.exports = gql`
  type Query {
    chatbots: [Chatbot!]!
    chatbot(id: ID!, projectId: ID!): Chatbot
    user(id: ID!): User
    documentsByProject(projectId: ID!): [Document!]!
    documentsByChatbot(chatbotId: ID!): [Document!]!
    document(id: ID!, projectId: ID!): Document
    projects(userId: ID!): [Project!]!
    project(id: ID!, userId: ID!): Project
  }
`;
