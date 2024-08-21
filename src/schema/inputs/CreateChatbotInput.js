// schema/inputs/CreateChatbotInput.js
const { gql } = require('apollo-server-lambda');

module.exports = gql`
  input CreateChatbotInput {
    name: String!
    description: String
    status: ChatbotStatus!
    type: ChatbotType!
    projectId: ID!            # <-- Add this line
    language: String
    integrations: [String]
    customIntegration: String
    theme: String
    primaryColor: PrimaryColorInput
    fontSelection: String
    chatIcon: [ChatIconInput]
    welcomeMessage: String
    fallbackMessage: String
    inputPlaceholder: String
    responseTime: Int
    enableTypingIndicator: Boolean
    trainingData: [TrainingDataInput]
    knowledgeBase: String
    enableLearning: Boolean
    confidenceThreshold: Float
    maxConversationLength: Int
    enableHumanHandoff: Boolean
    handoffThreshold: Float
    enableAnalytics: Boolean
    sessionTimeout: Int
  }
`;
