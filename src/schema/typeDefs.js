const { gql } = require('apollo-server-lambda');

const typeDefs = gql`
  enum ChatbotStatus {
    ACTIVE
    INACTIVE
  }

  enum ChatbotType {
    SUPPORT
    SALES
  }

  type Chatbot {
    id: ID!
    name: String!
    description: String
    status: ChatbotStatus!
    type: ChatbotType!
    created: String!
    interactions: Int!
    satisfactionRate: Int!
  }

  type Document {
    id: ID!
    name: String!
    size: String!
    uploadDate: String!
    chatbotId: ID!
  }

  type Query {
    chatbots: [Chatbot!]!
    chatbot(id: ID!): Chatbot
    documents(chatbotId: ID!): [Document!]!
    document(id: ID!): Document
  }

  type Mutation {
    createChatbot(name: String!, description: String, status: ChatbotStatus!, type: ChatbotType!): Chatbot!
    updateChatbot(id: ID!, name: String, description: String, status: ChatbotStatus, type: ChatbotType): Chatbot!
    deleteChatbot(id: ID!): Boolean!

    createDocument(name: String!, size: String!, chatbotId: ID!): Document!
    updateDocument(id: ID!, name: String): Document!
    deleteDocument(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
