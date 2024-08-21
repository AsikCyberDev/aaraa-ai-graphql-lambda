// schema/types/Chatbot.js
const { gql } = require('apollo-server-lambda');

module.exports = gql`
  type Chatbot {
    id: ID!
    name: String!
    description: String
    status: ChatbotStatus!
    type: ChatbotType!
    projectId: ID!      # <-- Add this line
    language: String
    integrations: [String]
    customIntegration: String
    theme: String
    primaryColor: PrimaryColor
    fontSelection: String
    chatIcon: [ChatIcon]
    welcomeMessage: String
    fallbackMessage: String
    inputPlaceholder: String
    responseTime: Int
    enableTypingIndicator: Boolean
    trainingData: [TrainingData]
    knowledgeBase: String
    enableLearning: Boolean
    confidenceThreshold: Float
    maxConversationLength: Int
    enableHumanHandoff: Boolean
    handoffThreshold: Float
    enableAnalytics: Boolean
    sessionTimeout: Int
    apiKeys: [ApiKey]
    created: String!
    interactions: Int!
    satisfactionRate: Int!
  }
`;
